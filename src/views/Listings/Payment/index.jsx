import React from 'react'
import axios from 'axios'
import tw from 'tailwind.macro'
import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { useTabs } from '../../../store/tabs'

import { Wrapper } from '../styled'

import { UserContext } from '../../../store/user'

export const Payment = () => {
   const history = useHistory()
   const { tabs } = useTabs()
   const [loginUrl, setLoginUrl] = React.useState('')
   const { state } = React.useContext(UserContext)

   React.useEffect(() => {
      const tab = tabs.find(item => item.path === `/payment`) || {}
      if (!Object.prototype.hasOwnProperty.call(tab, 'path')) {
         history.push('/')
      }
   }, [history, tabs])

   React.useEffect(() => {
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
   }, [state.organization])

   return (
      <Wrapper>
         <header className="flex justify-between  border-b pb-3 mb-4">
            <h1 className="text-xl text-teal-700">Payments</h1>
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
         </header>
      </Wrapper>
   )
}

const StyledButton = styled.a(
   () => css`
      ${tw`border border-green-300 hover:border-green-500 hover:bg-green-500 hover:text-white rounded flex items-center px-3 h-10`}
   `
)
