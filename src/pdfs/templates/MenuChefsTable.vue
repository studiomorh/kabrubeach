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
        <header class="pdf-header">
            <img :src="logo" alt="KA BRU" class="pdf-logo" />
            <h1>{{ menu.title }}</h1>
            <p class="pdf-hosted">{{ menu.hostedBy }}</p>
            <p class="pdf-guests">{{ menu.guests }}</p>
            <p class="pdf-date">{{ menu.date }}</p>
        </header>

        <div class="pdf-courses">
            <section
                v-for="course in menu.courses"
                :key="course.id"
                class="pdf-course"
            >
                <h2>{{ course.title }}</h2>
                <p>{{ course.description }}</p>
            </section>
        </div>

        <footer class="pdf-footer">{{ menu.footer }}</footer>
    </article>
</template>

<style scoped>
.pdf-page {
    width: 148mm;
    min-height: 210mm;
    margin: 0 auto;
    padding: 16mm 14mm 12mm;
    box-sizing: border-box;
    background: #ffffff;
    color: #1a1a1a;
    font-family: Georgia, 'Times New Roman', serif;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.pdf-logo {
    width: 44px;
    height: 44px;
    margin: 0 auto 14px;
    object-fit: contain;
}

.pdf-header h1 {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.18em;
}

.pdf-hosted,
.pdf-guests,
.pdf-date {
    margin: 0;
}

.pdf-hosted {
    font-size: 11px;
    letter-spacing: 0.16em;
    color: #444444;
}

.pdf-guests,
.pdf-date {
    margin-top: 8px;
    font-size: 12px;
    color: #8a8a8a;
}

.pdf-courses {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
    padding: 18px 0;
}

.pdf-course h2 {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.16em;
}

.pdf-course p {
    margin: 0;
    font-size: 12px;
    color: #8a8a8a;
}

.pdf-footer {
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    font-size: 7px;
    letter-spacing: 0.16em;
    color: #9a9a9a;
}
</style>
