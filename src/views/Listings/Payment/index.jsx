import React from 'react'
import axios from 'axios'
import tw from 'tailwind.macro'
import styled, { css } from 'styled-components'

import { useTabs } from '../../../store/tabs'

import { Wrapper } from '../styled'

import { UserContext } from '../../../store/user'

export const Payment = () => {
   const { tab, addTab } = useTabs()
   const [loginUrl, setLoginUrl] = React.useState('')
   const { state } = React.useContext(UserContext)

   React.useEffect(() => {
      if (!tab) {
         addTab('/payment')
      }
   }, [tab, addTab])

   React.useEffect(() => {
      if (state.organization?.stripeAccountId) {
         ;(async () => {
            try {
               const response = await axios.get(
                  `${process.env.REACT_APP_DAILYKEY_URL}/api/login-link?accountId=${state.organization.stripeAccountId}`
               )
               if (response.data.success) {
                  setLoginUrl(response.data.data.link.url)
               }
            } catch (error) {
               console.log(error.message)
            }
         })()
      }
   }, [state.organization])

   const updateStripeStatus = async () => {
      const url = `${
         new URL(process.env.REACT_APP_DAILYCLOAK_URL).origin
      }/v1/query`

      const data = {
         datahubUrl: state.organization.datahubUrl,
         adminSecret: state.organization.adminSecret,
         stripeAccountId: state.organization.stripeAccountId,
      }
      await axios.post(
         url,
         {
            type: 'invoke_event_trigger',
            args: {
               name: 'updateDailyosStripeStatus',
               payload: { new: data },
            },
         },
         {
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'x-hasura-admin-secret':
                  process.env.REACT_APP_DAILYCLOAK_ADMIN_SECRET,
            },
         }
      )
   }

   return (
      <Wrapper>
         <header className="flex justify-between  border-b pb-3 mb-4">
            <h1 className="text-xl text-teal-700">Payments</h1>
            <section className="flex">
               <button
                  type="button"
                  onClick={updateStripeStatus}
                  className="text-gray-800 mr-3 rounded px-3 h-10 hover:bg-gray-300"
               >
                  Verify Stripe Status
               </button>
               {state.organization.stripeAccountId ? (
                  <StyledButton
                     href={loginUrl}
                     target="__blank"
                     rel="noopener noreferrer"
                  >
                     Stripe Dashboard
                  </StyledButton>
               ) : (
                  <StyledButton
                     target="__blank"
                     rel="noopener noreferrer"
                     href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CA_ID}&scope=read_write&redirect_uri=https://account.dailykit.org`}
                  >
                     Connect Stripe
                  </StyledButton>
               )}
            </section>
         </header>
      </Wrapper>
   )
}

const StyledButton = styled.a(
   () => css`
      ${tw`border border-green-300 hover:border-green-500 hover:bg-green-500 hover:text-white rounded flex items-center px-3 h-10`}
   `
)
