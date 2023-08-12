'use client'

import { useCart } from '@/contexts/CartContext/CartContext'
import { type ProductType } from '@/types/productTypes'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'
import { Minus, Plus, Trash2 as RemoveIcon } from 'react-feather'

interface CartItemRowProps {
  product: ProductType
  quantity: number
}

const CartItemRow: FC<CartItemRowProps> = ({ product, quantity }) => {
  const { removeFromCart, updateCartItem, isLoading } = useCart()

  const { image, name, price } = product

  interface CartItemFormValues {
    quantity: number
  }

  const initialValues: CartItemFormValues = {
    quantity
  }

  function handleSubmit ({ quantity }: CartItemFormValues) {
    void updateCartItem(product, quantity)
  }

  return (
      <tr className="text-center bg-white">
        <td className="flex py-5">
          <div className="flex gap-5 items-center">
              <Link href={`/product/${name}`}>
                  <div className="w-5 aspect-square relative md:w-16">
                      <Image src={image} alt={name} fill={true}/>
                  </div>
              </Link>
            <p>{name}</p>
          </div>
        </td>
        <td>£{price}</td>
        <td>
          <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
            {({ values, setFieldValue, submitForm }) =>
                <Form className="flex gap-10 w-full justify-center">
                  <div className="flex border-theme-gray border-[2px] rounded-md h-full px-2">
                    <button type="button"
                            disabled={isLoading}
                            onClick={() => { void setFieldValue('quantity', values.quantity - 1); void submitForm() }}
                    >
                      <Minus size={20} className="text-gray-400"/>
                    </button>
                    <Field name="quantity" className="focus:outline-0 w-10 text-center py-2"/>
                    <button type="button"
                            disabled={isLoading}
                            onClick={() => { void setFieldValue('quantity', values.quantity + 1); void submitForm() }}
                    >
                      <Plus size={20} className="text-gray-400"/>
                    </button>
                  </div>
                </Form>
            }
          </Formik>
        </td>
        <td>£{(price * quantity).toFixed(2)}</td>
        <td>
          <button onClick={() => {
            void removeFromCart(product)
          }} disabled={isLoading} className="text-gray-400">
            <RemoveIcon size={20} />
          </button>
        </td>
      </tr>
  )
}

export default CartItemRow
