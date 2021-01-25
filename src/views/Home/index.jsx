import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Grid } from '@giphy/react-components'
import { useLocation } from 'react-router-dom'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useMutation, useSubscription } from '@apollo/client'

import { useAuth } from '../../store/auth'
import { useTabs } from '../../store/tabs'
import { Layout } from '../../components'
import { INITIATE_SETUP, INSTANCE_STATUS } from '../../graphql'
import { StyledSection, StyledIllo, StyledButton } from './styled'

const Home = () => {
   const { user } = useAuth()
   const location = useLocation()

   React.useEffect(() => {
      if (location.search.includes('code')) {
         const code = new URLSearchParams(location.search).get('code')
         ;(async () => {
            if (code.length > 0 && user.organization.id) {
               await axios.get(
                  `${process.env.REACT_APP_DAILYKEY_URL}/api/account-id/?code=${code}&org_id=${user?.organization?.id}`
               )
            }
         })()
      }
   }, [user.organization, location])

   return (
      <Layout>
         <StyledSection>
            <div className="flex justify-between">
               <section>
                  <h2>Hello, {user.name}</h2>
                  <span>Organization: {user.organization.name}</span>
               </section>
               <a
                  target="__blank"
                  rel="noopener noreferrer"
                  href={`http://${user.organization.url}/desktop`}
                  className="border border-green-300 hover:border-green-500 hover:bg-green-500 hover:text-white rounded flex items-center px-3 h-10"
               >
                  Go to DailyOS
               </a>
            </div>
            <hr className="mt-2 mb-4" />
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
               Sections
            </h3>
            <main className="grid grid-cols-2 gap-2">
               <Card
                  title="Account"
                  path="/account"
                  description="View your account details."
               />
               <Card
                  title="Instance"
                  path="/instance"
                  description="View your dailyos details."
               />
               <Card
                  title="Delivery Partnerships"
                  path="/partnerships/delivery"
                  description="View your delivery partnerships details."
               />
               <Card
                  title="Payment"
                  path="/payment"
                  description="Manage your payments account"
               />
               <Card
                  title="Device Hub"
                  path="/device"
                  description="Manage your device account."
               />
               <Card
                  title="Email Integrations"
                  path="/email-integrations"
                  description="Manage your email integrations."
               />
            </main>
         </StyledSection>
      </Layout>
   )
}

export default Home

const Card = ({ title, path, description }) => {
   const { addTab } = useTabs()
   return (
      <div
         tabIndex="0"
         role="button"
         className="border border-l-4 rounded p-3 focus:outline-none focus:border-teal-600 hover:border-teal-600"
         onClick={() => addTab(title, path)}
         onKeyDown={e => [32, 13].includes(e.keyCode) && addTab(title, path)}
      >
         <h1 className="text-xl text-teal-800">{title}</h1>
         <p className="text-gray-500">{description}</p>
      </div>
   )
}
