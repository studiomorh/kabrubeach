<script setup>
import { onMounted } from 'vue'
import logo from '../../assets/images/iconemarrom.svg'

defineProps({
    menu: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['ready'])
onMounted(() => emit('ready'))
</script>

<template>
    <article class="pdf-page">
        <div class="pdf-columns">
            <section
                v-for="column in menu.columns"
                :key="column.id"
                class="pdf-column"
            >
                <header class="pdf-header">
                    <img :src="logo" alt="KA BRU" class="pdf-logo" />
                    <h1>{{ menu.title }}</h1>
                    <h2>{{ column.heading }}</h2>
                    <p class="pdf-intro">{{ column.intro }}</p>
                </header>

                <div
                    v-for="section in column.sections"
                    :key="section.id"
                    class="pdf-section"
                >
                    <h3>{{ section.title }}</h3>

                    <div
                        v-if="section.groupLabel"
                        class="pdf-group"
                    >
                        <span>{{ section.groupLabel }}</span>
                        <strong v-if="section.groupTag">{{ section.groupTag }}</strong>
                    </div>

                    <div
                        v-for="item in section.items"
                        :key="item.id"
                        class="pdf-item"
                    >
                        <p v-if="item.name" class="pdf-item-name">{{ item.name }}</p>
                        <p v-if="item.description" class="pdf-item-description">
                            {{ item.description }}
                        </p>
                    </div>
                </div>

                <footer class="pdf-footer">{{ menu.footer }}</footer>
            </section>
        </div>
    </article>
</template>

<style scoped>
.pdf-page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 12mm 10mm;
    box-sizing: border-box;
    background: #ffffff;
    color: #1a1a1a;
    font-family: Georgia, 'Times New Roman', serif;
}

.pdf-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18mm;
    min-height: 273mm;
}

.pdf-column {
    display: flex;
    flex-direction: column;
}

.pdf-header {
    text-align: center;
    margin-bottom: 18px;
}

.pdf-logo {
    width: 36px;
    height: 36px;
    margin: 0 auto 10px;
    object-fit: contain;
}

.pdf-header h1 {
    margin: 0 0 10px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.18em;
}

.pdf-header h2 {
    margin: 0 0 10px;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.28em;
    color: #968473;
}

.pdf-intro {
    margin: 0;
    font-size: 10px;
    font-style: italic;
    line-height: 1.4;
    color: #777777;
}

.pdf-section {
    margin-bottom: 16px;
}

.pdf-section h3 {
    margin: 0 0 8px;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
}

.pdf-group {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid #d8d0c8;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    font-size: 10px;
    letter-spacing: 0.12em;
}

.pdf-group strong {
    color: #c2a265;
    font-size: 9px;
}

.pdf-item {
    margin-bottom: 6px;
}

.pdf-item-name,
.pdf-item-description {
    margin: 0;
}

.pdf-item-name {
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    font-size: 11px;
}

.pdf-item-description {
    font-size: 10px;
    font-style: italic;
    color: #777777;
}

.pdf-footer {
    margin-top: auto;
    padding-top: 16px;
    text-align: center;
    font-size: 9px;
    font-style: italic;
    color: #9a9a9a;
}

@media print {
    .pdf-page {
        box-shadow: none;
    }
}
</style>
