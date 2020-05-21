import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTabs } from '../../../store/tabs'

import { Wrapper } from '../styled'

import { UserContext } from '../../../store/user'

export const Payment = () => {
   const history = useHistory()
   const { tabs } = useTabs()
   const { state } = React.useContext(UserContext)
   React.useEffect(() => {
      const tab = tabs.find(item => item.path === `/payment`) || {}
      if (!Object.prototype.hasOwnProperty.call(tab, 'path')) {
         history.push('/')
      }
   }, [history, tabs])

   return (
      <Wrapper>
         <header className="flex justify-between  border-b pb-3 mb-4">
            <h1 className="text-xl text-teal-700">Payments</h1>
            {!state.organization.stripeAccountId && (
               <a
                  target="__blank"
                  rel="noopener noreferrer"
                  className="border border-green-300 hover:border-green-500 hover:bg-green-500 hover:text-white rounded flex items-center px-3 h-10"
                  href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CA_ID}&scope=read_write&redirect_uri=https://account.dailykit.org`}
               >
                  Connect Stripe
               </a>
            )}
         </header>
      </Wrapper>
   )
}
