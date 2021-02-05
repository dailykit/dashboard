import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import {
   Tip,
   Info,
   Card,
   Main,
   Footer,
   Button,
   H2,
   CheckBoxWrapper,
} from './styled'
import Layout from './Layout'
import { useAuth } from '../../store/auth'
import { BulbEmoji } from '../../assets/icons'
import VerifyEmailBanner from './VerifyEmailBanner'
import { UPDATE_ORGANIZATION } from '../../graphql'

export const Support = () => {
   const { user } = useAuth()
   const history = useHistory()
   const [support, setSupport] = React.useState(false)
   const [update] = useMutation(UPDATE_ORGANIZATION, {
      onCompleted: () => {
         history.push('/signup/import')
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
               onboardStatus: 'IMPORT',
            },
         },
      })
   }
   const prevPage = () => history.push('/signup/hosting')

   return (
      <Layout>
         <Main>
            {!user?.keycloak?.email_verified && <VerifyEmailBanner />}
            <section className="mt-8 mx-auto w-2/4">
               <H2>Installation and Onboarding Support</H2>
               <CheckBoxWrapper>
                  <input
                     type="checkbox"
                     id="support"
                     checked={support}
                     onChange={() => setSupport(!support)}
                  />
                  <label htmlFor="support">
                     I want installation and onboard support
                  </label>
               </CheckBoxWrapper>
               <Info>
                  <div>
                     <Tip>
                        <span>
                           <BulbEmoji />
                        </span>
                        <p className="w-3/4">
                           Dailykit is here to help! With simplified intallation
                           and onboarding support, we will
                        </p>
                     </Tip>
                     <ul>
                        <li>Setup your software</li>
                        <li>Import your data</li>
                        <li>Train your staff</li>
                        <li>Provide 3 months of 24x7 world class support</li>
                     </ul>
                  </div>
                  <Card>
                     <h4>We have a plan for you</h4>
                     <span id="strike">$3000</span>
                     <span id="discount">100% off (limited)</span>
                     <span id="price">Free</span>
                  </Card>
               </Info>
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
