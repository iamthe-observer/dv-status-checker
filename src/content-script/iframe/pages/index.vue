<template>
  <div class="w-full h-full flex flex-col items-center overflow-hidden">

    <!-- header -->
    <div @click="$router.push('/fill')" class="w-full h-10 flex items-center px-2 gap-2">

    </div>

    <!-- main -->
    <div
      class="bg-neutral-50 h-full w-full flex justify-center items-center start-container relative border-2 border-neutral-300">
      <component :is="page" />

    </div>

    <!-- footer -->
    <div class="w-full h-10 p-1 flex flex-col">

    </div>

  </div>
</template>

<script setup lang="ts">
// import gsap from 'gsap';
// import supabase from '@/supabase/supabase';
// import { Applicant } from '@/interfaces/int';
// import { useElementHover } from '@vueuse/core';
import Fill from './fill.vue'
import Result from './result.vue'
import Start from './start.vue'

const which_page = ref(0)

onMounted(() => {
  chrome.runtime.onMessage.addListener((message) => {
    console.log('hello');

    if (message.type === "page") {
      which_page.value = message.value
    }
  })
})

const page = computed(() => {
  if (which_page.value == 0) return Start
  if (which_page.value == 1) return Fill
  if (which_page.value == 2) return Result
})


</script>