<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { MENU_OPTIONS, menuByDashboardName, menuById } from '../../api/menus.js'
import { currentUser, logout as logoutSession } from '../../api/session.js'
import { getCurrentVersion, getVersion, listVersions, saveVersion as saveMenuVersion } from '../../api/versions.js'
import PdfDocument from '../../pdfs/PdfDocument.vue'
import {
  almoco,
  chefstable,
  drinks,
  jantar,
  manha,
  vinhos,
} from '../../pdfs/index.js'
import { formatMenuDate } from '../../utils/dates.js'

const router = useRouter()

/*
|--------------------------------------------------------------------------
| Dados
|--------------------------------------------------------------------------
*/

const cloneMenu = (menu) => JSON.parse(JSON.stringify(menu))

const menus = MENU_OPTIONS.map((menu) => ({
  id: menu.id,
  name: menu.dashboardName,
}))

const languages = ['PT', 'EN', 'ES']

const selectedMenu = ref('MENU JANTAR')
const selectedLanguage = ref('PT')

const showInstructions = ref(true)
const showWarning = ref(true)
const showPassword = ref(false)

const pdfMenus = reactive({
  'MENU ALMOÇO': cloneMenu(almoco),
  'MENU JANTAR': cloneMenu(jantar),
  'MENU CAFÉ DA MANHÃ': cloneMenu(manha),
  'MENU DRINKS': cloneMenu(drinks),
  'MENU VINHOS': cloneMenu(vinhos),
  'CHEFS TABLE': cloneMenu(chefstable),
})

/*
|--------------------------------------------------------------------------
| Histórico
|--------------------------------------------------------------------------
*/

const historyMenuId = ref('jantar')
const history = ref([])
const historyLoading = ref(false)
const saveMessage = ref('')
const saveError = ref('')
const saving = ref(false)
const hydratedMenus = new Set()
const previewSource = ref(null)
const todayLabel = formatMenuDate().date

/*
|--------------------------------------------------------------------------
| Computed
|--------------------------------------------------------------------------
*/

const currentMenu = computed(() => {
  return selectedMenu.value
})

const selectedPdf = computed(() => pdfMenus[selectedMenu.value] || null)

const isA4Menu = computed(() => selectedPdf.value?.template === 'a4')

const showDateField = computed(() =>
  Boolean(selectedPdf.value?.pages?.some((page) => page.showDate))
)

const editorSections = computed(() => {
  if (!isA4Menu.value) return []
  return selectedPdf.value.pages?.flatMap((page) => page.sections || []) || []
})

const previewMenu = computed(() => previewSource.value || selectedPdf.value)

const historyMenu = computed(() => menuById[historyMenuId.value])

const greetingName = computed(() => currentUser.value?.username || 'admin KA BRU')

const itemHas = (item, key) => Object.prototype.hasOwnProperty.call(item, key)

const withHistoryDates = (versions) =>
  versions.map((item) => {
    const labels = formatMenuDate(item.created_at)
    return {
      ...item,
      date: labels.date,
      day: labels.day,
    }
  })

/*
|--------------------------------------------------------------------------
| Ações
|--------------------------------------------------------------------------
*/

const selectMenu = (menu) => {
  selectedMenu.value = menu.name
}

const selectLanguage = (language) => {
  selectedLanguage.value = language
}

const sampleItemShape = () => {
  for (const section of editorSections.value) {
    if (section.items?.[0]) return section.items[0]
  }

  const menuId = selectedPdf.value?.id
  if (menuId === 'vinhos') return { name: '', subtitle: '', price: '' }
  if (menuId === 'drinks') return { name: '', description: '', price: '' }
  return { description: '', price: '' }
}

