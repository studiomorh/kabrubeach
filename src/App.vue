<template>
  <RouterView />
  <WppButton />
</template>

<script>
import WppButton from './components/layout/WppButton.vue'

export default {
  components: {
    WppButton
  }
}
</script>