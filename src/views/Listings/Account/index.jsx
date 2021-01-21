import React from 'react'

import { Layout } from '../../../components'
import { useTabs } from '../../../store/tabs'

export const Account = () => {
   const { tab, addTab } = useTabs()

   React.useEffect(() => {
      if (!tab) {
         addTab('Accounts', '/account')
      }
   }, [tab, addTab])

   return (
      <Layout>
         <h1>Accounts</h1>
      </Layout>
   )
}
