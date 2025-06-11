import constants from '@/common/constants/constants'
import {type CartType} from '@/common/types/cartTypes'
import {extractAndDecodeAccessToken} from '@/common/utils/auth'
import {type NextRequest, NextResponse as response} from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(constants.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
})

export async function POST(request: NextRequest) {
    const body = await request.json() as CartType

    const user = extractAndDecodeAccessToken(request.headers.get('Authorization'))
    if (user === null) return response.error()

    // if cart total is £30 or more, apply free shipping rate
    let cartTotal = 0
    for (const item of body.items) {
        cartTotal = cartTotal + (item.product.price * item.quantity)
    }
    const shippingRate = cartTotal >= 30 ? constants.STRIPE_FREE_SHIPPING_RATE : constants.STRIPE_SHIPPING_RATE

    const session = await stripe.checkout.sessions.create({
        allow_promotion_codes: true,
        automatic_tax: {enabled: true},
        cancel_url: `${constants.APP_URL}`,
        customer_email: user.email,
        line_items: body.items.map((item) => ({
            adjustable_quantity: {
                enabled: false
            },
            price_data: {
                currency: 'gbp',
                product_data: {
                    images: [item.product.image],
                    name: item.product.name
                },
                unit_amount: Number((Number(item.product.price) * 100).toFixed(2))
            },
            quantity: item.quantity
        })),
        metadata: {
            cart: body.id
        },
        mode: 'payment',
        payment_method_types: ['card', 'paypal', 'klarna'],
        shipping_address_collection: {
            allowed_countries: ['GB']
        },
        shipping_options: [
            {
                shipping_rate: shippingRate
            }
        ],
        submit_type: 'pay',
        success_url: `${constants.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    })

    if (session.url == null) return response.error()

    return response.json(session)
}
