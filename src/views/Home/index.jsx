import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useMutation, useSubscription } from '@apollo/react-hooks'

import { useTabs } from '../../store/tabs'
import { UserContext } from '../../store/user'

import { StyledSection, StyledIllo, StyledButton } from './styled'

import { Modal } from '../../components'

import { INITIATE_SETUP, INSTANCE_STATUS } from '../../graphql'

const Home = () => {
   const { addTab } = useTabs()
   const location = useLocation()
   const { state: user } = React.useContext(UserContext)
   const [status, setStatus] = React.useState(null)
   const [initiateSetup] = useMutation(INITIATE_SETUP)
   const { data: { organization = {} } = {} } = useSubscription(
      INSTANCE_STATUS,
      {
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
            if (code.length > 0 && user?.organization?.id) {
               await axios.get(
                  `${process.env.REACT_APP_DAILYKEY_URL}/api/account-id/?code=${code}&org_id=${user?.organization?.id}`
               )
            }
         })()
      }
   }, [user.organization, location])

   return (
      <div>
         {status && status !== 'SETUP_COMPLETED' && (
            <Modal>
               <div className="text-center">
                  <StyledIllo>Illustration stuff</StyledIllo>
                  <StyledButton
                     onClick={() =>
                        initiateSetup({
                           variables: {
                              instanceRequested: true,
                              email: { _eq: user.email },
                           },
                        })
                     }
                  >
                     Initiate Setup
                  </StyledButton>
               </div>
            </Modal>
         )}
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
            </main>
         </StyledSection>
      </div>
   )
}

export default Home
