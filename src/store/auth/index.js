import React from 'react'
import jwt_decode from 'jwt-decode'
import { useSubscription } from '@apollo/client'

const AuthContext = React.createContext()

import * as utils from '../../utils'
import { USER } from '../../graphql'
import { Loader } from '../../components'

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'LOGOUT':
         return {
            ...state,
            authenticated: false,
            user: {
               name: '',
               email: '',
               printNodePassword: '',
               organization: {
                  id: '',
                  url: '',
                  name: '',
                  status: '',
                  datahubUrl: '',
                  adminSecret: '',
                  printNodeKey: '',
                  stripeAccountId: '',
               },
            },
         }
      case 'SET_USER':
         return {
            ...state,
            user: {
               ...state.user,
               name: `${payload?.firstName || ''} ${payload?.lastName || ''}`,
               ...payload,
            },
            authenticated: true,
         }
      default:
         return state
   }
}

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducers, {
      authenticated: false,
      user: {
         name: '',
         email: '',
         printNodePassword: '',
         organization: {
            id: null,
            url: '',
            name: '',
            status: '',
            datahubUrl: '',
            adminSecret: '',
            printNodeKey: '',
            stripeAccountId: '',
         },
      },
   })

   const {
      loading,
      data: { organizationAdmins: admins = [] } = {},
   } = useSubscription(USER, {
      skip: !state?.user?.email,
      variables: { where: { email: { _eq: state?.user?.email } } },
   })

   React.useEffect(() => {
      if (!loading && Array.isArray(admins) && admins.length) {
         const [admin] = admins
         dispatch({ type: 'SET_USER', payload: admin })
      }
   }, [loading, admins])

   React.useEffect(() => {
      const exists = localStorage.key('token')
      if (exists) {
         const profile = jwt_decode(localStorage.getItem('token'))
         if (profile?.email) {
            dispatch({ type: 'SET_USER', payload: { email: profile.email } })
         }
      }
   }, [])

   const logout = React.useCallback(() => {
      localStorage.removeItem('token')
      dispatch({ type: 'LOGOUT' })
   }, [])

   const login = async ({ email, password }) => {
      try {
         const profile = await utils.login({ email, password })
         if (profile?.email) {
            dispatch({ type: 'SET_USER', payload: { email: profile.email } })
         }
         return profile
      } catch (error) {
         throw error
      }
   }

   if (loading) return <Loader />
   return (
      <AuthContext.Provider
         value={{
            login,
            logout,
            dispatch,
            ...state,
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => React.useContext(AuthContext)