const createItem = (section) => {
  const menu = selectedPdf.value
  const sample = section?.items?.[0] || sampleItemShape()
  const item = {
    id: `${menu.id}-${section?.id || 'item'}-${Date.now()}`,
    price: '0',
  }

  if (itemHas(sample, 'name')) item.name = 'NOVA OPÇÃO'
  if (itemHas(sample, 'description')) item.description = 'nova opção'
  if (itemHas(sample, 'subtitle')) item.subtitle = ''

  return item
}

const categoryTitleValue = (section) => {
  if (Array.isArray(section.titleLines) && section.titleLines.length) {
    return section.titleLines.join('\n')
  }
  return section.title || ''
}

const autosizeCategory = (el) => {
  if (!el || el.tagName !== 'TEXTAREA') return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

const resizeCategoryFields = async () => {
  await nextTick()
  document.querySelectorAll('.dashboard .category-input').forEach(autosizeCategory)
}

const onCategoryTitleInput = (section, event) => {
  const el = event.target
  const caret = el.selectionStart
  const value = (el.value || '').toUpperCase()
  const lines = value.split('\n')

  section.titleLines = lines
  section.title = lines.map((line) => line.trim()).filter(Boolean).join(' ') || ''

  nextTick(() => {
    el.setSelectionRange(caret, caret)
    autosizeCategory(el)
  })
}

const addOption = (section) => {
  if (!selectedPdf.value || !section) return
  section.items.push(createItem(section))
}

const removeOption = (section, optionId) => {
  section.items = section.items.filter((item) => item.id !== optionId)
}

const createCategory = () => {
  const menu = selectedPdf.value
  const section = {
    id: `${menu.id}-cat-${Date.now()}`,
    title: 'NOVA CATEGORIA',
    titleLines: ['NOVA CATEGORIA'],
    items: [],
  }
  section.items.push(createItem(section))
  return section
}

const addCategoryAt = (flatIndex) => {
  const menu = selectedPdf.value
  if (!menu?.pages?.length) return

  const section = createCategory()
  let remaining = Math.max(0, flatIndex)

  for (const page of menu.pages) {
    if (remaining <= page.sections.length) {
      page.sections.splice(remaining, 0, section)
      return
    }
    remaining -= page.sections.length
  }

  menu.pages[menu.pages.length - 1].sections.push(section)
}

const removeCategory = (sectionId) => {
  const menu = selectedPdf.value
  if (!menu) return

  for (const page of menu.pages) {
    const index = page.sections.findIndex((section) => section.id === sectionId)
    if (index !== -1) {
      page.sections.splice(index, 1)
      return
    }
  }
}

const loadHistory = async () => {
  historyLoading.value = true
  try {
    const data = await listVersions(historyMenuId.value, selectedLanguage.value)
    history.value = withHistoryDates(data.versions || [])
  } catch {
    history.value = []
  } finally {
    historyLoading.value = false
  }
}

const hydrateSelectedMenu = async () => {
  const key = `${selectedMenu.value}:${selectedLanguage.value}`
  if (hydratedMenus.has(key)) return

  const menu = menuByDashboardName[selectedMenu.value]
  if (!menu) return

  try {
    const data = await getCurrentVersion(menu.id, selectedLanguage.value)
    if (data.version?.payload) {
      pdfMenus[selectedMenu.value] = data.version.payload
    }
  } catch {
    // Keep the seeded menu if the API is unavailable.
  } finally {
    hydratedMenus.add(key)
  }
}

const saveVersion = async () => {
  const menu = menuByDashboardName[selectedMenu.value]
  if (!menu || !selectedPdf.value) return

  saving.value = true
  saveMessage.value = ''
  saveError.value = ''
  try {
    await saveMenuVersion(menu.id, selectedLanguage.value, selectedPdf.value)
    hydratedMenus.add(`${selectedMenu.value}:${selectedLanguage.value}`)
    saveMessage.value = 'Versão salva.'
    if (historyMenuId.value === menu.id) await loadHistory()
    window.setTimeout(() => {
      saveMessage.value = ''
    }, 3000)
  } catch (error) {
    saveError.value = error.message || 'Não foi possível salvar.'
  } finally {
    saving.value = false
  }
}

const showPreview = ref(false)

const previewVersion = () => {
  if (!selectedPdf.value) return
  previewSource.value = null
  showPreview.value = true
}

const previewHistoryVersion = async (item) => {
  try {
    const version = await getVersion(item.id)
    previewSource.value = version.payload
    showPreview.value = true
  } catch {
    saveError.value = 'Não foi possível abrir esta versão.'
  }
}

const closePreview = () => {
  showPreview.value = false
  previewSource.value = null
}

watch(showPreview, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const onPreviewKeydown = (event) => {
  if (event.key === 'Escape') closePreview()
}

window.addEventListener('keydown', onPreviewKeydown)

watch([selectedMenu, editorSections], () => {
  resizeCategoryFields()
}, { flush: 'post' })

const printing = ref(false)
let printStarted = false

const startBrowserPrint = () => {
  if (!printing.value || printStarted) return
  printStarted = true
  document.documentElement.classList.add('printing-pdf')
  requestAnimationFrame(() => {
    requestAnimationFrame(() => window.print())
  })
}

const printPdf = async () => {
  if (!previewMenu.value || printing.value) return
  printing.value = true
  printStarted = false
  await nextTick()
  window.setTimeout(startBrowserPrint, 2000)
}

const onPrintDocumentReady = async () => {
  const root = document.querySelector('.print-root')
  if (root) {
    const images = [...root.querySelectorAll('img')]
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve()
        if (img.decode) return img.decode().catch(() => { })
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        })
      })
    )
  }
  startBrowserPrint()
}

