import React from 'react'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import { Button, Main, Footer } from './styled'
import { useAuth } from '../../store/auth'
import { UPDATE_ORGANIZATION } from '../../graphql'

export const Installation = () => {
   const { user } = useAuth()
   const history = useHistory()
   const [name, setName] = React.useState('')
   const [update, { loading }] = useMutation(UPDATE_ORGANIZATION, {
      onCompleted: () => history.push('/signup/finish-setup'),
   })

   const submit = () => {
      update({
         variables: {
            id: user.organization?.id,
            _set: {
               instanceRequested: true,
               onboardStatus: 'FINISH_SETUP',
               organizationUrl: `${name}.dailykit.org`,
            },
         },
      })
   }

   return (
      <Layout>
         <Main>
            <div style={{ width: '480px' }} className="text-center">
               <h2 className="text-3xl text-green-700 mb-4">
                  Customize your URL
               </h2>
               <p className="text-center text-gray-500 mb-2">
                  This is where you will access your apps and manage your team.
                  Make sure to bookmark it once you’re inside.
               </p>
               <section className="flex flex-col items-center">
                  <input
                     required
                     id="name"
                     type="text"
                     name="name"
                     value={name}
                     autoComplete="off"
                     placeholder="enter your subdomain"
                     onChange={e => setName(e.target.value.trim())}
                     className="text-center h-10 border-b-2 border-green-400 focus:border-green-600"
                  />
                  <span className="text-left text-green-500">
                     {name}.dailykit.org
                  </span>
               </section>
            </div>
         </Main>
         <Footer>
            <Button
               onClick={submit}
               disabled={!name || !user?.keycloak?.email_verified || loading}
            >
               {loading ? 'Saving' : 'Save'}
            </Button>
         </Footer>
      </Layout>
   )
}
