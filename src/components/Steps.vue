<template>
	<ul class="mysteps relative flex flex-col gap-4">
		<!-- circle -->
		<figure
			class="circle block bg-black rounded-full w-6 m-0 aspect-square absolute z-10 drop-shadow-lg select-none">
			<div class="w-full h-full relative grid place-items-center text-white">
				{{ index_state + 1 }}
			</div>
		</figure>

		<li v-for="(step, i) in steps" :key="i" :class="[
					'mystep relative w-6 select-none aspect-square bg-neutral-300 rounded-full grid place-items-center before:w-1 before:h-[16px] before:top-full before:bg-neutral-300 before:absolute',
					i == steps.length - 1 ? 'before:hidden' : ''
				]">
			{{ i + 1 }}

			<span @click="nextStep" class="absolute left-full pl-3 whitespace-nowrap">{{ step }}</span>
		</li>
	</ul>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const index_state = useStorage('state', 0)
const steps = ref(['Fill Info', 'Awaiting Captcha', 'Results'])

const prop = defineProps({
	start: {
		type: Boolean,
		default: true
	}
})

watchEffect(() => {
	if (!prop.start) {
		index_state.value = 0
		// $.$patch({ state: 0 })
	}
})

onMounted(async () => {
	flipTo(index_state.value)
	chrome.runtime.onMessage.addListener((message) => {
		if (message.type === "state") {
			// $.$patch({ state: parseInt(message.value) })
			index_state.value = parseInt(message.value);
			setTimeout(() => {
				flipTo(index_state.value)
			}, 100)
		}
	});

})

function flipTo(index: number) {
	if (index == 0) {
		return document.querySelectorAll('.mystep').forEach(step => step.classList.remove('doneP'))
	} else if (index == 1) {
		document.querySelectorAll('.mystep')[0].classList.add('doneP')
	} else if (index == 2) {
		document.querySelectorAll('.mystep')[0].classList.add('doneP')
		document.querySelectorAll('.mystep')[1].classList.add('doneP')
		const step = document.querySelectorAll('.mystep')[index]
		const state = Flip.getState(".circle");
		step.appendChild(document.querySelector('.circle')!)
		Flip.from(state, {
			duration: 0.5,
			absolute: true,
			ease: 'expo.out',
		})
	} else return

	const step = document.querySelectorAll('.mystep')[index]
	const state = Flip.getState(".circle");
	step.appendChild(document.querySelector('.circle')!)
	Flip.from(state, {
		duration: 0.5,
		absolute: true,
		ease: 'expo.out',
	})

}

function nextStep() {
	if (index_state.value == steps.value.length - 1) {
		index_state.value = 0

		document.querySelectorAll('.mystep').forEach(step => step.classList.remove('doneP'))

	} else {
		index_state.value = index_state.value + 1

		document.querySelectorAll('.mystep')[index_state.value - 1].classList.add('doneP')
	}

	const mystep = document.querySelectorAll('.mystep')[index_state.value]
	const state = Flip.getState(".circle");
	mystep.appendChild(document.querySelector('.circle')!)
	Flip.from(state, {
		duration: 0.5,
		absolute: true,
		ease: 'expo.out',
	})
}

</script>

<style scoped>
.mystep::before {
	content: '';
}

.circle {
	background: radial-gradient(circle at 8.33px 8.33px, #ff8657, #6b2407, #ff5512);
	box-shadow: 91px 66px 79px -24px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: 91px 66px 79px -24px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 91px 66px 79px -24px rgba(0, 0, 0, 0.75);
}

.doneP,
.doneP::before {
	@apply bg-orange-200 text-black;
}
</style>