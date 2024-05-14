<template>
  <div class="w-full h-full flex flex-col items-center overflow-hidden">

    <!-- header -->
    <div @click="$router.push('/fill')" class="w-full h-10 flex items-center px-2 gap-2">

      <span class="">{{ checked_count }}</span>
      <progress :max="apl_count" :value="checked_count" class="bg-white w-full progress progress-info"></progress>
      <span class="">{{ apl_count }}</span>

    </div>

    <!-- start -->
    <div v-if="page == 0"
      class="bg-neutral-50 h-full w-full flex flex-col justify-center items-center relative border-[1.83px] border-neutral-300">

      <span @click="goToWinners"
        class="text-center items-center bg-blue-100 text-blue-600 font-bold absolute top-0 left-0 w-full hover:bg-blue-700 hover:text-white cursor-pointer">
        Winners: {{ winners ? winners.length : 0 }}
      </span>

      <div class="w-20 aspect-square">
        <img
          :src="`https://wepsovihexcnzicbdmst.supabase.co/storage/v1/object/public/applicants/${apl ? apl!.aplImg_path.primePath[0] : ''}`"
          alt="" class="rounded-xl outline outline-2 outline-blue-100 w-full h-full object-cover drop-shadow-xl">
      </div>

      <span class="font-bold text-blue-500 text-center">{{ apl ? apl.fullName : 'Applicant' }}</span>
      <span class="text-center">{{ apl ? apl.pconf_code : '123456789' }}</span>
      <span class="text-center text-xs">{{ apl ? new Date(apl.pdob).getFullYear() : '0000' }}</span>
      <span class="uppercase text-center text-xs">
        {{ apl ? apl.location : 'Location Unknown' }}
      </span>

    </div>

    <!-- fill -->
    <div v-if="page == 1"
      class="bg-neutral-50 h-full w-full flex flex-col gap-5 p-2 relative border-[1.8px] border-neutral-300">

      <section class="w-full flex items-center gap-2">
        <div class="w-10 aspect-square">
          <img
            :src="`https://wepsovihexcnzicbdmst.supabase.co/storage/v1/object/public/applicants/${apl ? apl!.aplImg_path.primePath[0] : ''}`"
            alt="" class=" w-full h-full object-cover rounded-lg outline outline-1 shadow-lg outline-blue-300">
        </div>

        <div class="flex flex-col bg-neutral-100 rounded-lg p-2 w-full h-full">
          <span class="whitespace-nowrap truncate w-32 font-bold">{{ apl ? apl.fullName : 'Applicant' }}</span>
          <span class="">{{ apl ? apl.pconf_code : '123456789' }}</span>
        </div>
      </section>

      <Steps />

      <span class="absolute bottom-0 left-0 w-full text-right px-1 hover:text-purple-800 cursor-pointer"
        @click="skipApplicant">
        Skip Applicant
      </span>
    </div>

    <!-- results -->
    <div v-if="page == 2"
      class="bg-neutral-50 h-full w-full flex flex-col justify-center items-center relative border-[1.83px] border-neutral-300 p-2">

      <div
        class="w-full font-bold flex flex-col items-center justify-center truncate absolute top-0 left-0 whitespace-nowrap">
        {{ apl ?
      apl.fullName :
      'Applicant'
        }}

        {{ apl ? apl.location : 'Location Unknown' }}</div>
      <div class="w-full text-center absolute bottom-0 left-0 cursor-pointer" @click="skipProcess">Skip Results</div>

      <div class="radial-progress text-blue-300"
        :style="{ '--value': skip_complete, '--size': '10rem', '--thickness': '2px' }" role="progressbar">

        <div class="w-20 aspect-square relative">
          <span class="win absolute inset-0 bg-green-500 z-10 opacity-0 rounded-xl"></span>
          <span class="lost absolute inset-0 bg-red-500 z-10 opacity-0 rounded-xl"></span>
          <img
            :src="`https://wepsovihexcnzicbdmst.supabase.co/storage/v1/object/public/applicants/${apl ? apl!.aplImg_path.primePath[0] : ''}`"
            alt="" class="rounded-xl outline outline-2 outline-blue-100 w-full h-full object-cover drop-shadow-xl">
        </div>

      </div>
    </div>

    <!-- error page -->
    <div v-if="page == -1"
      class="bg-neutral-50 h-full w-full flex flex-col justify-center items-center relative border-[1.83px] border-neutral-300 p-2">

      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path
          d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"
          fill="red" />
      </svg>

      <span class="">Error Occured!...</span>
      <span class="text-xs text-red-500">click ESC Home</span>

    </div>

    <!-- footer -->
    <div ref="footer" class="w-full h-10 p-1 flex justify-center items-center">
      <span v-if="!if_stop || !start" @click="startProcess"
        class="font-extrabold uppercase text-blue-400 cursor-pointer hover:text-red-400 w-full text-center">
        {{ !start ? 'Start' : "In Progress" }}
      </span>

      <span @click="stopProcess" v-if="start && if_stop"
        class="font-extrabold uppercase text-red-500 cursor-pointer w-full text-center">
        Stop
      </span>
    </div>

  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { useElementHover } from '@vueuse/core';