const endPrint = () => {
  printing.value = false
  printStarted = false
  document.documentElement.classList.remove('printing-pdf')
}

window.addEventListener('afterprint', endPrint)

onUnmounted(() => {
  window.removeEventListener('keydown', onPreviewKeydown)
  window.removeEventListener('afterprint', endPrint)
  document.documentElement.classList.remove('printing-pdf')
  document.body.style.overflow = ''
})

const selectHistoryMenu = (menuId) => {
  historyMenuId.value = menuId
}

watch([selectedMenu, selectedLanguage], () => {
  hydrateSelectedMenu()
})

watch([historyMenuId, selectedLanguage], () => {
  loadHistory()
})

onMounted(() => {
  hydrateSelectedMenu()
  loadHistory()
})

const logout = async () => {
  await logoutSession()
  router.push('/login')
}
</script>

<template>
  <div class="dashboard">

    <!-- =========================================================
         HEADER
    ========================================================== -->

    <header class="topbar">

      <div class="topbar-date">
        {{ todayLabel }}
      </div>

      <button class="logout-button" type="button" @click="logout">
        sair
      </button>

    </header>


    <!-- =========================================================
         CONTEÚDO
    ========================================================== -->

    <main class="dashboard-content">

      <!-- =======================================================
           COLUNA ESQUERDA
      ======================================================== -->

      <aside class="sidebar">

        <!-- Saudação -->

        <section class="greeting">
          <h1>
            Olá, {{ greetingName }}!
          </h1>
        </section>


        <!-- Instruções -->

        <section class="instructions">

          <button class="section-header" @click="showInstructions = !showInstructions">
            <span>
              Como funciona a edição de menus:
            </span>

            <span>
              {{ showInstructions ? '^' : '⌄' }}
            </span>
          </button>

          <div v-if="showInstructions" class="instructions-content">
            <ol>
              <li>
                Selecione o menu e idioma que deseja modificar
              </li>

              <li>
                Altere os campos disponíveis
              </li>

              <li>
                Se necessário, adicione campos
              </li>

              <li>
                Visualize o menu editado antes de baixar em PDF
              </li>
            </ol>
          </div>

        </section>


        <!-- Seleção -->

        <div class="select-label">
          Selecione um menu e um idioma para iniciar a edição:
        </div>


        <!-- Lista de menus -->

        <section class="menu-list mb-10 ">

          <div v-for="menu in menus" :key="menu.id" class="menu-item" :class="{
            active: selectedMenu === menu.name
          }">

            <strong>
              {{ menu.name }}
            </strong>

            <div class="menu-actions">

              <div class="language-group">

                <span class="language-label">
                  Editar em:
                </span>

                <div class="language-buttons">

                  <button v-for="language in languages" :key="language" class="language-button" :class="{
                    selected:
                      selectedMenu === menu.name &&
                      selectedLanguage === language
                  }" @click="selectMenu(menu); selectLanguage(language)">
                    {{ language }}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>


        <!-- =====================================================
             HISTÓRICO
        ====================================================== -->
        <span class="mt-10 text-[20px] font-bold text-black">
          Histórico:
        </span>


        <section class="history">

          <div class="history-tabs">

            <button
              v-for="menu in MENU_OPTIONS"
              :key="menu.id"
              type="button"
              :class="{ active: historyMenuId === menu.id }"
              @click="selectHistoryMenu(menu.id)"
            >
              {{ menu.tabLabel }}
            </button>

          </div>


          <div class="history-header">

            <span>
              exibindo histórico de:
              <strong>{{ historyMenu?.dashboardName }}</strong>
            </span>

            <span>
              idioma:
              <strong>{{ selectedLanguage }}</strong>
            </span>

          </div>


          <div class="history-table">

            <p v-if="historyLoading" class="history-empty">
              Carregando histórico...
            </p>

            <p v-else-if="!history.length" class="history-empty">
              Nenhuma versão salva ainda.
            </p>

            <div v-for="item in history" :key="item.id" class="history-row">

              <span>
                {{ item.date }}
              </span>

              <span>
                {{ item.day }}
              </span>

              <button type="button" @click="previewHistoryVersion(item)">
                visualizar versão
              </button>

            </div>

          </div>

        </section>

      </aside>


      <!-- =======================================================
           EDITOR
      ======================================================== -->

      <section class="editor">

        <!-- Editor Header -->

        <header class="editor-header">

          <div>
            <strong>
              Edição:
            </strong>

            editando

            <strong class="editor-menu-name">
              {{ currentMenu }}
            </strong>
          </div>

          <div class="editor-language">
            idioma:

            <span>
              {{ selectedLanguage }}
            </span>
          </div>

        </header>


        <div class="editor-body">

          <p v-if="!isA4Menu" class="editor-placeholder">
            A edição deste modelo ainda não está disponível.
          </p>

          <template v-else>

            <!-- DATA -->

            <section v-if="showDateField" class="editor-field date-field">

              <label>
                DATA:
              </label>

              <input v-model="selectedPdf.date" type="text" placeholder="15.07.26" />

            </section>


            <!-- CATEGORIAS -->

            <div class="sections">

              <template v-for="(section, index) in editorSections" :key="section.id">

                <button class="insert-category" type="button" @click="addCategoryAt(index)">
                  adicionar categoria
                </button>

                <section class="menu-section">

                  <div class="section-title-row">

                    <textarea
                      class="category-input"
                      rows="1"
                      placeholder="NOVA CATEGORIA"
                      :value="categoryTitleValue(section)"
                      @input="onCategoryTitleInput(section, $event)"
                    />

                    <button class="delete-button" type="button" title="Excluir categoria"
                      @click="removeCategory(section.id)">
                      ✖
                    </button>

                  </div>


                  <div v-for="item in section.items" :key="item.id" class="option-row">

                    <div class="option-fields">
                      <input v-if="itemHas(item, 'name')" v-model="item.name" class="description-input" type="text"
                        placeholder="Nome" />
                      <input v-if="itemHas(item, 'description')" v-model="item.description" class="description-input"
                        type="text" placeholder="Opção" />
                      <input v-if="itemHas(item, 'subtitle')" v-model="item.subtitle" class="description-input"
                        type="text" placeholder="Detalhe" />
                    </div>

                    <input v-model="item.price" class="price-input" type="text" />

                    <button class="delete-button" type="button" @click="removeOption(section, item.id)"
                      title="Excluir opção">
                      ✖
                    </button>

                  </div>


                  <div class="add-option-container">

                    <button class="add-option" type="button" @click="addOption(section)">
                      adicionar opção
                    </button>

                  </div>

                </section>

              </template>

              <button class="insert-category" type="button" @click="addCategoryAt(editorSections.length)">
                adicionar categoria
              </button>

            </div>

          </template>

        </div>


        <!-- =====================================================
             FOOTER ACTIONS
        ====================================================== -->

        <div class="editor-footer-wrap">
          <p v-if="saveMessage" class="save-feedback is-success">{{ saveMessage }}</p>
          <p v-else-if="saveError" class="save-feedback is-error">{{ saveError }}</p>

          <footer class="editor-footer">

            <button class="editor-button" :disabled="saving" @click="saveVersion">
              {{ saving ? 'SALVANDO...' : 'SALVAR VERSÃO' }}
            </button>

            <button class="editor-button" @click="previewVersion">
              VISUALIZAR
            </button>

            <button class="editor-button" @click="printPdf">
              IMPRIMIR PDF
            </button>

          </footer>
        </div>

      </section>

    </main>

    <Teleport to="body">
      <div v-if="printing && previewMenu" class="print-root" aria-hidden="true">
        <PdfDocument :menu="previewMenu" @ready="onPrintDocumentReady" />
      </div>
    </Teleport>

    <Teleport to="body">
      <div v-if="showPreview" class="preview-overlay" @click.self="closePreview">
        <div class="preview-toolbar">
          <span class="preview-toolbar-title">
            {{ currentMenu }}
          </span>

          <button type="button" class="preview-close" @click="closePreview">
            fechar
          </button>
        </div>

        <div class="preview-stage">
          <PdfDocument v-if="previewMenu" :menu="previewMenu" />
        </div>
      </div>
    </Teleport>

  </div>
