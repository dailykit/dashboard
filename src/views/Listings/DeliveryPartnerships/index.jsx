import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { UserContext } from '../../../store/user'
import { useTabs } from '../../../store/tabs'

import { Wrapper } from '../styled'
import { StyledSection, StyledBadge } from './styled'

import { Loader, Modal } from '../../../components'

import { FETCH_DELIVERY_PARTNERSHIPS } from '../../../graphql'

export const DeliveryPartnerships = () => {
   const history = useHistory()
   const { tabs } = useTabs()
   const [status, setStatus] = React.useState('LOADING')
   const [partnerships, setPartnerships] = React.useState([])
   const { state: user } = React.useContext(UserContext)
   const {
      loading,
      data: { partnerships_deliveryPartnership = [] } = {},
   } = useSubscription(FETCH_DELIVERY_PARTNERSHIPS, {
      variables: {
         where: {
            organizationId: {
               _eq: user.organization.id,
            },
         },
      },
   })

   React.useEffect(() => {
      if (
         !loading &&
         user.organization.id &&
         Array.isArray(partnerships_deliveryPartnership)
      ) {
         setStatus('SUCCESS')
         setPartnerships(partnerships_deliveryPartnership)
      }
   }, [user, loading, partnerships_deliveryPartnership])

   React.useEffect(() => {
      const tab =
         tabs.find(item => item.path === `/partnerships/delivery`) || {}
      if (!Object.prototype.hasOwnProperty.call(tab, 'path')) {
         history.push('/')
      }
   }, [history, tabs])

   if (status === 'LOADING')
      return (
         <Wrapper>
            <Loader />
         </Wrapper>
      )
   if (status === 'SUCCESS')
      return (
         <Wrapper>
            <h1 className="text-xl text-teal-700 border-b pb-3 mb-4">
               Delivery Partnerships
            </h1>
            <ul className="grid grid-cols-2 gap-3">
               {partnerships.map(partnership => (
                  <li
                     key={partnership.id}
                     className="border border-l-4 rounded p-3"
                  >
                     <header className="flex items-center justify-between">
                        <StyledBadge isActive={partnership.isActive}>
                           {partnership.isActive ? 'Active' : 'Inactive'}
                        </StyledBadge>
                     </header>
                     <StyledSection>
                        <h3>Name:</h3>
                        <span>&nbsp;{partnership.deliveryCompany.name}</span>
                     </StyledSection>
                  </li>
               ))}
            </ul>
         </Wrapper>
      )
}
