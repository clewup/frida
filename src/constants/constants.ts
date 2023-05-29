const constants = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
  STRIPE_PUBLISHABLE_KEY: process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  STRIPE_SHIPPING_RATE: process.env.NEXT_PUBLIC_STRIPE_SHIPPING_RATE as string
}

export default constants
