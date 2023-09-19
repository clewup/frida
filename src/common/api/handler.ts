import FridaApiService from '@/common/api/frida'
import constants from '@/common/constants/constants'

export const fridaApi = new FridaApiService(`${constants.APP_URL}/api`, 'AKT')
