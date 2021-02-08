import React from 'react'
import tw from 'tailwind.macro'
import styled from 'styled-components'
import { useHistory, useLocation, Link } from 'react-router-dom'

import { useAuth } from '../../store/auth'
import { HomeIcon } from '../../assets/icons'

const Header = () => {
   const history = useHistory()
   const location = useLocation()
   const { logout, authenticated } = useAuth()
   return (
      <Styles.Header>
         <section>
            <Styles.Button
               type="button"
               title="Home"
               onClick={() => history.push('/')}
            >
               <HomeIcon size="20" className="stroke-current text-white" />
            </Styles.Button>
         </section>
         {authenticated ? (
            <section className="pr-2 space-x-2">
               <Styles.Auth onClick={logout} className="ghost">
                  Logout
               </Styles.Auth>
            </section>
         ) : (
            <section className="pr-2 space-x-2">
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

const Styles = {
   Header: styled.header`
      grid-area: head;
      background: #04a777;
      ${tw`w-full flex items-center justify-between`}
   `,
   Button: styled.button`
      background: transparent;
      ${tw`h-10 w-10 cursor-pointer flex items-center justify-center`};
      :hover,
      :focus {
         background: #048e65;
      }
      svg {
         display: unset;
      }
   `,
   Auth: styled.button`
      ${tw`h-8 px-3 rounded`}
      &.ghost {
         ${tw`text-white hover:bg-green-700`}
      }
      &.solid {
         ${tw`bg-green-700 text-white hover:bg-green-800`}
      }
   `,
}