</template>


<style scoped>
.dashboard {
  --kb-brown: #3b2f2b;
  --kb-text: #565656;
  --kb-accent: #968473;
  --kb-border: #d8d0c8;
  --kb-font: system-ui, 'Segoe UI', Roboto, sans-serif;

  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  color: var(--kb-text);
  font-family: var(--kb-font);
  font-size: 16px;
  line-height: 145%;
  letter-spacing: 1px;
}

.dashboard button,
.dashboard input,
.dashboard textarea {
  font-family: inherit;
  letter-spacing: inherit;
}

/* =========================================
   TOPBAR
========================================= */

.topbar {
  height: 60px;
  flex-shrink: 0;
  width: 100%;
  background: #ffffff;
  color: var(--kb-brown);
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.06);

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  z-index: 2;
  padding: 0 20px;
  box-sizing: border-box;
}

.topbar-date {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--kb-brown);
}

.logout-button {
  position: absolute;
  right: 20px;

  padding: 8px 16px;

  border: 1px solid var(--kb-accent);
  background: #ffffff;

  color: var(--kb-accent);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.logout-button:hover {
  background: var(--kb-accent);
  color: #ffffff;
}

/* =========================================
   LAYOUT
========================================= */

.dashboard-content {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  flex: 1;
  min-height: 0;

  display: grid;
  grid-template-columns:
    minmax(360px, 1fr) minmax(420px, 1.15fr);
  gap: 32px;
  align-items: stretch;
}

.sidebar {
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
}

/* =========================================
   GREETING
========================================= */

.greeting {
  min-height: 40px;
  display: flex;
  align-items: center;
  padding-right: 260px;
}

.greeting h1 {
  margin: 0;
  font-family: var(--kb-font);
  font-size: 28px;
  line-height: 118%;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--kb-brown);
}

