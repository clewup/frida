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
  DISCLAIMER = 'disclaimer'
}

export class Dexie extends DexieBase {
  services: DexieServices

  cookieConsent!: Table<CookieConsent, number>
  disclaimer!: Table<Disclaimer, number>

  constructor () {
    super('store')

    this.version(1).stores({
      cookieConsent: '++id',
      disclaimer: '++id'
    })

    this.services = new DexieServices(this)
  }
}

export const db = new Dexie()
