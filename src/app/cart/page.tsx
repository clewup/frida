'use client'

import { fridaApi } from '@/common/api/handler'
import { type CartType } from '@/common/types/cartTypes'
import Button from '@/components/Button/Button'
import CartItemRow from '@/components/CartItemRow/CartItemRow'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { useCart } from '@/common/contexts/CartContext/CartContext'
import { useAuthKitty } from '@/lib/authkitty-helpers/contexts/AuthKittyContext/AuthKittyContext'
import getStripe from '@/lib/stripe'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Info } from 'react-feather'

export default function Cart () {
  const { cart, getCart, isLoading } = useCart()
  const { user } = useAuthKitty()
  const router = useRouter()

  const [isRedirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if ((user == null) || (cart != null)) return
    void getCart()
  }, [user, cart])

  const initialValues = cart ?? {} as CartType

  async function onSubmit (formValues: CartType) {
    setRedirecting(true)
    const stripe = await getStripe()
    const stripeData = await fridaApi.postOrder(formValues)
    void stripe.redirectToCheckout({ sessionId: stripeData.id })
    setRedirecting(false)
  }

  return (
    <PageWrapper className="min-h-screen-header flex justify-center items-center md:px-40">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {() => {
          return (
              <div className="w-full flex flex-col my-10">
                <Form className="flex flex-col rounded-md gap-5 min-h-screen-header w-full md:flex-row">
                  <div className="flex flex-col gap-5 p-5 rounded-md bg-white md:w-2/3">
                    <table>
                      <thead>
                      <tr className="border-b-theme-gray border-b-[2px]">
                        <th className="pb-5">ITEM</th>
                        <th className="pb-5">PRICE</th>
                        <th className="pb-5">QUANTITY</th>
                        <th className="pb-5">SUBTOTAL</th>
                        <th className="pb-5">REMOVE</th>
                      </tr>
                      </thead>
                      <tbody>
                      {cart?.items?.map(({ product, quantity }, index) => (
                          <CartItemRow key={index} product={product} quantity={quantity}/>
                      ))}
                      </tbody>
                    </table>

                    <div className="w-full flex justify-between">
                      <Button onClick={() => { router.push('/search') } }>
                        Continue shopping
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 bg-theme-gray p-5 rounded-md md:w-1/3">
                    <div className="flex w-full justify-between">
                      <p className="text-2xl">
                        Subtotal:
                      </p>
                      <p className="text-2xl">
                        £{((cart?.items) != null)
                        ? Number(cart.total).toFixed(2)
                        : '0.00'}
                      </p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <Info/>
                      <p>Taxes and shipping calculated at checkout.</p>
                    </div>

                    <Button
                        type="submit"
                        className="text-2xl w-full"
                        isLoading={isRedirecting || isLoading}
                        disabled={((cart?.items) == null) || cart?.items?.length === 0}
                    >
                      Checkout
                    </Button>
                  </div>

                </Form>
                </div>

          )
        }}
      </Formik>
    </PageWrapper>
  )
}
