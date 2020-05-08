import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { useAuth } from '../../store/auth'
import { useTabs } from '../../store/tabs'

import { FETCH_USER } from '../../graphql'

import { StyledSection } from './styled'

const Home = () => {
   const { user } = useAuth()
   const { addTab } = useTabs()
   const [organization, setOrganization] = React.useState(null)
   const [fetchUser, { loading, data }] = useLazyQuery(FETCH_USER)
   React.useEffect(() => {
      if (user.email) {
         fetchUser({
            variables: {
               where: {
                  email: { _eq: user.email },
               },
            },
         })
      }
   }, [user])
   React.useEffect(() => {
      if (!loading && Array.isArray(data?.organizationAdmins)) {
         const userOrg = data.organizationAdmins[0].organization
         setOrganization({
            name: userOrg.organizationName,
         })
      }
   }, [loading, data])

   if (loading) return <div>Loading...</div>
   return (
      <div>
         <StyledSection>
            <h2>
               Hello, {user.firstName} {user.lastName}
            </h2>
            <span>Organization: {organization?.name}</span>
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
            </main>
         </StyledSection>
      </div>
   )
}

export default Home