/* =========================================
   WARNING
========================================= */

.warning-box {
  width: 240px;
  margin: -40px 0 20px auto;
  padding: 14px 16px;
  box-sizing: border-box;

  border: 1px solid #c92323;

  color: #c92323;
  font-size: 14px;
  line-height: 145%;
}

.warning-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.warning-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.warning-title strong {
  font-size: 14px;
  font-weight: 600;
}

.collapse-button {
  margin-left: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: #c92323;
  font-size: 14px;
  cursor: pointer;
}

.collapse-button:hover {
  color: #8f1818;
}

.warning-box p {
  margin: 8px 0 0;
}

/* =========================================
   INSTRUCTIONS
========================================= */

.instructions {
  width: 100%;
  margin-bottom: 32px;
  margin-top: 20px;
  border: 1px solid var(--kb-border);
}

.section-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  border: 0;
  background: transparent;
  padding: 14px 16px;

  color: var(--kb-brown);
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.section-header:hover {
  color: var(--kb-accent);
}

.instructions-content {
  padding: 0 16px 16px;
}

.instructions-content ol {
  margin: 0;
  padding-left: 20px;
  color: var(--kb-text);
  font-size: 16px;
  line-height: 145%;
}

/* =========================================
   SELECT LABEL
========================================= */

.select-label {
  margin-bottom: 16px;
  color: var(--kb-text);
  font-size: 16px;
}

