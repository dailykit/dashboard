import React from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../../sections/Header'
import Sidebar from '../../sections/Sidebar'
import { useAuth } from '../../store/auth'

export const Layout = ({ children }) => {
   const history = useHistory()
   const { authenticated } = useAuth()
   const [isSidebarVisible, toggleSidebar] = React.useState(false)

   if (!authenticated) history.push('/login')
   return (
      <>
         <Header toggleSidebar={toggleSidebar} />
         <Sidebar visible={isSidebarVisible} toggleSidebar={toggleSidebar} />
         <main>{children}</main>
      </>
   )
}
