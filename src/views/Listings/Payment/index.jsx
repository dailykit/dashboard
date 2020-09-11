import React from 'react'
import axios from 'axios'
import tw from 'tailwind.macro'
import styled, { css } from 'styled-components'

import { Wrapper } from '../styled'
import { Loader } from '../../../components'
import { useTabs } from '../../../store/tabs'
import { TickIcon } from '../../../assets/icons'
import { UserContext } from '../../../store/user'

export const Payment = () => {
   const { tab, addTab } = useTabs()
   const [account, setAccount] = React.useState({})
   const [loginUrl, setLoginUrl] = React.useState('')
   const { state } = React.useContext(UserContext)
   const [isAccountLoading, setIsAccountLoading] = React.useState(true)

   React.useEffect(() => {
      if (state.organization?.stripeAccountId) {
         ;(async () => {
            const { data: { success, data = {} } = {} } = await axios.get(
               `${process.env.REACT_APP_DAILYKEY_URL}/api/account-details/${state.organization.stripeAccountId}`
            )
            if (success) {
               setAccount(data)
            }
            setIsAccountLoading(false)
         })()
      }
   }, [state.organization])

   React.useEffect(() => {
      if (!tab) {
         addTab('Payments', '/payment')
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
               {state.organization.stripeAccountId && loginUrl && (
                  <StyledButton
                     href={loginUrl}
                     target="__blank"
                     rel="noopener noreferrer"
                  >
                     Stripe Dashboard
                  </StyledButton>
               )}
               {!state.organization.stripeAccountId && (
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
         {isAccountLoading ? (
            <Loader />
         ) : (
            <>
               {Object.keys(account).length > 0 ? (
                  <>
                     <div className="mb-4 gap-3 grid grid-cols-1 md:grid-cols-4">
                        <section className="flex items-center">
                           <Tick
                              isActive={
                                 account?.capabilities?.card_payments ===
                                 'active'
                              }
                           />
                           <span className="pl-2 text-gray-700">
                              Card Payments
                           </span>
                        </section>
                        <section className="flex items-center">
                           <Tick
                              isActive={
                                 account?.capabilities?.transfers === 'active'
                              }
                           />
                           <span className="pl-2 text-gray-700">Transfers</span>
                        </section>
                        <section className="flex items-center">
                           <Tick isActive={account?.details_submitted} />
                           <span className="pl-2 text-gray-700">
                              Details Submitted
                           </span>
                        </section>
                     </div>
                     <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                        <Section>
                           <h1 className="text-xl text-teal-800">Basic</h1>
                           <Detail data={account?.id} label="Account Id: " />
                           <Detail
                              label="Name: "
                              data={account?.business_profile?.name}
                           />
                           <Detail
                              label="Currency: "
                              data={account?.default_currency}
                           />
                           <Detail
                              label="Statement Descriptor: "
                              data={
                                 account?.settings?.payments
                                    ?.statement_descriptor
                              }
                           />
                        </Section>
                        <Section>
                           <h1 className="text-xl text-teal-800">Contact</h1>
                           <Detail
                              label="Phone: "
                              data={account?.business_profile?.support_phone}
                           />
                           <Detail
                              label="Website: "
                              data={account?.business_profile?.url}
                           />
                           <Detail label="Email: " data={account?.email} />
                        </Section>
                     </div>
                  </>
               ) : (
                  <p className="text-center text-gray-600">
                     {state.organization?.stripeAccountId
                        ? 'Account details not available right now.'
                        : 'Pending stripe account integration.'}
                  </p>
               )}
            </>
         )}
      </Wrapper>
   )
}

const StyledButton = styled.a(
   () => css`
      ${tw`border border-green-300 hover:border-green-500 hover:bg-green-500 hover:text-white rounded flex items-center px-3 h-10`}
   `
)

const Section = styled.section`
   ${tw`border border-l-4 rounded p-3`}
   h3 {
      ${tw`mb-2 inline-block text-sm font-medium uppercase tracking-wider text-gray-600`}
   }
`

const Tick = ({ isActive }) => {
   return (
      <TickIcon
         size={18}
         className={`stroke-current ${
            isActive ? 'text-green-700' : 'text-gray-500'
         }`}
      />
   )
}

const Detail = ({ data = null, label = '' }) => {
   if (!data) return null
   return (
      <section>
         <h3>{label}</h3>
         <span>{data}</span>
      </section>
   )
}
