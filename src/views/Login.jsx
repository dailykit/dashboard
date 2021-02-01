import React from 'react'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'

import Header from './Onboard/Header'
import { useAuth } from '../store/auth'

export const Login = () => {
   const history = useHistory()
   const { authenticated, login } = useAuth()
   const [error, setError] = React.useState('')
   const [form, setForm] = React.useState({ email: '', password: '' })

   const isValid = form.email.trim() && form.password.trim()

   const onChange = e => {
      const { name, value } = e.target
      setForm(form => ({
         ...form,
         [name]: value,
      }))
   }

   React.useEffect(() => {
      if (authenticated) {
         history.push('/')
      }
   }, [authenticated])

   const submit = async () => {
      try {
         setError('')
         const user = await login({
            email: form.email,
            password: form.password,
         })
         if (user?.sub) {
            history.push('/')
         }
      } catch (error) {
         if (error?.code === 401) {
            setError('Email or password is incorrect!')
         }
      }
   }
   return (
      <div>
         <Header />
         <Panel>
            <h1 className="text-2xl mb-6">Login</h1>
            <FieldSet>
               <Label htmlFor="email">Email</Label>
               <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Enter your email"
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
            <Link to="/signup" className="mb-2 self-end text-indigo-500">
               Register instead?
            </Link>
            <Submit
               className={!isValid ? 'disabled' : ''}
               onClick={() => isValid && submit()}
            >
               Submit
            </Submit>
            {error && <Error>{error}</Error>}
         </Panel>
      </div>
   )
}

const Panel = styled.section`
   width: 320px;
   ${tw`flex mx-auto justify-center items-center flex-col py-4`}
`

const FieldSet = styled.fieldset`
   ${tw`w-full flex flex-col mb-4`}
`

const Label = styled.label`
   ${tw`text-gray-600 mb-1`}
`

const Input = styled.input`
   ${tw`w-full block border h-10 rounded px-2 outline-none focus:border-2 focus:border-blue-400`}
`

const Error = styled.span`
   ${tw`self-start block text-red-500 mt-2`}
`

const Submit = styled.button`
   ${tw`bg-green-500 rounded w-full h-10 text-white uppercase tracking-wider`}
   &.disabled {
      ${tw`cursor-not-allowed bg-gray-300 text-gray-700`}
   }
`
