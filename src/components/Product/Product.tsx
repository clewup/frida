'use client'

import Button from '@/components/Button/Button'
import { useCart } from '@/common/contexts/CartContext/CartContext'
import { type ProductType } from '@/common/types/productTypes'
import { Field, Form, Formik } from 'formik'
import React, { type FC } from 'react'
import { Minus, Package as PackageIcon, Plus, ShoppingCart as CartIcon } from 'react-feather'

interface ProductProps {
  product: ProductType
}

const Product: FC<ProductProps> = ({ product }) => {
  const { addToCart, isLoading } = useCart()

  const { description, image, name, price, stock } = product

  interface ProductFormValues {
    quantity: number
  }

  const initialValues: ProductFormValues = {
    quantity: 1
  }

  function handleSubmit ({ quantity }: ProductFormValues) {
    void addToCart(product, quantity)
  }

  return (
        <div className="bg-white rounded-md flex flex-col w-full md:flex-row">
            <div className="p-10 md:w-1/2">
                {/* TODO: convert to next/image */}
                <img src={image} alt={name} className="rounded-md" />
            </div>
            <div className="flex flex-col justify-between p-10 md:w-1/2">
                <div className="text-center">
                    <h1 className="text-3xl h-20">{name}</h1>
                    <div className="p-2">
                        <p>{description}</p>
                    </div>
                </div>

                <div className="border-y-2 p-4">
                        <span className="flex gap-5 justify-center">
                            <PackageIcon/>
                            <p>Free shipping over £30!</p>
                        </span>
                </div>

                <div className="p-10 flex flex-col justify-between items-center gap-5 md:gap-0 md:flex-row ">
                    <p className="text-3xl">£{Number(price).toFixed(2)}</p>
                    {stock > 0
                      ? (
                          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                              {({ values, setFieldValue }) =>
                                  <Form className="flex h-full gap-10">
                                      <div className="flex border-theme-gray border-[2px] rounded-md h-full px-2">
                                          <button type="button"
                                                onClick={() => { void setFieldValue('quantity', values.quantity - 1) }}
                                          >
                                              <Minus size={20} className="text-gray-400"/>
                                          </button>
                                          <Field name="quantity" className="focus:outline-0 w-10 text-center py-2"/>
                                          <button type="button"
                                                  onClick={() => { void setFieldValue('quantity', values.quantity + 1) }}
                                          >
                                              <Plus size={20} className="text-gray-400"/>
                                          </button>
                                      </div>

                                      <div>
                                          <Button
                                              type="submit"
                                              isLoading={isLoading}
                                          >
                                              <CartIcon />
                                              Add to cart
                                          </Button>
                                      </div>
                                  </Form>
                              }
                          </Formik>

                        )
                      : (
                            <p>Out of stock</p>
                        )}
                </div>
            </div>
        </div>
  )
}

export default Product
