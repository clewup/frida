import DexieServices from '@/lib/dexie/services'
import DexieBase, { type Table } from 'dexie'

export interface CookieConsent {
  id?: string
}

export interface Disclaimer {
  id?: string
}

export enum DexieTables {
  COOKIE_CONSENT = 'cookieConsent',
}

export class Dexie extends DexieBase {
  services: DexieServices

  cookieConsent!: Table<CookieConsent, number>

  constructor () {
    super('frida')

    this.version(1).stores({
      cookieConsent: '++id'
    })

    this.services = new DexieServices(this)
  }
}

export const db = new Dexie()
