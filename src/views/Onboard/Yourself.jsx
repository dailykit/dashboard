import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import { useAuth } from '../../store/auth'
import { UPDATE_USER } from '../../graphql'
import { Footer, Main, Wrapper, Field, Label, Form } from './styled'

export const AboutYourself = () => {
   const { user } = useAuth()
   const history = useHistory()
   const [form, setForm] = React.useState({
      phoneNumber: '',
      designation: '',
   })

   const [update] = useMutation(UPDATE_USER, {
      onCompleted: () => {},
      onError: error => {
         console.log(error)
      },
   })

   React.useEffect(() => {
      if (user?.id) {
         setForm(form => ({
            ...form,
            designation: user?.designation || '',
            phoneNumber: user?.phoneNumber || '',
         }))
      }
   }, [user])

   const handleChange = e => {
      const { name, value } = e.target
      setForm(form => ({
         ...form,
         [name]: value,
      }))
   }

   const submit = () => {
      update({
         variables: {
            id: user.id,
            _set: {
               designation: form.designation,
               phoneNumber: form.phoneNumber,
            },
         },
      })
   }

   return (
      <Layout>
         <Wrapper>
            <Main>
               <div>
                  <h2>Tell us about yourself</h2>
                  <Form>
                     <Field>
                        <Label htmlFor="designation">Designation</Label>
                        <input
                           type="text"
                           required
                           id="designation"
                           name="designation"
                           value={form.designation}
                           autoComplete="off"
                           placeholder="Enter your designation"
                           onChange={e => handleChange(e)}
                        />
                     </Field>
                     <Field>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <input
                           type="tel"
                           id="phoneNumber"
                           name="phoneNumber"
                           required
                           value={form.phoneNumber}
                           autoComplete="off"
                           onChange={e => handleChange(e)}
                           placeholder="Enter your phone number"
                        />
                     </Field>
                  </Form>
               </div>
            </Main>
            <Footer>
               <button onClick={() => history.push('/signup/company')}>
                  Back
               </button>
               <button onClick={submit}>Next</button>
            </Footer>
         </Wrapper>
      </Layout>
   )
}
