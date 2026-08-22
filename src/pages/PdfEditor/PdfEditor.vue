<template>
    <div>
    <HeaderNav class="w-full" />

    <div class="content pb-16">
        <div class="mt-10">
            <h2 class="title">Editar PDF</h2>
            <h4 class="text-start text-[#565656] mt-5">
                Altere os textos do documento base e baixe a versão atualizada. As mudanças ficam no arquivo baixado,
                sem alterar o PDF original do site.
            </h4>
        </div>

        <label class="btn-secondary w-full mt-5 tracking-[2px] block text-center cursor-pointer">
            TROCAR PDF BASE
            <input type="file" accept="application/pdf" class="hidden" @change="onFileChange">
        </label>

        <div v-if="error" class="text-[#968473] text-[15px] mt-5 text-start">{{ error }}</div>
        <div v-if="loading" class="text-[#968473] text-[15px] mt-5 text-start">Carregando PDF...</div>

        <template v-if="!loading && pages.length">
            <div class="flex flex-col gap-2 mt-4">
                <button class="btn-dark tracking-[2px]" :disabled="exporting" @click="download">
                    {{ exporting ? 'GERANDO PDF...' : 'BAIXAR PDF' }}
                </button>
                <button class="btn-secondary w-full tracking-[2px]" @click="restore">RESTAURAR TEXTOS</button>
            </div>

            <div v-for="page in pages" :key="page.page" class="mt-10">
                <h3 class="text-start text-[#3b2f2b] text-[16px] tracking-[3px]">PÁGINA {{ page.page }}</h3>

                <img v-if="page.preview" :src="page.preview" :alt="'Página ' + page.page"
                    class="w-full h-auto mt-4 bg-[#f6f4f1]">

                <p v-if="!page.lines.length" class="text-[#968473] text-[15px] mt-4 text-start">
                    Esta página não tem texto editável (pode ser uma imagem).
                </p>

                <div class="flex flex-col gap-3 mt-5">
                    <label v-for="line in page.lines" :key="line.id" class="text-start">
                        <textarea v-model="line.str" rows="2"
                            class="w-full text-[15px] text-[#3b2f2b] leading-snug p-3 border border-[#968473] bg-white resize-y"
                            :class="{ 'opacity-70': line.str === line.original }"></textarea>
                    </label>
                </div>
            </div>
        </template>

        <RouterLink to="/" class="btn-secondary w-full mt-12 tracking-[2px] block text-center">
            VOLTAR AO GUIA
        </RouterLink>
    </div>
    </div>
</template>

<script>
import HeaderNav from '/src/components/layout/HeaderNav.vue'
import {
    downloadPdfBytes,
    extractPdfLines,
    exportEditedPdf,
    loadPdfBytes,
    renderPdfPage
} from '/src/utils/pdfText.js'

const BASE_PDF = '/pdf/base.pdf'

export default {
    components: {
        HeaderNav
    },
    data() {
        return {
            loading: true,
            exporting: false,
            error: '',
            pdf: null,
            bytes: null,
            pages: []
        }
    },
    mounted() {
        this.loadFromUrl(BASE_PDF)
    },
    methods: {
        async loadFromUrl(url) {
            this.loading = true
            this.error = ''
            try {
                const bytes = await loadPdfBytes(url)
                await this.openPdf(bytes)
            } catch (err) {
                console.error(err)
                this.error = 'Não foi possível abrir o PDF base.'
                this.loading = false
            }
        },
        async onFileChange(event) {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (!file) return
            this.loading = true
            this.error = ''
            try {
                await this.openPdf(new Uint8Array(await file.arrayBuffer()))
            } catch {
                this.error = 'Não foi possível ler esse PDF.'
                this.loading = false
            }
        },
        async openPdf(bytes) {
            this.bytes = bytes
            this.error = ''
            const { pdf, pages } = await extractPdfLines(bytes)
            this.pdf = pdf
            this.pages = pages
            this.loading = false
            await this.$nextTick()
            try {
                const width = this.$el?.querySelector('.content')?.clientWidth || 360
                for (const page of this.pages) {
                    const canvas = document.createElement('canvas')
                    await renderPdfPage(pdf, page.page, canvas, width)
                    page.preview = canvas.toDataURL('image/jpeg', 0.85)
                }
            } catch (err) {
                console.error(err)
            }
        },
        restore() {
            this.pages.forEach((page) => {
                page.lines.forEach((line) => {
                    line.str = line.original
                })
            })
        },
        async download() {
            if (!this.bytes || this.exporting) return
            this.exporting = true
            try {
                const output = await exportEditedPdf(this.bytes, this.pages)
                downloadPdfBytes(output, 'ka-bru-editado.pdf')
            } catch {
                this.error = 'Não foi possível gerar o PDF editado.'
            } finally {
                this.exporting = false
            }
        }
    }
}
</script>

<style scoped>
textarea:focus {
    outline: 1px solid #968473;
}
</style>
