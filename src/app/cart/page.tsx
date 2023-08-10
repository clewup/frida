'use client'

import Button from '@/components/Button/Button'
import CartProductCard from '@/components/CartProductCard/CartProductCard'
import Heading from '@/components/Heading/Heading'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { useCart } from '@/contexts/CartContext/CartContext'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import getStripe from '@/lib/stripe'
import { Form, Formik, type FormikValues } from 'formik'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Info, ShoppingCart as CartIcon } from 'react-feather'

export default function Cart () {
  const { cart, getCart, isLoading } = useCart()
  const { user } = useLockr()
  const { post } = useApi()

  const [isRedirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if ((user == null) || (cart != null)) return
    void getCart()
  }, [user, cart])

  async function onSubmit (formValues: FormikValues) {
    setRedirecting(true)
    const stripe = await getStripe()
    const stripeData = await post<{ id: string }>('/api/stripe', formValues)
    void stripe.redirectToCheckout({ sessionId: stripeData.id })
    setRedirecting(false)
  }

  return (
    <PageWrapper className="min-h-screen-header flex justify-center items-center">
      <Formik
        initialValues={cart ?? {}}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {() => {
          return (
              <div className="w-full flex flex-col items-center mb-10">
                <Heading className="my-10">Shopping cart</Heading>
                <Form className="flex rounded-md  md:w-2/3 gap-5">
                  <div className="flex flex-col gap-5 w-2/3">
                    {isLoading && (
                        <div className="w-full h-60 flex justify-center items-center">
                          <TailSpin color="#111111" />
                        </div>
                    )}

                    {!isLoading && (((cart?.items?.length) == null) || cart?.items?.length === 0) && (
                        <div className="flex flex-col gap-5 p-10 items-center">
                          <CartIcon className="my-5 text-theme-black"/>
                          <p className="text-2xl text-center">Your cart is empty.</p>
                        </div>
                    )}

                    {!isLoading &&
                        (cart != null) &&
                        cart.items?.length > 0 &&
                        cart.items.map((item, index) => (
                            <CartProductCard key={index} product={item.product} quantity={item.quantity} />
                        ))}
                  </div>

                  <div className="w-1/3 flex flex-col gap-5 bg-theme-gray p-5 rounded-md">
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
                        isLoading={isRedirecting}
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
