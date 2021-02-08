import React from 'react'
import { useHistory } from 'react-router-dom'

import { Styles } from './styled'
import { Tabs } from '../../components'
import { useAuth } from '../../store/auth'
import { MenuIcon, HomeIcon } from '../../assets/icons'

const Header = ({ toggleSidebar }) => {
   const history = useHistory()
   const { user, logout, authenticated } = useAuth()
   return (
      <Styles.Header>
         <Styles.Menu
            title="Menu"
            type="button"
            onClick={() => toggleSidebar(visible => !visible)}
         >
            <MenuIcon color="#fff" size="24" />
         </Styles.Menu>
         <Styles.Nav>
            <Styles.Button
               type="button"
               title="Home"
               onClick={() => history.push('/')}
            >
               <HomeIcon size="20" className="stroke-current text-white" />
            </Styles.Button>
         </Styles.Nav>
         <Tabs />
         {authenticated ? (
            <section className="flex ml-auto pr-2 space-x-2">
               <span
                  title={user?.name}
                  className="rounded-full w-8 h-8 text-sm uppercase tracking-wide font-semibold flex items-center justify-center bg-green-700 text-white cursor-default"
               >
                  {user?.firstName?.slice(0, 1)}
                  {user?.lastName?.slice(0, 1)}
               </span>
               <Styles.Auth onClick={logout} className="ghost">
                  Logout
               </Styles.Auth>
            </section>
         ) : (
            <section className="ml-auto pr-2 space-x-2">
               {!location.pathname.includes('login') && (
                  <Styles.Auth
                     className="solid"
                     onClick={() => history.push('/login')}
                  >
                     Login
                  </Styles.Auth>
               )}
               {!location.pathname.includes('signup') && (
                  <Styles.Auth
                     className="solid"
                     onClick={() => history.push('/signup')}
                  >
                     Sign Up
                  </Styles.Auth>
               )}
            </section>
         )}
      </Styles.Header>
   )
}

export default Header