/* =========================================
   MENUS
========================================= */

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  min-height: 64px;
  padding: 14px 16px;
  box-sizing: border-box;

  border: 1px solid var(--kb-border);
  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.menu-item.active {
  border-color: var(--kb-accent);
}

.menu-item>strong {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--kb-brown);
}

.menu-actions {
  display: flex;
  align-items: end;
  gap: 16px;
}

.language-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.language-label {
  font-size: 14px;
  color: var(--kb-accent);
}

.language-buttons {
  display: flex;
  gap: 6px;
}

.language-button {
  min-width: 40px;
  height: 32px;
  padding: 0 8px;

  border: 1px solid var(--kb-accent);
  background: #ffffff;

  color: var(--kb-accent);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.language-button:hover,
.language-button.selected {
  background: var(--kb-brown);
  border-color: var(--kb-brown);
  color: #ffffff;
}

.history-button {
  padding: 8px 16px;

  border: 1px solid var(--kb-accent);
  background: #ffffff;

  color: var(--kb-accent);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.history-button:hover {
  background: var(--kb-accent);
  color: #ffffff;
}

/* =========================================
   HISTORY
========================================= */

.history {
  margin-top: 16px;
  border: 1px solid var(--kb-border);
  overflow: hidden;
}

.history-tabs {
  display: flex;
  border-bottom: 1px solid var(--kb-border);
}

.history-tabs button {
  flex: 1;
  min-height: 40px;
  padding: 8px 4px;

  border: 0;
  border-right: 1px solid var(--kb-border);
  background: #ffffff;

  color: var(--kb-text);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.history-tabs button:last-child {
  border-right: 0;
}

.history-tabs button:hover {
  background: #f7f4f1;
  color: var(--kb-brown);
}

.history-tabs button.active {
  background: var(--kb-brown);
  color: #ffffff;
  font-weight: 500;
}

.history-header {
  padding: 16px 16px 10px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--kb-text);
  font-size: 14px;
}

.history-header strong {
  color: var(--kb-brown);
  letter-spacing: 1px;
}

.history-table {
  padding-bottom: 8px;
}

.history-empty {
  margin: 0;
  padding: 16px;
  color: var(--kb-text);
  font-size: 14px;
}

.history-row {
  min-height: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr 180px;
  align-items: center;
  gap: 10px;

  border-top: 1px solid var(--kb-border);
  padding: 8px 16px;

  color: var(--kb-text);
  font-size: 14px;
}

.history-row button {
  justify-self: end;
  padding: 8px 12px;

  background: #ffffff;
  border: 1px solid var(--kb-accent);

  color: var(--kb-accent);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.history-row button:hover {
  background: var(--kb-accent);
  color: #ffffff;
}

/* =========================================
   EDITOR
========================================= */

.editor {
  border: 1px solid var(--kb-border);
  min-height: 0;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.editor-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid var(--kb-border);
  background: #ffffff;
  font-size: 16px;
  color: var(--kb-text);
}

.editor-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px;
}

.editor-menu-name {
  margin-left: 4px;
  color: var(--kb-brown);
  letter-spacing: 2px;
}

.editor-language {
  display: flex;
  align-items: center;
  gap: 10px;
}

.editor-language span {
  min-width: 40px;
  height: 32px;
  padding: 0 10px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--kb-brown);
  background: var(--kb-brown);

  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
}

/* =========================================
   DATE
========================================= */

.editor-field {
  margin-bottom: 32px;
}

.editor-field label {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--kb-brown);
}

