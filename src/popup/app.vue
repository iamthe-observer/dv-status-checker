<script setup lang="ts">
import { Applicant } from '@/interfaces/int';
import { useAppStore } from '@/stores/app.store';
import supabase from '@/supabase/supabase';

// const data1 = ref()

onMounted(async () => {
  useAppStore().$patch({
    loading: false
  })

  await getWinners()
})

const winners = ref<Applicant[]>([])
async function getWinners() {
  try {
    const { data, error } = await supabase.from('applicants').select('*').eq('status', true)
    if (error) {
      throw error
    }

    winners.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {

  const { count: apl } = await supabase
    .from('applicants')
    .select('*', { count: 'exact' })
  // data1.value = data

  const { count, error: error2 } = await supabase
    .from('applicants')
    .select('*', { count: 'exact' })
    .eq('checked', 'true')
  if (error2) {
    throw error2
  }


  //   const { count: _code } = await supabase
  //     .from('applicants')
  //     .select('*', { count: 'exact' })
  //     .eq('pconf_code', '')
  //   // .or('pconf_code', null)


  //   const { count: code } = await supabase
  //     .from('applicants')
  //     .select('*', { count: 'exact' })
  //     .neq('pconf_code', '')
  //   //   .or('pconf_code', null)

  useAppStore().$patch({
    apl_count: apl!,
    checked_count: count!,
    //     code_count: code!,
    //     _code_count: _code!,
    //     loading: false
  })

})
</script>

<template>
  <div class="p-2 font-bold" v-if="!useAppStore().loading">
    <header aria-label="Site Header"
      class="text-orange-700 flex items-center justify-between header-cont p-3 font-bold text-sm uppercase">
      Check Status

      <div class="flex gap-3">
        <span class="">Wins: {{ winners ? winners.length : 0 }}</span>
        <!-- <span class="">Losses: 200</span> -->
      </div>
    </header>

    <RouterView></RouterView>
  </div>

  <Loading class="" v-else></Loading>
</template>

<style scoped>
.header-cont {
  background: #EEF0F4;
  border-radius: 10px;
  box-shadow: inset 9.31px 9.31px 10px #B1B3B6, inset -9.31px -9.31px 10px #FFFFFF;
}
</style>
