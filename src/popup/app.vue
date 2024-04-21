<script setup lang="ts">
import { useAppStore } from '@/stores/app.store';

// const data1 = ref()

onMounted(() => {
  useAppStore().$patch({
    loading: false
  })
})

// onMounted(async () => {
//   const { count: apl } = await supabase
//     .from('applicants')
//     .select('*', { count: 'exact' })
//   // data1.value = data

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

//   useAppStore().$patch({
//     apl_count: apl!,
//     code_count: code!,
//     _code_count: _code!,
//     loading: false
//   })

// })
</script>

<template>
  <div class="p-2 font-bold" v-if="!useAppStore().loading">
    <header aria-label="Site Header"
      class="text-orange-700 flex items-center justify-between header-cont p-3 font-bold text-sm uppercase">
      Check Status

      <div class="flex gap-3">
        <span class="">Wins: 10</span>
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
