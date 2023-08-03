'use client'

import Button from '@/components/Button/Button'
import { type UserType } from '@/lib/common/types/userTypes'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'

const UserForm = () => {
  const { user } = useLockr()

  if (user == null) return <></>

  function onSubmit (formValues: UserType) {}

  return (
        <Formik initialValues={user} onSubmit={onSubmit}>
            {() =>
                <Form className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title" component="select" className="border-b-[2px] border-b-theme-gray focus:outline-0">
                      <option value="mr">Mr</option>
                      <option value="mrs">Mrs</option>
                      <option value="ms">Ms</option>
                      <option value="miss">Miss</option>
                      <option value="dr">Dr</option>
                    </Field>
                    <ErrorMessage name="title">{(errorMessage) => (<p className="text-red-500">{errorMessage}</p>) }</ErrorMessage>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <Field id="name" name="name" className="border-b-[2px] border-b-theme-gray focus:outline-0"/>
                    <ErrorMessage name="name">{(errorMessage) => (<p className="text-red-500">{errorMessage}</p>) }</ErrorMessage>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" className="border-b-[2px] border-b-theme-gray focus:outline-0"/>
                    <ErrorMessage name="email">{(errorMessage) => (<p className="text-red-500">{errorMessage}</p>) }</ErrorMessage>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="telephone">Telephone</label>
                    <Field id="telephone" name="telephone" className="border-b-[2px] border-b-theme-gray focus:outline-0"/>
                    <ErrorMessage name="telephone">{(errorMessage) => (<p className="text-red-500">{errorMessage}</p>) }</ErrorMessage>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-xl">Contact Preferences</h2>

                    <p className="py-5">
                      We’d be delighted to keep you updated on our special offers, new product launches and the many ways in which Frida Furniture can help you create a beautifully furnished home. You can decide how you’d like to receive these communications by ticking one or more of the boxes below:
                    </p>

                    <div className="flex flex-col">
                      <div className="flex gap-5">
                        <Field id="contact.email" name="contact.email" type="checkbox"/>
                        <label htmlFor="contact.email">Email</label>
                      </div>
                      <ErrorMessage name="contact.email">{(errorMessage) => (<p className="text-red-500">{errorMessage}</p>) }</ErrorMessage>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-5">
                        <Field id="contact.sms" name="contact.sms" type="checkbox"/>
                        <label htmlFor="contact.sms">SMS</label>
                      </div>
                      <ErrorMessage name="contact.sms">{(errorMessage) => (<p className="text-red-500">{errorMessage}</p>) }</ErrorMessage>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Button type="submit" className="w-full">
                      Apply Changes
                    </Button>
                  </div>
                </Form>
            }
        </Formik>
  )
}

export default UserForm
