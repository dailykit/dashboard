import React from 'react'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

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

export const DeliveryPartnerships = () => {
   const history = useHistory()
   const { tabs } = useTabs()
   const [isModalVisible, setIsModalVisible] = React.useState(false)
   const [selected, setSelected] = React.useState({})
   const [status, setStatus] = React.useState('LOADING')
   const [partnerships, setPartnerships] = React.useState([])
   const [updateDeliverPartnership] = useMutation(UPDATE_DELIVERY_PARTNERSHIPS)
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

   const handleChange = e => {
      e.preventDefault()
      const data = new FormData(e.target)
      setIsModalVisible(false)
      updateDeliverPartnership({
         variables: {
            id: selected.id,
            _set: {
               isActive: true,
               isApproved: true,
               keys: Object.fromEntries(data),
            },
         },
      })
   }

   if (status === 'LOADING')
      return (
         <Wrapper>
            <Loader />
         </Wrapper>
      )
   if (status === 'SUCCESS')
      return (
         <Wrapper>
            {isModalVisible && (
               <Modal>
                  <h1 className="text-xl text-teal-700 border-b pb-3 mb-3">
                     Edit Partnership: {selected.deliveryCompany.name}
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
                     <button
                        type="submit"
                        className="bg-teal-500 text-white rounded px-2 h-8 mr-2"
                     >
                        Save
                     </button>
                     <button
                        type="button"
                        onClick={() => setIsModalVisible(false)}
                        className="border border-gray-400 rounded px-2 h-8"
                     >
                        Close
                     </button>
                  </form>
               </Modal>
            )}
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
                           src={partnership.deliveryCompany.assets.logo}
                           alt={partnership.deliveryCompany.name}
                        />
                        <h2 className="text-xl text-teal-700">
                           {partnership.deliveryCompany.name}
                        </h2>
                     </div>
                     <p className="text-gray-700">
                        {partnership.deliveryCompany.description.short}
                     </p>
                  </li>
               ))}
            </ul>
         </Wrapper>
      )
}
