<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'
import { storeToRefs } from 'pinia';
import gsap from 'gsap'


// const version = __VERSION__
// const displayName = __DISPLAY_NAME__
// const gitURL = __GITHUB_URL__
// const gitCommit = __GIT_COMMIT__
// const gitCommitURL = `${gitURL}/commit/${gitCommit}`

const { apl_count, code_count, _code_count, results } = storeToRefs(useAppStore())
const mouse = useMouse()
const curr_path = ref('')
function expand() {
  gsap.to('.containah', {
    minHeight: '300px',
    duration: 1,
    padding: '20px',
    ease: 'expo.out',
  })
}

function minimize() {
  gsap.to('.containah', {
    minHeight: '0px',
    padding: '0px',
    duration: 1,
    ease: 'expo.out',
  })
}

const cursor_dot = ref<HTMLElement>()

onMounted(() => {
  cursor_dot.value!.style.opacity = '0'
  // animate cursor on move
  function animateCursorDot(e: any) {
    gsap.to(cursor_dot.value!, {
      x: mouse.x.value,
      y: mouse.y.value,
      duration: 0.6,
    })
  }

  document.addEventListener('mousemove', animateCursorDot)
})

function showCursor(path: any[]) {
  cursor_dot.value!.style.opacity = '1'
  cursor_dot.value!.style.scale = '100%'
  curr_path.value = ''
  curr_path.value = path.primePath[0] ? `https://bwisulfnifauhpelglgh.supabase.co/storage/v1/object/public/applicants/${path.primePath[0]}` : `https://bwisulfnifauhpelglgh.supabase.co/storage/v1/object/public/applicants/avatar.svg`
  // curr_path.value = `https://wepsovihexcnzicbdmst.supabase.co/storage/v1/object/public/applicants/${path.primePath[0]}`
}
function hideCursor() {
  cursor_dot.value!.style.opacity = '0'
  cursor_dot.value!.style.scale = '0%'
  if_load_img.value = false
}

const if_load_img = ref(false)
function toggleLoad() {
  if_load_img.value = true
}
</script>

<template>
  <div class="relative">
    <Search @search="expand" @quit="minimize" class="absolute top-1/2 -translate-y-[60%] left-0 z-10 px-4" />

    <div class="flex justify-evenly items-center relative h-20 pl-10">

      <div class="w-14 h-16 flex flex-col items-center justify-center apl-container">
        <span class="apl-info font-bold text-orange-700 py-2 rounded-lg px-4">
          {{ apl_count }}
        </span>
        <span class="">
          Total
        </span>
      </div>

      <div class="w-14 h-16 flex flex-col items-center justify-center apl-container">
        <span class="apl-info font-bold text-orange-700 py-2 rounded-lg px-4">
          {{ code_count }}
        </span>
        <span class="">
          Code
        </span>
      </div>

      <div class="w-14 h-16 flex flex-col items-center justify-center apl-container">
        <span class="apl-info font-bold text-orange-700 py-2 rounded-lg px-4">
          {{ _code_count }}
        </span>
        <span class="">
          No Code
        </span>
      </div>

    </div>
  </div>

  <div class="w-full h-0 bg-black containah overflow-y-auto p-0 flex flex-col">
    <span
      class="w-full border-b border-neutral-200 py-2 hover:bg-orange-800 hover:pl-2 transition-all duration-200 ease-out cursor-pointer rounded-lg hover:text-white"
      v-for="(result, i) in results" @mouseover="showCursor(result.aplImg_path)" @mouseleave="hideCursor" :key="i">{{
      result.fullName
    }}</span>
  </div>

  <Teleport to="body">
    <div class="mouse-container">
      <div ref="cursor_dot"
        class="cursor_dot w-[80px] aspect-square fixed bg-black rounded-xl z-[10000] -translate-y-1/2 -translate-x-1/2 top-8 left-8 user-select-none pointer-events-none cursor-dot drop-shadow-xl">
        <span v-if="!if_load_img" class="w-full h-full grid place-items-center">Loading</span>
        <img v-show="if_load_img" @load="toggleLoad" :src="`${curr_path}`" alt=""
          class="w-full h-full bg-orange-700 rounded-xl">
      </div>
    </div>
  </Teleport>

</template>

<style scoped>
.apl-info {
  /* background: linear-gradient(145deg, #FFFFFF, #B3B5B8); */
  box-shadow: inset 6.61px 6.61px 9px #BCBEC1, inset -6.61px -6.61px 9px #FFFFFF;
  background-color: #eeeeee;
  font-weight: bold;
}

.containah {
  background: #EEF0F4;
  border-radius: 10px;
  box-shadow: inset 9.31px 9.31px 10px #B1B3B6, inset -9.31px -9.31px 10px #FFFFFF;
}
</style>