import supabase from '@/supabase/supabase';
import { Applicant } from '@/interfaces/int';

const page = ref(0)
const apl = ref<Applicant>(null)
const apl_count = useStorage<number>('apl_count', null)
const checked_count = useStorage<number>('checked_count', null)
const skip_complete = ref(0)
const start = useStorage('start', false)
const footer = ref()
const if_stop = useElementHover(footer)
const result = ref(false)
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

function goToWinners() {
  chrome.tabs.create({
    active: true,
    url: chrome.runtime.getURL('./src/setup/index.html?type=update'),
  })
}

onMounted(async () => {
  if (page.value == 0) {
    await getWinners()
    const applicant = await getNextApplicant()
    chrome.runtime.sendMessage({ type: 'apl', value: applicant })
  }
  await getCounts()

  if (page.value == 2) {
    try {
      const { error } = await supabase.from('applicants').update({ status: result.value, checked: true }).eq('apl_id', apl.value.apl_id)
      if (error) {
        throw error
      }
      console.log('updated', result.value)

      gsap.to(skip_complete, {
        value: 100,
        duration: !result.value ? 3 : 8,
        ease: 'power3.inOut',
        onComplete: () => {
          nextProcess()
        }
      })

      if (!result.value) {
        gsap.to('.lost', {
          opacity: .5,
          duration: 3,
          ease: 'power3.inOut',
        })
      } else {
        gsap.to('.win', {
          opacity: .5,
          duration: 3,
          ease: 'power3.inOut',
        })
      }


    } catch (error) {
      console.log(error)
    }



  }
})

chrome.storage.local.get('page', (data) => {
  page.value = data.page
})

chrome.storage.local.get('result', (data) => {
  console.log(data)
  result.value = data.result
})

async function getNextApplicant() {
  try {
    // const { data, error } = await supabase
    //   .from('applicants')
    //   .select('*')
    //   .eq('apl_id', '32c3cb85-1fb4-45da-8596-8ca82430b041')
    // .order('plastName', { ascending: true })
    // .neq('pconf_code', null)
    // .neq('pconf_code', '')
    // .limit(1)

    const { data, error } = await supabase
      .from('applicants')
      .select('*')
      .order('plastName', { ascending: true })
      .eq('checked', 'false')
      .neq('pconf_code', null)
      .neq('pconf_code', '')
      .limit(1)


    if (error) {
      throw error
    }

    chrome.runtime.sendMessage({ type: 'apl', value: data[0] })
    apl.value = data[0]
    return data[0]

  } catch (error: any) {
    console.error('Error fetching applicants:', error.message)
    return null
  }
}

async function getCounts() {
  try {
    const { count, error } = await supabase
      .from('applicants')
      .select('*', { count: 'exact' })
    if (error) {
      throw error
    }
    apl_count.value = count

    const { count: count2, error: error2 } = await supabase
      .from('applicants')
      .select('*', { count: 'exact' })
      .eq('checked', 'true')
    if (error2) {
      throw error2
    }
    checked_count.value = count2


  } catch (error: any) {
    console.error('Error fetching counts:', error.message)
    return null
  }
}

function startProcess() {
  start.value = true
  chrome.runtime.sendMessage({ type: 'start', value: true })

  setTimeout(() => {
    chrome.tabs.update(undefined, { url: 'https://dvprogram.state.gov/ESC/CheckStatus.aspx' })
  }, 1000)
}

function stopProcess() {
  start.value = false
  chrome.runtime.sendMessage({ type: 'start', value: false })
}

function nextProcess() {
  if (start.value) {
    chrome.tabs.update(undefined, { url: 'https://dvprogram.state.gov/ESC/Default.aspx' })
  }
}

function skipProcess() {
  chrome.tabs.update(undefined, { url: 'https://dvprogram.state.gov/ESC/Default.aspx' })
}

async function skipApplicant() {
  try {
    const { error } = await supabase.from('applicants').update({ status: result.value, checked: true }).eq('apl_id', apl.value.apl_id)
    if (error) {
      throw error
    }
    console.log('updated', result.value)

  } catch (error) {
    console.log(error)
  }

  await getNextApplicant()
}
</script>