import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTabs } from '../../../store/tabs'

export const Account = () => {
   const history = useHistory()
   const { tabs } = useTabs()
   React.useEffect(() => {
      const tab = tabs.find(item => item.path === `/account`) || {}
      if (!Object.prototype.hasOwnProperty.call(tab, 'path')) {
         history.push('/')
      }
   }, [history, tabs])
   return (
      <div>
         <h1>Accounts</h1>
      </div>
   )
}
