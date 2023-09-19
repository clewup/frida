import constants from '@/common/constants/constants'
import { loadStripe, type Stripe } from '@stripe/stripe-js'

let stripePromise: any

export default async function getStripe (): Promise<Stripe> {
  if (stripePromise === null || stripePromise === undefined) {
    stripePromise = loadStripe(constants.STRIPE_PUBLISHABLE_KEY)
  }

  return stripePromise
}
