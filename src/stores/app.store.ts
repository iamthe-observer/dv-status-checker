import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Applicant } from '@/interfaces/int'

export const useAppStore = defineStore('app', () => {
  const loading = ref(true)
  const apl_count = useStorage<number>('apl_count', 0)
  const code_count = useStorage<number>('code_count', 0)
  const _code_count = useStorage<number>('_code_count', 0)
  const checked_count = useStorage<number>('checked_count', 0)
  const results = ref<Applicant[]>([])
  const check_result = ref(false)
  const state = useStorage('state', 0)
  const start = useStorage('start', false)
  const steps = ref(['Fill Info', 'Awaiting Captcha', 'Results'])
  const apl = ref<Applicant>(null)

  return {
    apl_count,
    code_count,
    _code_count,
    check_result,
    checked_count,
    loading,
    results,
    state,
    start,
    steps,
    apl,
  }
})
