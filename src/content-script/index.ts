import { Applicant } from '@/interfaces/int'
import './index.scss'
import gsap from 'gsap'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')
const start = useStorage('start', false)
const apl = useStorage<Applicant>('apl', null)

const iframe = new DOMParser().parseFromString(
  `<div class="iframe-container">
  <span class="toggle">Check</span>
  <iframe class="crx-iframe" id="contentframe" src="${src}"></iframe>
  </div>`,
  'text/html'
).body.firstElementChild

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

  conf_code.value = code.trim()
  last_name.value = name.trim()
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
  } else if (
    document.querySelector('.col-12.col-sm-8.offset-sm-2.mt20') ||
    document.querySelector('#printdiv')
  ) {
    return 2
  } else {
    return -1
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'apl') {
    console.log(message.value)
    apl.value = message.value
  }
  if (message.type === 'start') {
    start.value = message.value
  }
  if (message.type === 'applicant') {
    setTimeout(() => {
      Fill(
        message.value.pconf_code,
        message.value.plastName,
        new Date(message.value.pdob).getFullYear().toString()
      )
    }, 500)
    console.log('frompop', message.value.pconf_code)
  }
})

function init() {
  const page = getPage()
  // console.log(page)
  chrome.storage.local.set({ page }, () => {
    console.log('page', page)
  })

  if (!start.value) {
    return
  } else {
    if (page == 0) {
      chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'apl') {
          apl.value = message.value
          console.log('message', message.value)
          setTimeout(() => {
            window.location.href =
              'https://dvprogram.state.gov/ESC/CheckStatus.aspx'
          }, 1000)
        }
      })
    } else if (page == 1) {
      watchEffect(() => {
        if (apl.value) {
          Fill(
            apl.value.pconf_code,
            apl.value.plastName,
            new Date(apl.value.pdob).getFullYear().toString()
          )
        }
      })
      console.log('started')

      const form = document.querySelector<HTMLFormElement>('#escform')

      form.addEventListener('submit', () => {
        console.log('submitted')
      })
    } else if (page == 2) {
      const lost_result = document.querySelector(
        '.col-12.col-sm-8.offset-sm-2.mt20'
      )
      const win_result = document.querySelector('#printdiv')

      if (lost_result) {
        chrome.storage.local.set({ result: false }, () => {})
      } else if (win_result) {
        chrome.storage.local.set({ result: true }, () => {})
      }
    }
  }
}

init()
