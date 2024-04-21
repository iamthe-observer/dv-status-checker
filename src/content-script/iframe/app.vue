<script setup lang="ts">
import supabase from '~/supabase/supabase';

const appData = ref()

// onMounted(async () => {
//   const { data } = await supabase.from('applicants').select('*')
//   appData.value = data
// })

provide('appData', appData)
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
