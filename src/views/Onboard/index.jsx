import React from 'react'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client'
import { useHistory, Link } from 'react-router-dom'

import Layout from './Layout'
import { Label, Main } from './styled'
import * as utils from '../../utils'
import { useAuth } from '../../store/auth'
import { ADMIN_EXISTS } from '../../graphql'

export const Signup = () => {
   const history = useHistory()
   const { dispatch } = useAuth()
   const [error, setError] = React.useState('')
   const [submitting, setSubmitting] = React.useState(false)
   const [check_email] = useLazyQuery(ADMIN_EXISTS, {
      onCompleted: ({ admins = [] }) => {
         if (admins.length > 0) {
            setError('Email already exists!')
         } else {
            setError('')
         }
      },
   })
   const [form, setForm] = React.useState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
   })

   const isValid =
      form.email.trim() &&
      form.password.trim() &&
      form.firstName.trim() &&
      form.lastName.trim() &&
      !error

   const onChange = e => {
      const { name, value } = e.target
      setForm(form => ({
         ...form,
         [name]: value,
      }))
   }

   const submit = async () => {
      setSubmitting(true)
      try {
         const result = await utils.register({
            email: form.email,
            password: form.password,
            lastName: form.lastName,
            firstName: form.firstName,
         })
         if (result?.success) {
            const user = await utils.login({
               email: form.email.trim(),
               password: form.password.trim(),
            })
            if (user?.sub) {
               dispatch({ type: 'SET_USER', payload: { email: user?.email } })
               history.push('/signup/company')
            }
         }
      } catch (error) {
         setError('Failed to register, please try again!')
      } finally {
         setSubmitting(false)
      }
   }

   const handleEmailExists = value =>
      check_email({ variables: { where: { email: { _eq: value } } } })

   return (
      <Layout>
         <Main>
            <Panel>
               <h1 className="text-2xl mb-6">Register</h1>
               <FieldSet>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                     type="firstName"
                     name="firstName"
                     value={form.firstName}
                     onChange={onChange}
                     placeholder="Enter your first name"
                  />
               </FieldSet>
               <FieldSet>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                     type="lastName"
                     name="lastName"
                     value={form.lastName}
                     onChange={onChange}
                     placeholder="Enter your last name"
                  />
               </FieldSet>
               <FieldSet>
                  <Label htmlFor="email">Email</Label>
                  <Input
                     type="email"
                     name="email"
                     value={form.email}
                     onChange={onChange}
                     placeholder="Enter your email"
                     onBlur={e => handleEmailExists(e.target.value)}
                  />
               </FieldSet>
               <FieldSet>
                  <Label htmlFor="password">Password</Label>
                  <Input
                     name="password"
                     type="password"
                     onChange={onChange}
                     value={form.password}
                     placeholder="Enter your password"
                  />
               </FieldSet>
               <Link to="/login" className="mb-2 self-end text-indigo-500">
                  Login instead?
               </Link>
               <Submit
                  className={!isValid || submitting ? 'disabled' : ''}
                  onClick={() => (isValid || !submitting) && submit()}
               >
                  {submitting ? 'Submitting' : 'Submit'}
               </Submit>
               {error && (
                  <span className="self-start block text-red-500 mt-2">
                     {error}
                  </span>
               )}
            </Panel>
         </Main>
      </Layout>
   )
}

const Panel = styled.section`
   width: 320px;
   ${tw`flex mx-auto justify-center items-center flex-col py-4`}
`

const FieldSet = styled.fieldset`
   ${tw`w-full flex flex-col mb-4`}
`

const Input = styled.input`
   ${tw`w-full block border h-10 rounded px-2 outline-none focus:border-2 focus:border-blue-400`}
`

const Submit = styled.button`
   ${tw`bg-green-500 rounded w-full h-10 text-white uppercase tracking-wider`}
   &.disabled {
      ${tw`cursor-not-allowed bg-gray-300 text-gray-700`}
   }
`
