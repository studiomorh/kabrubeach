import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

function fontSizeFromTransform(transform) {
    return Math.hypot(transform[2], transform[3]) || Math.abs(transform[3]) || 12
}

export async function loadPdfBytes(source) {
    if (source instanceof ArrayBuffer) return new Uint8Array(source)
    if (source instanceof Uint8Array) return source
    const response = await fetch(source)
    if (!response.ok) throw new Error('Não foi possível carregar o PDF.')
    return new Uint8Array(await response.arrayBuffer())
}

export async function extractPdfLines(bytes) {
    const pdf = await pdfjsLib.getDocument({ data: bytes.slice() }).promise
    const pages = []

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber)
        const viewport = page.getViewport({ scale: 1 })
        const content = await page.getTextContent()
        const items = content.items
            .filter((item) => item.str && String(item.str).trim().length)
            .map((item) => {
                const fontSize = fontSizeFromTransform(item.transform)
                return {
                    str: item.str,
                    x: item.transform[4],
                    y: item.transform[5],
                    width: item.width || fontSize,
                    fontSize
                }
            })
            .sort((a, b) => {
                if (Math.abs(a.y - b.y) > 2) return b.y - a.y
                return a.x - b.x
            })

        const lines = []
        items.forEach((item) => {
            const last = lines[lines.length - 1]
            const sameLine = last && Math.abs(last.y - item.y) < Math.max(2, last.fontSize * 0.35)
            const toTheRight = last && item.x >= last.x - 1
            if (sameLine && toTheRight) {
                const gap = item.x - (last.x + last.width)
                last.str += (gap > last.fontSize * 0.22 ? ' ' : '') + item.str
                last.width = Math.max(last.width, item.x + item.width - last.x)
                last.fontSize = Math.max(last.fontSize, item.fontSize)
                last.y = Math.min(last.y, item.y)
            } else {
                lines.push({
                    id: `${pageNumber}-${lines.length}`,
                    page: pageNumber,
                    str: item.str,
                    original: item.str,
                    x: item.x,
                    y: item.y,
                    width: item.width,
                    fontSize: item.fontSize
                })
            }
        })

        pages.push({
            page: pageNumber,
            width: viewport.width,
            height: viewport.height,
            lines
        })
    }

    return { pdf, pages }
}

export async function renderPdfPage(pdf, pageNumber, canvas, width) {
    const page = await pdf.getPage(pageNumber)
    const unscaled = page.getViewport({ scale: 1 })
    const ratio = window.devicePixelRatio || 1
    const scale = (width / unscaled.width) * ratio
    const viewport = page.getViewport({ scale })

    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    canvas.style.width = `${Math.floor(viewport.width / ratio)}px`
    canvas.style.height = `${Math.floor(viewport.height / ratio)}px`

    const canvasContext = canvas.getContext('2d')
    await page.render({ canvasContext, viewport }).promise
    return { scale, width: viewport.width / ratio, height: viewport.height / ratio }
}

export async function exportEditedPdf(bytes, pages) {
    const doc = await PDFDocument.load(bytes)
    const font = await doc.embedFont(StandardFonts.Helvetica)
    const pdfPages = doc.getPages()

    pages.forEach((pageData) => {
        const page = pdfPages[pageData.page - 1]
        if (!page) return

        pageData.lines.forEach((line) => {
            if (line.str === line.original) return

            const size = Math.max(8, line.fontSize)
            const newWidth = line.str.trim() ? font.widthOfTextAtSize(line.str, size) : 0
            const coverWidth = Math.max(line.width, newWidth) + 6

            page.drawRectangle({
                x: line.x - 2,
                y: line.y - size * 0.22,
                width: coverWidth,
                height: size * 1.25,
                color: rgb(1, 1, 1)
            })

            if (line.str.trim()) {
                page.drawText(line.str, {
                    x: line.x,
                    y: line.y,
                    size,
                    font,
                    color: rgb(0.23, 0.18, 0.17)
                })
            }
        })
    })

    return doc.save()
}

export function downloadPdfBytes(bytes, filename) {
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
}
