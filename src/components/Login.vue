<template>
    <div class="login-page">

        <!-- Top bar -->
        <header class="topbar">
            <span>BEACH</span>
        </header>

        <!-- Login area -->
        <main class="login-content">

            <section class="login-card">

                <!-- Logo -->
                <div class="title-container flex flex-col items-center justify-center mb-10 gap-6">
                    <img :src="logo" alt="KA BRU" class="logo" />
                    <!-- Title -->
                    <h3 class="">
                        Gerenciamento de Menus
                    </h3>
                </div>
                <!-- Form -->
                <form class="login-form" @submit.prevent="handleLogin">

                    <!-- Username -->
                    <div class="field">
                        <label for="username">
                            Usuário
                        </label>

                        <input id="username" v-model="username" type="text" placeholder="Insira seu usuário"
                            autocomplete="username" />
                    </div>

                    <!-- Password -->
                    <div class="field">
                        <label for="password">
                            Senha
                        </label>

                        <div class="password-wrapper">
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Insira sua senha" autocomplete="current-password" />

                            <button type="button" class="password-toggle" @click="showPassword = !showPassword"
                                :aria-label="showPassword
                                    ? 'Ocultar senha'
                                    : 'Mostrar senha'
                                    ">
                                <!-- Eye -->
                                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.5">
                                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                                    <circle cx="12" cy="12" r="2.5" />
                                </svg>

                                <!-- Eye off -->
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M3 3l18 18" />
                                    <path d="M10.6 6.2A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a17.5 17.5 0 0 1-3.1 3.7" />
                                    <path d="M6.2 6.7C3.8 8.4 2.5 12 2.5 12s3.5 6 9.5 6c1.4 0 2.6-.3 3.7-.8" />
                                    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Button -->
                    <div class="button-container">
                        <button type="submit" class="login-button">
                            ENTRAR
                        </button>
                    </div>

                </form>

            </section>

        </main>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/images/iconemarrom.svg'

const router = useRouter()
const username = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = () => {
    router.push('/dashboard')
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    background: #ffffff;
    color: #222222;
    font-family: Arial, Helvetica, sans-serif;
}

/* =========================================
   TOP BAR
========================================= */

.topbar {
    height: 49px;
    width: 100%;
    background: #d7d7d7;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: #222222;
}

/* =========================================
   CONTENT
========================================= */

.login-content {
    min-height: calc(100vh - 49px);

    display: flex;
    justify-content: center;

    padding-top: 91px;
}

/* =========================================
   CARD
========================================= */

.login-card {
    width: 285px;
}

/* =========================================
   LOGO
========================================= */

.logo-container {
    width: 100%;

    display: flex;
    justify-content: center;

    margin-bottom: 25px;
}

.logo {
    width: 82px;
    height: auto;
    object-fit: contain;
}

/* =========================================
   TITLE
========================================= */

.login-title {
    margin: 0 0 89px;

    text-align: center;

    font-size: 16px;
    line-height: 1.2;
    font-weight: 600;

    color: #222222;
}

/* =========================================
   FORM
========================================= */

.login-form {
    width: 100%;
}

/* =========================================
   INPUT FIELD
========================================= */

.field {
    position: relative;

    width: 100%;

    margin-bottom: 46px;
}

.field label {
    position: absolute;

    top: -7px;
    left: 9px;

    padding: 0 4px;

    background: #ffffff;

    font-size: 11px;
    line-height: 14px;

    color: #333333;

    z-index: 2;
}

.field input {
    width: 100%;
    height: 38px;

    padding: 0 12px;

    border: 1px solid #c8c8c8;
    border-radius: 5px;

    outline: none;

    background: #ffffff;

    font-size: 11px;
    color: #333333;

    box-sizing: border-box;

    transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
}

.field input::placeholder {
    color: #c8c8c8;
}

.field input:focus {
    border-color: #555555;

    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04);
}

/* =========================================
   PASSWORD
========================================= */

.password-wrapper {
    position: relative;
}

.password-wrapper input {
    padding-right: 38px;
}

.password-toggle {
    position: absolute;

    right: 9px;
    top: 50%;

    width: 17px;
    height: 17px;

    padding: 0;

    transform: translateY(-50%);

    border: 0;
    background: transparent;

    color: #777777;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
}

.password-toggle:hover {
    color: #333333;
}

.password-toggle svg {
    width: 15px;
    height: 15px;
}

/* =========================================
   BUTTON
========================================= */

.button-container {
    display: flex;
    justify-content: flex-end;

    margin-top: -2px;
}

.login-button {
    height: 34px;
    min-width: 68px;

    padding: 0 15px;

    border: 1px solid #222222;
    border-radius: 6px;

    background: #ffffff;

    color: #222222;

    font-size: 10px;
    font-weight: 700;

    cursor: pointer;

    transition:
        background 0.15s ease,
        color 0.15s ease;
}

.login-button:hover {
    background: #222222;
    color: #ffffff;
}

.login-button:active {
    transform: translateY(1px);
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 480px) {
    .login-content {
        padding: 70px 24px 40px;
    }

    .login-card {
        width: 100%;
        max-width: 285px;
    }
}
</style>