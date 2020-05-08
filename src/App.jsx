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
   const { user } = useAuth()
   const { dispatch } = React.useContext(UserContext)
   const { isAuthenticated, isInitialized } = useAuth()
   const [isSidebarVisible, toggleSidebar] = React.useState(false)
   const [fetchUser, { loading, data = {} }] = useLazyQuery(FETCH_USER)

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

   React.useEffect(() => {
      if (!loading && Array.isArray(data?.organizationAdmins)) {
         dispatch({ type: 'SET_USER', payload: data?.organizationAdmins[0] })
      }
   }, [loading, data])

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
