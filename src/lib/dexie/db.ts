import DexieServices from '@/lib/dexie/services'
import DexieBase, { type Table } from 'dexie'

export interface CookieConsent {
  id?: number
  isConsenting: boolean
}

export enum DexieTables {
  COOKIE_CONSENT = 'cookieConsent',
}

export class Dexie extends DexieBase {
  services: DexieServices

  cookieConsent!: Table<CookieConsent>

  constructor () {
    super('store')

    this.version(1).stores({
      cookieConsent: '++id, isConsenting'
    })

    this.services = new DexieServices(this)
  }
}

export const db = new Dexie()
