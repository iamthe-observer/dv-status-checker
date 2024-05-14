<script setup lang="ts">
import { Applicant } from '@/interfaces/int';
import supabase from '@/supabase/supabase';
// const displayName = __DISPLAY_NAME__
// const version = __VERSION__

const winners = ref<Applicant[]>([])

async function getWinners() {
  try {
    const { data, error } = await supabase.from('applicants').select('*').eq('status', true)
    if (error) {
      throw error
    }
    winners.value = data
  } catch (error) {
    alert(error)
  }
}

function copyToClipboard(apl: Applicant) {
  navigator.clipboard.writeText(apl.fullName + ' ' + apl.pcontact);
  alert('copied to clipboard')
}

onMounted(async () => {
  await getWinners()
})
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="uppercase font-extrabold text-4xl">Winners</h1>

    <div class="flex flex-col gap-2">

      <div class="flex gap-5" v-for="winner in winners" :key="winner.apl_id">
        <span class="">
          {{ winner.fullName }}
        </span>
        <span @click="copyToClipboard(winner)" class="hover:text-blue-500 cursor-pointer">
          {{ winner.pcontact }}
        </span>
      </div>

    </div>
  </div>
</template>