.editor-field input {
  width: 180px;
  padding: 10px 16px;
  box-sizing: border-box;

  border: 1px solid var(--kb-border);
  background: #ffffff;

  color: var(--kb-text);
  font-size: 16px;
  outline: none;
}

.editor-field input:focus {
  border-color: var(--kb-accent);
}

.editor-placeholder {
  margin: 0;
  color: var(--kb-text);
}

/* =========================================
   MENU SECTIONS
========================================= */

.menu-section {
  margin-bottom: 32px;
}

.section-title-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 22px;
  align-items: start;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--kb-brown);
}

.section-title-row .delete-button {
  margin-top: 6px;
}

.category-input {
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 1.45em;
  padding: 4px 0;
  box-sizing: border-box;

  border: 0;
  border-bottom: 1px solid transparent;
  background: transparent;

  color: var(--kb-brown);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  line-height: 1.45;
  text-transform: uppercase;
  outline: none;

  resize: none;
  overflow: hidden;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
  field-sizing: content;
}

.category-input::placeholder {
  color: var(--kb-border);
}

.category-input:focus {
  border-bottom-color: var(--kb-accent);
}

.option-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 88px 22px;
  gap: 10px;
  margin-bottom: 10px;
}

.option-fields {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.description-input,
.price-input {
  width: 100%;
  padding: 10px 16px;
  box-sizing: border-box;

  border: 1px solid var(--kb-border);
  background: #ffffff;

  color: var(--kb-text);
  font-size: 16px;
  outline: none;

  transition: border-color 0.3s;
}

.description-input:focus,
.price-input:focus {
  border-color: var(--kb-accent);
}

.price-input {
  text-align: center;
  padding: 10px 8px;
}

.delete-button {
  width: 22px;
  height: 22px;
  align-self: center;
  padding: 0;

  border: 0;
  border-radius: 50%;
  background: #ed4646;

  color: #ffffff;
  font-size: 11px;
  line-height: 1;
  letter-spacing: 0;

  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background: #c93232;
}

/* =========================================
   ADD OPTION
========================================= */

.add-option-container {
  display: flex;
  justify-content: flex-end;
}

.add-option {
  padding: 10px 20px;

  border: 1px solid var(--kb-accent);
  background: #ffffff;

  color: var(--kb-accent);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.add-option:hover {
  background: var(--kb-accent);
  color: #ffffff;
}

.insert-category {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin: 4px 0 20px;
  padding: 8px 0;

  border: 0;
  background: transparent;

  color: var(--kb-accent);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 2px;

  cursor: pointer;
}

.insert-category::before,
.insert-category::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--kb-border);
}

.insert-category:hover {
  color: var(--kb-brown);
}

.insert-category:hover::before,
.insert-category:hover::after {
  background: var(--kb-accent);
}

/* =========================================
   FOOTER
========================================= */

.editor-footer-wrap {
  flex-shrink: 0;
  border-top: 1px solid var(--kb-border);
  background: #ffffff;
}

