// import { Applicant } from '@/interfaces/int'
import './index.scss'
import gsap from 'gsap'
import { useAppStore } from './../stores/app.store'
// import supabase from '@/supabase/supabase'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')
const start = useStorage('start', false)

const iframe: HTMLIFrameElement = new DOMParser().parseFromString(
  `<div class="iframe-container">
  <span class="toggle">Checker</span>
  <iframe class="crx-iframe" id="contentframe" src="${src}"></iframe>
  </div>`,
  'text/html'
).body.firstElementChild as HTMLIFrameElement

const $ = document.querySelector<HTMLBodyElement>('#escbodytag')

$!.style.position = 'relative'

if (iframe || document.body) {
  document.body.insertBefore(iframe!, document.body.firstChild)
}

const toggle = document
  .querySelector('.iframe-container')!
  .querySelector<HTMLSpanElement>('.toggle')!

let if_open = true

toggle.onclick = () => {
  const frame = document.querySelector<HTMLIFrameElement>('.crx-iframe')
  if (if_open) {
    gsap.to(frame!, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        frame!.style.display = 'none'
      },
    })
  } else {
    frame!.style.display = 'block'
    gsap.to(frame!, {
      opacity: 1,
      duration: 0.2,
    })
  }
  if_open = !if_open

  // frame!.style.display = frame!.style.display === 'none' ? 'block' : 'none'
}

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

function getNodes() {
  const conf_code = document.querySelector<HTMLInputElement>('#txtCN')!
  const last_name = document.querySelector<HTMLInputElement>('#txtLastName')!
  const yob = document.querySelector<HTMLInputElement>('#txtYOB')!
  const captcha = document.querySelector<HTMLInputElement>('#txtCodeInput')!

  return { conf_code, last_name, yob, captcha }
}

function Fill(code: string, name: string, date: string) {
  const { conf_code, last_name, yob, captcha } = getNodes()

  if (!start.value || !conf_code) return

  conf_code.value = code
  last_name.value = name
  yob.value = date
  captcha.focus()

  setTimeout(() => {
    chrome.runtime.sendMessage({ type: 'state', value: '1' })
    captcha!.scrollIntoView({
      behavior: 'smooth',
    })
  }, 1000)
}

function getPage() {
  const nodes = getNodes()
  if (
    document.querySelector('.text-center.mt0 h3')?.innerHTML == 'Welcome' &&
    document.querySelectorAll('.text-center.mt0')[1]?.innerHTML ==
      'Entrant Status Check Instructions'
  ) {
    return 0
  } else if (nodes.captcha) {
    return 1
  } else if (document.querySelector('.col-12.col-sm-8.offset-sm-2.mt20')) {
    return 2
  } else {
    return -1
  }
}

function init() {
  const page = getPage()
  console.log(page)

  chrome.runtime.sendMessage({ type: 'page', value: '0' })
}

init()
