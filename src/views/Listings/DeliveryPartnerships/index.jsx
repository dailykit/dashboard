import React from 'react'
import axios from 'axios'
import { useSubscription, useMutation } from '@apollo/client'

import { UserContext } from '../../../store/user'
import { useTabs } from '../../../store/tabs'

import { Wrapper } from '../styled'
import { StyledBadge } from './styled'

import { Loader, Modal } from '../../../components'

import {
   FETCH_DELIVERY_PARTNERSHIPS,
   UPDATE_DELIVERY_PARTNERSHIPS,
} from '../../../graphql'

const normalize = text =>
   text
      .replace(/([A-Z][a-z]+)/g, ' $1')
      .replace(/([A-Z]{2,})/g, ' $1')
      .replace(/\s{2,}/g, ' ')
      .trim()

const isCredsValid = async (token, customer) => {
   const { data } = await axios.get(
      'https://platform.dailykit.org/webhooks/delivery/verify',
      {
         params: {
            token,
            customer,
         },
      }
   )
   if (data.status === 200) {
      return true
   }
   return false
}

export const DeliveryPartnerships = () => {
   const { tab, addTab } = useTabs()
   const [isModalVisible, setIsModalVisible] = React.useState(false)
   const [selected, setSelected] = React.useState({})
   const [credStatus, setCredStatus] = React.useState({})
   const [status, setStatus] = React.useState('LOADING')
   const [partnerships, setPartnerships] = React.useState([])
   const [updateDeliverPartnership] = useMutation(UPDATE_DELIVERY_PARTNERSHIPS)
   const { state: user } = React.useContext(UserContext)
   const { loading } = useSubscription(FETCH_DELIVERY_PARTNERSHIPS, {
      variables: {
         where: {
            organizationId: {
               _eq: user.organization.id,
            },
         },
      },
      onSubscriptionData: ({ subscriptionData: { data = {} } = {} }) => {
         const { deliveryPartnerships = [] } = data
         if (deliveryPartnerships.length > 0) {
            setStatus('SUCCESS')
            setPartnerships(deliveryPartnerships)
         }
      },
   })

   React.useEffect(() => {
      if (!tab) {
         addTab('Delivery Partnerships', '/partnerships/delivery')
      }
   }, [tab, addTab])

   const handleChange = async e => {
      e.preventDefault()
      const data = new FormData(e.target)
      const keys = Object.fromEntries(data)
      if (keys.apiKey && keys.customerId) {
         const isValid = await isCredsValid(keys.apiKey, keys.customerId)
         if (isValid) {
            setCredStatus({
               success: true,
               message: 'Successfully verified credentials!',
            })
            setIsModalVisible(false)
            setCredStatus({})
            updateDeliverPartnership({
               variables: {
                  id: selected.id,
                  _set: {
                     keys,
                     isActive: true,
                     isApproved: true,
                  },
               },
            })
            setCredStatus({})
         } else {
            setCredStatus({
               success: false,
               error: 'Invalid credentials provided!',
            })
         }
      } else {
         setCredStatus({
            success: false,
            error: 'Please fill in the credentials',
         })
      }
   }

   if (loading)
      return (
         <Wrapper>
            <Loader />
         </Wrapper>
      )
   return (
      <Wrapper>
         {isModalVisible && (
            <Modal>
               <h1 className="text-xl text-teal-700 border-b pb-3 mb-3">
                  Edit Partnership: {selected.company.name}
               </h1>
               <form onSubmit={handleChange}>
                  {Object.keys(selected.keys).map(key => (
                     <div key={key} className="flex flex-col mb-3">
                        <label
                           htmlFor={key}
                           className="uppercase text-gray-500 text-sm tracking-wider"
                        >
                           {normalize(key)}
                        </label>
                        <input
                           type="text"
                           name={key}
                           className="border rounded px-2 h-8 mt-1"
                           defaultValue={selected.keys[key]}
                        />
                     </div>
                  ))}
                  <footer className="flex items-center justify-between">
                     <aside>
                        <button
                           type="submit"
                           className="bg-green-500 text-white rounded px-2 h-8 mr-2"
                        >
                           Save
                        </button>
                        <button
                           type="button"
                           onClick={() =>
                              setIsModalVisible(false) || setCredStatus({})
                           }
                           className="border border-gray-400 rounded px-2 h-8"
                        >
                           Close
                        </button>
                     </aside>
                     {credStatus.success && (
                        <span className="text-green-500">
                           {credStatus.message}
                        </span>
                     )}
                     {!credStatus.success && (
                        <span className="text-red-500">{credStatus.error}</span>
                     )}
                  </footer>
               </form>
            </Modal>
         )}
         <h1 className="text-xl text-teal-700 border-b pb-3 mb-4">
            Delivery Partnerships
         </h1>
         {status === 'SUCCESS' && (
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
                        <button
                           type="button"
                           onClick={() =>
                              setIsModalVisible(true) ||
                              setSelected(partnership)
                           }
                           className="text-sm border border-gray-300 rounded hover:border-blue-400 hover:bg-indigo-400 px-1 hover:text-white"
                        >
                           Manage
                        </button>
                     </header>
                     <div className="my-3 flex items-center">
                        <img
                           className="w-12 rounded-full mr-2"
                           src={partnership.company.assets.logo}
                           alt={partnership.company.name}
                        />
                        <h2 className="text-xl text-teal-700">
                           {partnership.company.name}
                        </h2>
                     </div>
                     <p className="text-gray-700">
                        {partnership.company.description.short}
                     </p>
                  </li>
               ))}
            </ul>
         )}
      </Wrapper>
   )
}
