import { type Dexie } from '@/lib/dexie/db'
import { type IndexableType } from 'dexie'

export default class DexieServices {
  private readonly db: Dexie

  constructor (db: Dexie) {
    this.db = db
  }

  async get<T>(table: string, key: number) {
    return this.db.table(table).get(key) as T
  }

  async add<T = IndexableType>(table: string, data: unknown) {
    return this.db.table(table).add(data) as T
  }

  async check (table: string, key?: number) {
    if (key !== null && key !== undefined) {
      return await this.db.table(table).get(key) !== null
    } else {
      return (await this.db.table(table).count()) > 0
    }
  }

  async update<T = IndexableType>(table: string, key: number, data: unknown) {
    return this.db.table(table).put(data, key) as T
  }

  async delete (table: string, key: number) {
    await this.db.table(table).delete(key)
  }
}
