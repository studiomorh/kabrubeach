<template>
  <RouterView />
  <WppButton v-if="!['login', 'dashboard'].includes($route.name)" />
</template>

<script>
import WppButton from './components/layout/WppButton.vue'

export default {
  components: {
    WppButton
  }
}
</script>