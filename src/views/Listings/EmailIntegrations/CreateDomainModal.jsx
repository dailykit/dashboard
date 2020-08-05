import React from 'react'

import { Modal } from '../../../components'

export const CreateDomainModal = ({
   domain,
   setDomain,
   toggleModal,
   handleSubmit,
}) => {
   const [isValid, setIsValid] = React.useState(false)

   React.useEffect(() => {
      if (!domain) return setIsValid(false)
      let domainRegex = new RegExp(
         /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g
      )
      if (!domainRegex.test(domain)) return setIsValid(false)

      return setIsValid(true)
   }, [domain])

   return (
      <Modal>
         <h1 className="text-xl text-teal-700 border-b pb-3 mb-3">
            Add Email Domain
         </h1>
         <fieldset className="flex flex-col mb-3">
            <label
               htmlFor="domail"
               className="uppercase text-gray-500 text-sm tracking-wider"
            >
               Email Domain
            </label>
            <input
               type="text"
               value={domain}
               onChange={e => setDomain(e.target.value)}
               className="border rounded px-2 h-8 mt-1"
               placeholder="Enter your email domain eg: example.com"
            />
         </fieldset>
         <footer className="flex items-center justify-between">
            <aside>
               {isValid ? (
                  <button
                     type="submit"
                     onClick={() => handleSubmit()}
                     className="bg-teal-500 text-white rounded px-2 h-8 mr-2"
                  >
                     Save
                  </button>
               ) : (
                  <button
                     type="submit"
                     onClick={() => handleSubmit()}
                     className="disabled bg-teal-300 cursor-not-allowed text-white rounded px-2 h-8 mr-2"
                  >
                     Save
                  </button>
               )}
               <button
                  type="button"
                  onClick={() => toggleModal(false)}
                  className="border border-gray-400 rounded px-2 h-8"
               >
                  Close
               </button>
            </aside>
         </footer>
      </Modal>
   )
}
