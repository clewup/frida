'use client'

import Button from "@/components/Button/Button";
import CartProduct from '@/components/CartProduct/CartProduct'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { useCart } from '@/contexts/CartContext/CartContext'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import getStripe from '@/lib/stripe'
import cx from 'classnames'
import { Form, Formik, type FormikValues } from 'formik'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { ShoppingCart as CartIcon } from 'react-feather'

export default function Cart () {
  const { cart, getCart, isLoading } = useCart()
  const { user } = useLockr()
  const { post } = useApi()

  const [isRedirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if ((user == null) || (cart != null)) return
    getCart()
  }, [user, cart])

  async function onSubmit (formValues: FormikValues) {
    setRedirecting(true)
    const stripe = await getStripe()
    const stripeData = await post<{ id: string }>('/api/stripe', formValues)
    stripe.redirectToCheckout({ sessionId: stripeData.id })
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
            <Form className="flex flex-col border-[1px] rounded-md p-5 md:w-1/3">
              <div className="flex flex-col gap-5">
                {isLoading && (
                  <div className="w-full h-60 flex justify-center items-center">
                    <TailSpin color="#111111" />
                  </div>
                )}

                {!isLoading && (!cart?.items?.length) && (
                    <div className="flex flex-col gap-5 p-10 items-center">
                      <CartIcon className="my-5 text-secondary"/>
                      <p className="text-2xl text-center">Your cart is empty.</p>
                    </div>
                )}

                {!isLoading &&
                  cart &&
                  cart.items?.length > 0 &&
                  cart.items.map((item, index) => (
                    <CartProduct key={index} product={item.product} quantity={item.quantity} />
                  ))}
              </div>

              <span className="border-b-[1px] my-5 border-neutral" />

              <div className="flex justify-end">
                <p className="text-2xl">
                  Total: £
                  {cart?.items
                    ? Number(cart.total).toFixed(2)
                    : '0.00'}
                </p>
              </div>

                  <Button
                      className="text-2xl mt-5"
                      isLoading={isRedirecting}
                      disabled={!cart?.items || cart?.items?.length === 0}
                  >
                    Checkout
                  </Button>
            </Form>
          )
        }}
      </Formik>
    </PageWrapper>
  )
}
