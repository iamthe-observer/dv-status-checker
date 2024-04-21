<template>
	<div class="flex items-center w-full py-2">
		<form @submit.prevent="async () => getSearch()"
			class="rounded-full w-10 h-10 bg-neutral-300 search-container drop-shadow-xl flex overflow-x-clip">
			<input type="text"
				class="inline-block bg-transparent border-none outline-none w-full h-full search-input p-0 text-[#000] font-bold text-center uppercase"
				v-model="search" placeholder="Search" />

			<figure class="circle block bg-black rounded-full relative w-10 m-0 aspect-square">

				<div @click="quit"
					class="absolute -left-3 circle top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 text-white rounded-full grid place-items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-3 aspect-square" viewBox="0 0 24 24">
						<path fill="currentColor"
							d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z" />
					</svg>
				</div>

				<span @click="open"
					class="font-bold text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<svg class="drop-shadow-xl hover:animate-pulse cursor-pointer w-6 aspect-square icon-search absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
						xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path fill="currentColor"
							d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
					</svg>
					<svg @click="async () => getSearch()" xmlns="http://www.w3.org/2000/svg"
						class="drop-shadow-xl w-6 aspect-square opacity-0 hover:animate-pulse cursor-pointer icon-arrow absolute left-1/2 top-1/2 -translate-x-[100px] -translate-y-1/2"
						viewBox="0 0 24 24">
						<path fill="currentColor" d="m11 19l3.425-6H2v-2h12.425L11 5l11 7z" />
					</svg>
				</span>
			</figure>
		</form>
	</div>

</template>

<script setup lang="ts">
import gsap from 'gsap'
import supabase from '@/supabase/supabase';
import { useAppStore } from '@/stores/app.store';

const emit = defineEmits(['search', 'quit'])
const opened = ref(false)
const search = ref('')

const open = () => {
	opened.value = true
	const icon_tl = gsap.timeline()
	icon_tl
		.to('.apl-container', {
			stagger: .1,
			opacity: 0,
			y: -50,
			display: 'none',
			duration: 1,
			ease: 'expo.out',
		})
		.to('.search-input', {
			width: '100%',
			padding: '15px',
			duration: 1,
			delay: 0.3,
			ease: 'power4.out',
		}, '<')
		.to('.search-container', {
			width: '100%',
			duration: 1,
			ease: 'expo.out',
		}, '<')
		.to('.icon-search', {
			opacity: 0,
			x: 50,
			duration: 1,
			ease: 'expo.out',
		}, '<')
		.to('.icon-arrow', {
			opacity: 1,
			x: -10,
			duration: 1,
			ease: 'expo.out',
		}, '<')
}
const quit = () => {
	search.value = ''
	useAppStore().$patch({
		results: [],
	})
	emit('quit')
	opened.value = false
	const tl = gsap.timeline()
	tl
		.add('start')
		.to('.search-container', {
			width: '40px',
			duration: 1,
			ease: 'expo.out',
			delay: 0.02
		}, 'start')
		.to('.search-input', {
			width: '0px',
			padding: '0px',
			duration: 1,
			ease: 'expo.out',
		}, 'start')

	const icon_tl = gsap.timeline()
	icon_tl
		.add('start')
		.to('.icon-search', {
			opacity: 1,
			x: -10,
			duration: 1,
			ease: 'expo.out',
		}, 'start')
		.to('.icon-arrow', {
			opacity: 0,
			x: -50,
			duration: 1,
			ease: 'expo.out',
		}, 'start')
		.to('.apl-container', {
			display: 'block',
			duration: 0,
			delay: 0.3,
			ease: 'expo.out',
		}, '<')
		.to('.apl-container', {
			stagger: .1,
			opacity: 1,
			y: 0,
			display: 'flex',
			duration: 1,
			// delay: 0.3,
			ease: 'expo.out',
		}, '<')

}

async function getSearch(
	val: string = search.value,
	table: string = 'applicants'
) {
	const value = val.toUpperCase()
	if (value == '') {
		useAppStore().$patch({
			results: [],
		})
		return
	}
	try {
		emit('search')
		const { data, error } = await supabase
			.from(table)
			.select('fullName,aplImg_path,pdob_year,user_id,apl_id,created_at')
			.ilike('fullName', `%${value}%`)
			.returns<[]>()
		if (error) throw error
		useAppStore().$patch({
			results: data!,
		})
		return data
	} catch (error) {
		console.log(error)
	}
}
</script>

<style scoped>
input:focus,
select:focus,
textarea:focus,
button:focus {
	outline: none;
}

*:focus {
	outline: none;
}

.circle {
	background: radial-gradient(circle at 13.33px 13.33px, #ff8657, #6b2407, #ff5512);
}

.search-container {
	box-shadow: inset 9.61px 9.61px 14px #b5b5b5, inset -9.61px -9.61px 14px #FFFFFF;
}
</style>