<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import logo from '../../assets/images/iconemarrom.svg'

const props = defineProps({
    menu: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['ready'])

const spaced = (text = '') => text.split('').join(' ')

const measureRoot = ref(null)
const layoutPages = ref([])
let paginateToken = 0

const allSections = computed(() =>
    (props.menu.pages || []).flatMap((page) => page.sections || [])
)

const firstPageMeta = computed(() => props.menu.pages?.[0] || {})

const showCorkage = computed(() =>
    Boolean(props.menu.corkage && props.menu.pages?.some((page) => page.showCorkage))
)

const showCenterLogo = computed(() =>
    Boolean(props.menu.pages?.some((page) => page.showCenterLogo))
)

const sectionLabel = (section) => {
    if (section.align === 'center' && section.sidebarTitle) return [section.sidebarTitle]
    if (section.titleLines?.length) return section.titleLines
    return [section.title]
}

const outerHeight = (el) => {
    if (!el) return 0
    const styles = window.getComputedStyle(el)
    return (
        el.getBoundingClientRect().height +
        parseFloat(styles.marginTop || '0') +
        parseFloat(styles.marginBottom || '0')
    )
}

const paginate = async () => {
    const run = ++paginateToken
    await nextTick()
    if (run !== paginateToken) return

    const root = measureRoot.value
    if (!root) return

    const firstBody = root.querySelector('[data-measure="first-body"]')
    const nextBody = root.querySelector('[data-measure="next-body"]')
    const extras = root.querySelector('[data-measure="extras"]')
    const content = root.querySelector('[data-measure="content"]')

    if (!firstBody || !nextBody || !content) return

    const firstMax = firstBody.clientHeight
    const nextMax = nextBody.clientHeight
    const extrasH = extras ? outerHeight(extras) : 0

    const sectionNodes = [...content.querySelectorAll('[data-measure-section]')]

    const pages = []
    let current = { isFirst: true, sections: [] }
    let used = 0
    let max = firstMax

    const startPage = () => {
        if (current.sections.length) pages.push(current)
        current = { isFirst: false, sections: [] }
        used = 0
        max = nextMax
    }

    const fits = (height) => used + height <= max

    sectionNodes.forEach((sectionNode, sectionIndex) => {
        const source = allSections.value[sectionIndex]
        if (!source) return

        const labelH = outerHeight(sectionNode.querySelector('[data-measure-label]'))
        const headingH = outerHeight(sectionNode.querySelector('[data-measure-heading]'))
        const sectionGap = parseFloat(window.getComputedStyle(sectionNode).marginBottom || '0')
        const itemNodes = [...sectionNode.querySelectorAll('[data-measure-item]')]
        const headerBlock = labelH + headingH

        if (!itemNodes.length) return

        let itemIndex = 0
        while (itemIndex < itemNodes.length) {
            const firstItemH = outerHeight(itemNodes[itemIndex])
            const need = headerBlock + firstItemH + sectionGap

            if (used > 0 && !fits(need)) startPage()

            const chunkItems = []
            const chunkStart = itemIndex
            let block = headerBlock

            while (itemIndex < itemNodes.length) {
                const itemH = outerHeight(itemNodes[itemIndex])
                const nextHeight = block + itemH + sectionGap
                if (chunkItems.length && used + nextHeight > max) break
                chunkItems.push(source.items[itemIndex])
                block += itemH
                itemIndex += 1
            }

            if (!chunkItems.length) {
                chunkItems.push(source.items[itemIndex])
                itemIndex += 1
            }

            current.sections.push({
                ...source,
                id: `${source.id}-${chunkStart}`,
                items: chunkItems,
            })
            used += block + sectionGap
        }
    })

    if (current.sections.length || !pages.length) pages.push(current)

    const extrasNeeded = extrasH > 0 && (showCorkage.value || showCenterLogo.value)
    if (extrasNeeded) {
        const last = pages[pages.length - 1]
        const lastMax = last.isFirst ? firstMax : nextMax
        const lastUsed = last === current ? used : lastMax
        if (lastUsed + extrasH > lastMax && last.sections.length) {
            pages.push({ isFirst: false, sections: [], showExtras: true })
        } else {
            last.showExtras = true
        }
    }

    pages.forEach((page, index) => {
        page.isLast = index === pages.length - 1
        if (!page.showExtras) page.showExtras = false
    })

    if (run !== paginateToken) return
    layoutPages.value = pages
    await nextTick()
    if (run !== paginateToken) return
    emit('ready')
}

onMounted(paginate)
watch(
    () => props.menu,
    () => paginate(),
    { deep: true }
)
</script>

<template>
    <div class="pdf-a4">
        <div ref="measureRoot" class="pdf-measure" aria-hidden="true">
            <article class="pdf-page">
                <header v-if="firstPageMeta.showLogo || firstPageMeta.showTitle" class="pdf-header">
                    <img v-if="firstPageMeta.showLogo" :src="logo" alt="" class="pdf-logo" />
                    <div v-if="firstPageMeta.showTitle" class="pdf-title-wrap">
                        <span class="pdf-title">{{ menu.title }}</span>
                        <span v-if="firstPageMeta.showDate && menu.date" class="pdf-date">
                            {{ spaced(menu.date) }}
                        </span>
                    </div>
                </header>
                <div class="pdf-body" data-measure="first-body"></div>
                <footer class="pdf-footer">{{ menu.footer }}</footer>
            </article>

            <article class="pdf-page">
                <div class="pdf-body" data-measure="next-body"></div>
                <footer class="pdf-footer">{{ menu.footer }}</footer>
            </article>

            <div data-measure="extras">
                <p v-if="showCorkage" class="pdf-corkage">{{ menu.corkage }}</p>
                <img v-if="showCenterLogo" :src="logo" alt="" class="pdf-center-logo" />
            </div>

            <article class="pdf-page pdf-measure-content">
                <div class="pdf-body pdf-measure-body" data-measure="content">
                    <section
                        v-for="section in allSections"
                        :key="section.id"
                        class="pdf-section"
                        :class="{ 'is-center': section.align === 'center' }"
                        data-measure-section
                    >
                        <div class="pdf-section-label" data-measure-label>
                            <span v-for="(line, lineIndex) in sectionLabel(section)" :key="lineIndex">
                                {{ line }}
                            </span>
                        </div>
                        <div class="pdf-section-content flex flex-col gap-3">
                            <h2
                                v-if="section.align === 'center'"
                                class="pdf-center-heading"
                                data-measure-heading
                            >
                                {{ spaced(section.title) }}
                            </h2>
                            <div
                                v-for="item in section.items"
                                :key="item.id"
                                class="pdf-item"
                                :class="{ indent: item.indent }"
                                data-measure-item
                            >
                                <div class="pdf-item-text">
                                    <p v-if="item.name" class="pdf-item-name">{{ item.name }}</p>
                                    <p v-if="item.description" class="pdf-item-description">
                                        {{ item.description }}
                                    </p>
                                    <p v-if="item.subtitle" class="pdf-item-subtitle">{{ item.subtitle }}</p>
                                </div>
                                <span v-if="item.price" class="pdf-item-price">{{ item.price }}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </article>
        </div>

        <article
            v-for="(page, pageIndex) in layoutPages"
            :key="pageIndex"
            class="pdf-page"
        >
            <header
                v-if="page.isFirst && (firstPageMeta.showLogo || firstPageMeta.showTitle)"
                class="pdf-header"
            >
                <img v-if="firstPageMeta.showLogo" :src="logo" alt="KA BRU" class="pdf-logo" />
                <div v-if="firstPageMeta.showTitle" class="pdf-title-wrap">
                    <span class="pdf-title">{{ menu.title }}</span>
                    <span v-if="firstPageMeta.showDate && menu.date" class="pdf-date">
                        {{ spaced(menu.date) }}
                    </span>
                </div>
            </header>

            <div class="pdf-body">
                <section
                    v-for="section in page.sections"
                    :key="section.id"
                    class="pdf-section"
                    :class="{ 'is-center': section.align === 'center' }"
                >
                    <div class="pdf-section-label">
                        <span v-for="(line, lineIndex) in sectionLabel(section)" :key="lineIndex">
                            {{ line }}
                        </span>
                    </div>
                    <div class="pdf-section-content flex flex-col gap-3">
                        <h2 v-if="section.align === 'center'" class="pdf-center-heading">
                            {{ spaced(section.title) }}
                        </h2>
                        <div
                            v-for="item in section.items"
                            :key="item.id"
                            class="pdf-item"
                            :class="{ indent: item.indent }"
                        >
                            <div class="pdf-item-text">
                                <p v-if="item.name" class="pdf-item-name">{{ item.name }}</p>
                                <p v-if="item.description" class="pdf-item-description">
                                    {{ item.description }}
                                </p>
                                <p v-if="item.subtitle" class="pdf-item-subtitle">{{ item.subtitle }}</p>
                            </div>
                            <span v-if="item.price" class="pdf-item-price">{{ item.price }}</span>
                        </div>
                    </div>
                </section>
            </div>

            <p v-if="page.showExtras && showCorkage" class="pdf-corkage">
                {{ menu.corkage }}
            </p>
            <img
                v-if="page.showExtras && showCenterLogo"
                :src="logo"
                alt="KA BRU"
                class="pdf-center-logo"
            />

            <footer class="pdf-footer">
                {{ menu.footer }}
            </footer>
        </article>
    </div>
</template>

<style scoped>
.pdf-a4 {
    display: flex;
    flex-direction: column;
    gap: 24px;
    color: #1a1a1a;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
}

.pdf-measure {
    position: absolute;
    left: -9999px;
    top: 0;
    pointer-events: none;
    visibility: hidden;
}

.pdf-measure-content {
    height: auto;
    max-height: none;
    overflow: visible;
}

.pdf-measure-body {
    flex: none;
    overflow: visible;
    height: auto;
}

.pdf-page {
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    margin: 0 auto;
    padding: 23mm 20mm 16mm;
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}

.pdf-header {
    position: relative;
    min-height: 42px;
    margin-bottom: 28px;
    flex-shrink: 0;
}

.pdf-logo {
    position: absolute;
    left: 0;
    top: 0;
    width: 42px;
    height: 42px;
    object-fit: contain;
}

.pdf-title-wrap {
    display: flex;
    align-items: baseline;
    gap: 36px;
    padding-top: 8px;
    margin-left: 200px;
}

.pdf-title {
    margin: 0;
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 4px;
}

.pdf-date {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0px;
}

.pdf-body {
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.pdf-section {
    display: grid;
    grid-template-columns: 118px 1fr;
    gap: 80px;
    margin-bottom: 28px;
    align-items: start;
}

.pdf-section.is-center {
    grid-template-columns: 118px 1fr;
    margin-top: 36px;
}

.pdf-section-label {
    display: flex;
    flex-direction: column;
    padding-top: 2px;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 3px;
    line-height: 1.35;
    color: #1a1a1a;
}

.pdf-center-heading {
    margin: 0 0 18px;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.28em;
}

.pdf-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 42px;
    gap: 12px;
    margin-bottom: 12px;
    align-items: start;
}

.pdf-item.indent {
    padding-left: 18px;
}

.pdf-item-name,
.pdf-item-description,
.pdf-item-subtitle,
.pdf-item-price {
    margin: 0;
}

.pdf-item-name {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
}

.pdf-item-description {
    font-size: 14px;
    line-height: 1.35;
    color: #222222;
}

.pdf-item-subtitle {
    margin-top: 2px;
    font-size: 10px;
    letter-spacing: 0.08em;
    color: #555555;
}

.pdf-item-price {
    text-align: right;
    font-size: 12px;
    font-weight: 600;
}

.pdf-corkage {
    margin: 8px 0 18px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    flex-shrink: 0;
}

.pdf-center-logo {
    display: block;
    width: 48px;
    height: 48px;
    margin: auto auto 18px;
    object-fit: contain;
    flex-shrink: 0;
}

.pdf-footer {
    flex-shrink: 0;
    margin-top: auto;
    padding-top: 12px;
    text-align: center;
    font-size: 10px;
    letter-spacing: 1px;
    color: #8a8a8a;
}

@media print {
    .pdf-a4 {
        display: block;
        gap: 0;
    }

    .pdf-measure {
        display: none !important;
    }

    .pdf-a4 > .pdf-page {
        width: 210mm;
        height: 297mm;
        max-height: 297mm;
        margin: 0;
        box-shadow: none;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        page-break-inside: avoid;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }

    .pdf-a4 > .pdf-page:last-child {
        break-after: auto;
        page-break-after: auto;
    }
}
</style>
