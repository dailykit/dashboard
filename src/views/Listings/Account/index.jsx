import React from 'react'
import { useTabs } from '../../../store/tabs'

export const Account = () => {
   const { tab, addTab } = useTabs()

   React.useEffect(() => {
      if (!tab) {
         addTab('Accounts', '/account')
      }
   }, [tab, addTab])

   return (
      <div>
         <h1>Accounts</h1>
      </div>
   )
}
