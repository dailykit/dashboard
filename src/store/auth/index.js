import React from 'react'
import jwt_decode from 'jwt-decode'
import { useLocation } from 'react-router-dom'
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
            onboard: {
               step: 1,
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
      case 'CHANGE_STEP':
         return {
            ...state,
            onboard: { ...state.onboard, step: payload },
         }
      default:
         return state
   }
}

export const AuthProvider = ({ children }) => {
   const location = useLocation()
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
      onboard: {
         step: 1,
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

   React.useEffect(() => {
      switch (location.pathname) {
         case '/signup/company': {
            dispatch({ type: 'CHANGE_STEP', payload: 1 })
            break
         }
         case '/signup/about-yourself': {
            dispatch({ type: 'CHANGE_STEP', payload: 2 })
            break
         }
         case '/signup/hosting': {
            dispatch({ type: 'CHANGE_STEP', payload: 3 })
            break
         }
         case '/signup/support': {
            dispatch({ type: 'CHANGE_STEP', payload: 4 })
            break
         }
      }
   }, [location.pathname])

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
