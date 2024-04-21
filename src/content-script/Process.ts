import { Applicant } from '@/interfaces/int'
export class Process {
  apl: Applicant
  prev_aplID: string

  constructor(apl: Applicant, prev_aplID: string) {
    this.apl = apl
    this.prev_aplID = prev_aplID
  }

  start(nodes: {
    conf_code?: HTMLInputElement
    last_name?: HTMLInputElement
    yob?: HTMLInputElement
    captcha?: HTMLInputElement
  }) {}
}
