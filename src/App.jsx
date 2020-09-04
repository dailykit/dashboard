import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { BrowserRouter as Router } from 'react-router-dom'

// Sections
import Header from './sections/Header'
import Sidebar from './sections/Sidebar'
import Main from './sections/Main'

// Components
import { Loader } from './components'

// Utils
import { useAuth } from './store/auth'
import { UserContext } from './store/user'

// Queries
import { FETCH_USER } from './graphql'

// Styled
import { StyledWrapper } from './styled'

const App = () => {
   const { dispatch } = React.useContext(UserContext)
   const { user, isAuthenticated, isInitialized } = useAuth()
   const [isSidebarVisible, toggleSidebar] = React.useState(false)
   const [fetchUser, { loading }] = useLazyQuery(FETCH_USER, {
      onCompleted: ({ organizationAdmins = [] }) => {
         if (
            Array.isArray(organizationAdmins) &&
            organizationAdmins.length > 0
         ) {
            dispatch({ type: 'SET_USER', payload: organizationAdmins[0] })
         }
      },
   })

   React.useEffect(() => {
      if (user.email) {
         fetchUser({
            variables: {
               where: {
                  email: { _eq: user.email },
               },
            },
         })
      }
   }, [user])

   if (loading) return <Loader />
   if (isInitialized === false) return <Loader />
   if (isAuthenticated === false) return "You're not logged in!"
   return (
      <StyledWrapper>
         <Router>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar visible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <Main />
         </Router>
      </StyledWrapper>
   )
}

export default App
