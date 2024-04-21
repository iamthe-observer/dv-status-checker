<template>
	<div v-if="index_state == 2"
		class="w-[90%] mx-auto min-h-[30px] mt-3 flex justify-center items-center text-black relative bg-neutral-500 rounded-lg">
		<span
			class="z-10 text-white font-bold drop-shadow-lg cursor-pointer hover:text-black transition-all duration-150 ease-out"
			@click="emit('skip')">Skip</span>
		<div id="loader" class="absolute top-0 left-0 h-full w-0 rounded-lg bg-orange-500"></div>
	</div>
</template>

<script setup lang="ts">
import gsap from 'gsap';

const index_state = useStorage('state', 0)
const prop = defineProps({
	stopped: {
		type: Boolean,
		default: false
	}
})
const emit = defineEmits(['skip'])

onMounted(() => {
	if (index_state.value == 2) {
		gsap.fromTo('#loader', {
			width: 0,
		}, {
			width: '100%',
			ease: 'none',
			duration: 3,
			onComplete: () => {
				if (!prop.stopped) return
				emit('skip')
			}
		})
	}
})
</script>

<style scoped></style>