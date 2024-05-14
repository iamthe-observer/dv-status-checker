<template>
	<div class="w-full h-full flex justify-center items-center">


	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(['next'])
const props = defineProps<{
	src: string
	name: string
	code: string
}>()
</script>

<style scoped></style>