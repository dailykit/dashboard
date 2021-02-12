import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import { Radio } from '../../components'
import { useAuth } from '../../store/auth'
import VerifyEmailBanner from './VerifyEmailBanner'
import { UPDATE_ORGANIZATION } from '../../graphql'
import { Footer, H2, H4, Main, Button } from './styled'

export const Hosting = () => {
   const history = useHistory()
   const { user } = useAuth()
   const [update] = useMutation(UPDATE_ORGANIZATION, {
      onCompleted: () => {
         history.push('/signup/support')
      },
      onError: error => {
         console.log(error)
      },
   })

   const nextPage = () => {
      update({
         variables: {
            id: user.organization.id,
            _set: {
               onboardStatus: 'SUPPORT',
            },
         },
      })
   }
   const prevPage = () => history.push('/signup/about-yourself')

   return (
      <Layout>
         <Main>
            {!user?.keycloak?.email_verified && <VerifyEmailBanner />}
            <section className="mt-8 mx-auto w-2/4">
               <H2>Hosting</H2>
               <Radio>
                  <Radio.Option
                     value="cloud"
                     id="cloud"
                     name="hosting"
                     onClick={() => {}}
                  >
                     Cloud Hosting
                  </Radio.Option>
                  <Radio.Option
                     id="self"
                     isDisabled
                     name="hosting"
                     value=""
                     onClick={() => {}}
                  >
                     Self Hosting
                  </Radio.Option>
               </Radio>
               {user.organization?.hosting?.type === 'cloud' && (
                  <>
                     <H4>Choose your Plan</H4>
                     <Radio>
                        <Radio.Option
                           id="plan"
                           name="plan"
                           value="plan"
                           onClick={() => {}}
                        >
                           <strike>$100</strike>
                           &nbsp;Free
                        </Radio.Option>
                     </Radio>
                  </>
               )}
            </section>
         </Main>
         <Footer>
            <Button onClick={() => prevPage()}>Back</Button>
            <Button
               onClick={() => nextPage()}
               style={{
                  background: '#04a777',
               }}
            >
               Next
            </Button>
         </Footer>
      </Layout>
   )
}
