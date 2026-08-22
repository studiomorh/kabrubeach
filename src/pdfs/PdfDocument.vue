<script setup>
import MenuA4 from './templates/MenuA4.vue'
import MenuBreakfast from './templates/MenuBreakfast.vue'
import MenuChefsTable from './templates/MenuChefsTable.vue'

const templates = {
    a4: MenuA4,
    breakfast: MenuBreakfast,
    'chefs-table': MenuChefsTable,
}

defineProps({
    menu: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['ready'])
</script>

<template>
    <component :is="templates[menu.template]" :menu="menu" @ready="emit('ready')" />
</template>
