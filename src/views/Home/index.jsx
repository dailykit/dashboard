import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Grid } from '@giphy/react-components'
import { useLocation } from 'react-router-dom'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useMutation, useSubscription } from '@apollo/client'

import { useAuth } from '../../store/auth'
import { useTabs } from '../../store/tabs'

import { StyledSection, StyledIllo, StyledButton } from './styled'

import { Modal, Layout } from '../../components'

import { INITIATE_SETUP, INSTANCE_STATUS } from '../../graphql'

const Home = () => {
   const { addTab } = useTabs()
   const location = useLocation()
   const { user, authenticated } = useAuth()
   const [status, setStatus] = React.useState(null)
   const { data: { organization = {} } = {} } = useSubscription(
      INSTANCE_STATUS,
      {
         skip: !authenticated,
         variables: { id: user.organization.id },
      }
   )

   React.useEffect(() => {
      if (organization?.instanceStatus) {
         setStatus(organization.instanceStatus)
      }
   }, [organization])

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
               <div
                  tabIndex="0"
                  role="button"
                  className="border border-l-4 rounded p-3 focus:outline-none focus:border-teal-600 hover:border-teal-600"
                  onClick={() => addTab('Account', '/account')}
                  onKeyDown={e =>
                     [32, 13].includes(e.keyCode) &&
                     addTab('Account', '/account')
                  }
               >
                  <h1 className="text-xl text-teal-800">Account</h1>
                  <p className="text-gray-500">View your account details.</p>
               </div>
               <div
                  tabIndex="0"
                  role="button"
                  className="border border-l-4 rounded p-3 focus:outline-none focus:border-teal-600 hover:border-teal-600"
                  onClick={() => addTab('Instance', '/dailyos')}
                  onKeyDown={e =>
                     [32, 13].includes(e.keyCode) &&
                     addTab('Instance', '/dailyos')
                  }
               >
                  <h1 className="text-xl text-teal-800">Daily OS</h1>
                  <p className="text-gray-500">View your dailyos details.</p>
               </div>
               <div
                  tabIndex="0"
                  role="button"
                  className="border border-l-4 rounded p-3 focus:outline-none focus:border-teal-600 hover:border-teal-600"
                  onClick={() =>
                     addTab('Delivery Partnerships', '/partnerships/delivery')
                  }
                  onKeyDown={e =>
                     [32, 13].includes(e.keyCode) &&
                     addTab('Delivery Partnerships', '/partnerships/delivery')
                  }
               >
                  <h1 className="text-xl text-teal-800">
                     Delivery Partnerships
                  </h1>
                  <p className="text-gray-500">
                     View your delivery partnerships details.
                  </p>
               </div>
               <div
                  tabIndex="0"
                  role="button"
                  className="border border-l-4 rounded p-3 focus:outline-none focus:border-teal-600 hover:border-teal-600"
                  onClick={() => addTab('Payment', '/payment')}
                  onKeyDown={e =>
                     [32, 13].includes(e.keyCode) &&
                     addTab('Payment', '/payment')
                  }
               >
                  <h1 className="text-xl text-teal-800">Payment</h1>
                  <p className="text-gray-500">Manage your payments account.</p>
               </div>
               <div
                  tabIndex="0"
                  role="button"
                  className="border border-l-4 rounded p-3 focus:outline-none focus:border-teal-600 hover:border-teal-600"
                  onClick={() => addTab('Device Hub', '/device')}
                  onKeyDown={e =>
                     [32, 13].includes(e.keyCode) &&
                     addTab('Device Hub', '/device')
                  }
               >
                  <h1 className="text-xl text-teal-800">Device Hub</h1>
                  <p className="text-gray-500">Manage your device account.</p>
               </div>
               <div
                  tabIndex="0"
                  role="button"
                  className="border border-l-4 rounded p-3 focus:outline-none focus:border-teal-600 hover:border-teal-600"
                  onClick={() =>
                     addTab('Email Integrations', '/email-integrations')
                  }
                  onKeyDown={e =>
                     [32, 13].includes(e.keyCode) &&
                     addTab('Email Integrations', '/email-integrations')
                  }
               >
                  <h1 className="text-xl text-teal-800">Email Integrations</h1>
                  <p className="text-gray-500">
                     Manage your email integrations.
                  </p>
               </div>
            </main>

            {status && status !== 'SETUP_COMPLETED' && (
               <InitiateModal setStatus={setStatus} />
            )}
         </StyledSection>
      </Layout>
   )
}

export default Home

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const InitiateModal = () => {
   const { user } = useAuth()
   const [keyword, setKeyword] = React.useState('button')
   const [initiateSetup] = useMutation(INITIATE_SETUP, {
      onCompleted: async ({ updateOrganization = {} }) => {
         const { instanceRequested } = updateOrganization
         if (instanceRequested) {
            setKeyword('launch')
            await sleep(120000)
            setKeyword('popcorn')
            await sleep(180000)
            setKeyword('loading')
            await sleep(180000)
            setKeyword('cooking')
            await sleep(300000)
            setKeyword('excitement')
         }
      },
   })
   const { data: { organization = {} } = {} } = useSubscription(
      INSTANCE_STATUS,
      {
         variables: { id: user.organization.id },
      }
   )

   return (
      <Modal>
         <div className="text-center">
            <StyledIllo>
               {keyword === 'button' && <RenderGifs keyword="button" />}
               {keyword === 'launch' && <RenderGifs keyword="launch" />}
               {keyword === 'popcorn' && <RenderGifs keyword="popcorn" />}
               {keyword === 'loading' && <RenderGifs keyword="loading" />}
               {keyword === 'cooking' && <RenderGifs keyword="cooking" />}
               {keyword === 'excitement' && <RenderGifs keyword="excitement" />}
               {organization.instanceStatus === 'SETUP_COMPLETED' && (
                  <RenderGifs keyword="celebrate" />
               )}
               <StyledCredit>
                  <img src="/giphy.png" alt="Powered by Giphy" />
               </StyledCredit>
            </StyledIllo>
            {!organization?.instanceRequested && (
               <StyledButton
                  onClick={() =>
                     initiateSetup({
                        variables: {
                           _set: { instanceRequested: true },
                           id: user.organization.id,
                        },
                     })
                  }
               >
                  Initiate Setup
               </StyledButton>
            )}
         </div>
      </Modal>
   )
}

const RenderGifs = ({ keyword }) => (
   <Grid width={682} columns={3} fetchGifs={() => giphy.search(keyword)} />
)

const StyledCredit = styled.span`
   position: fixed;
   bottom: 12px;
   right: 12px;
   img {
      height: 16px;
   }
`
