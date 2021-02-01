import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import Layout from './Layout'
import { Radio } from '../../components'
import { useAuth } from '../../store/auth'
import { UPDATE_ORGANIZATION } from '../../graphql'
import { Footer, Main, Wrapper, Button } from './styled'

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
         <Wrapper>
            <Main>
               <div>
                  <h2>Hosting</h2>
                  <Radio>
                     <Radio.Option
                        id="self"
                        name="hosting"
                        value="self"
                        onClick={() => {}}
                     >
                        Self Hosting
                     </Radio.Option>
                     <Radio.Option
                        value=""
                        isDisabled
                        id="cloud"
                        name="hosting"
                        onClick={() => {}}
                     >
                        Cloud Hosting
                     </Radio.Option>
                  </Radio>
                  {user.organization?.hosting?.type === 'cloud' && (
                     <>
                        <h4>Choose your Plan</h4>
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
               </div>
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
         </Wrapper>
      </Layout>
   )
}
