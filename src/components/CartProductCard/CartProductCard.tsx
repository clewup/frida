'use client'

import Button from '@/components/Button/Button'
import IconButton from '@/components/IconButton/IconButton'
import { useCart } from '@/contexts/CartContext/CartContext'
import AutoSubmit from '@/lib/common/components/AutoSubmit/AutoSubmit'
import { type ProductType } from '@/types/productTypes'
import { Field, Form, Formik } from 'formik'
import React, { type FC } from 'react'
import { Minus, Plus, ShoppingCart as CartIcon, Trash2 as RemoveIcon } from 'react-feather'
import { motion as m, type Variants } from 'framer-motion'

interface CartProductCardProps {
  product: ProductType
  quantity: number
}

const CartProductCard: FC<CartProductCardProps> = ({ product, quantity }) => {
  const { removeFromCart, updateCartItem, isLoading } = useCart()

  const { id, image, name, price } = product

  const containerVariants: Variants = {
    hidden: {},
    hover: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const ctaVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

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
    <m.div variants={containerVariants} initial="hidden" whileHover="hover" className="bg-white rounded-md p-5 flex justify-between relative">
      <div className="flex gap-5 w-4/5">
        <span className="w-1/4 aspect-square">
          <img src={image} alt={name} className="rounded-md" />
        </span>
        <span>
            <h1 className="text-xl">{name}</h1>
        </span>
      </div>

        <p className="text-xl">£{Number(price).toFixed(2)}</p>

        <m.div variants={ctaVariants}>
            <IconButton tooltipId={`cart-remove-tooltip-${id}`} tooltipText="Remove from cart" onClick={() => {
              void removeFromCart(product)
            }} isLoading={isLoading}>
                <RemoveIcon size={20} />
            </IconButton>
        </m.div>

        <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
            {({ values, setFieldValue, submitForm }) =>
                <Form className="flex gap-10 absolute right-5 bottom-5">
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
    </m.div>
  )
}

export default CartProductCard