.save-feedback {
  margin: 12px 20px 0;
  font-size: 14px;
}

.save-feedback.is-success {
  color: var(--kb-accent);
}

.save-feedback.is-error {
  color: #c93232;
}

.editor-footer {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding: 16px 20px 20px;
  background: #ffffff;
}

.editor-button {
  padding: 10px 16px;

  border: 1px solid var(--kb-accent);
  background: #ffffff;

  color: var(--kb-accent);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.editor-button:hover {
  background: var(--kb-accent);
  color: #ffffff;
}

.editor-button:disabled {
  opacity: 0.6;
  cursor: default;
}

.editor-button:first-child {
  background: var(--kb-accent);
  color: #ffffff;
}

.editor-button:first-child:hover {
  background: var(--kb-brown);
  border-color: var(--kb-brown);
}

.editor-button:last-child {
  background: var(--kb-brown);
  border-color: var(--kb-brown);
  color: #ffffff;
}

.editor-button:last-child:hover {
  background: #2a211e;
}

/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 900px) {
  .dashboard {
    height: auto;
    overflow: visible;
  }

  .dashboard-content {
    grid-template-columns: 1fr;
    padding: 20px;
    overflow: visible;
    height: auto;
    gap: 32px;
  }

  .sidebar {
    overflow: visible;
  }

  .greeting {
    padding-right: 0;
  }

  .greeting h1 {
    font-size: 24px;
  }

  .warning-box {
    width: 100%;
    max-width: 420px;
    margin-top: 0;
    margin-left: 0;
  }

  .editor {
    height: 70vh;
    min-height: 480px;
  }
}

@media (max-width: 550px) {
  .dashboard-content {
    padding: 16px;
  }

  .topbar-date {
    font-size: 14px;
  }

  .logout-button {
    right: 12px;
    padding: 6px 10px;
    font-size: 12px;
  }

  .menu-item {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .menu-actions {
    width: 100%;
    justify-content: space-between;
  }

  .history-tabs {
    flex-wrap: wrap;
  }

  .history-tabs button {
    flex: 1 1 33%;
    border-bottom: 1px solid var(--kb-border);
  }

  .history-header,
  .history-row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .history-row button {
    justify-self: start;
  }

  .option-row,
  .section-title-row {
    grid-template-columns: minmax(0, 1fr) 22px;
  }

  .editor-footer {
    grid-template-columns: 1fr;
  }
}

/* =========================================
   PREVIEW
========================================= */

.preview-overlay {
  --kb-brown: #3b2f2b;
  --kb-accent: #968473;

  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  background: rgba(59, 47, 43, 0.72);
  font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
}

.preview-toolbar {
  flex-shrink: 0;
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #ffffff;
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.06);
}

.preview-toolbar-title {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--kb-brown);
}

.preview-close {
  padding: 8px 16px;

  border: 1px solid var(--kb-accent);
  background: #ffffff;

  color: var(--kb-accent);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.preview-close:hover {
  background: var(--kb-accent);
  color: #ffffff;
}

.preview-stage {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 32px 20px 48px;
}

.preview-stage :deep(.pdf-a4),
.preview-stage :deep(.pdf-page) {
  margin-left: auto;
  margin-right: auto;
}

.preview-stage :deep(.pdf-page) {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
}
</style>

<style>
.print-root {
  position: fixed;
  left: 0;
  top: 0;
  width: 210mm;
  z-index: 0;
  pointer-events: none;
}

@media screen {
  .print-root {
    visibility: hidden;
  }
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  html.printing-pdf,
  html.printing-pdf body {
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
  }

  html.printing-pdf body>*:not(.print-root) {
    display: none !important;
  }

  html.printing-pdf .print-root {
    position: static !important;
    visibility: visible !important;
    width: 210mm;
    margin: 0;
    padding: 0;
    overflow: visible !important;
  }
}
</style>
