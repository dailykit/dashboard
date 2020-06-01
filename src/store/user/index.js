import React from 'react'

export const UserContext = React.createContext()

const initialState = {
   name: '',
   email: '',
   organization: {
      id: null,
      url: '',
      name: '',
      status: '',
      printNodeKey: '',
      stripeAccountId: '',
   },
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SET_USER': {
         return {
            ...state,
            name: `${payload.firstName} ${payload.lastName}`,
            email: payload.email,
            organization: {
               id: payload.organization.id,
               url: payload.organization.organizationUrl,
               name: payload.organization.organizationName,
               status: payload.organization.instanceStatus,
               stripeAccountId: payload.organization.stripeAccountId,
               printNodeKey: payload.organization.printNodeKey,
            },
         }
      }
      default:
         return state
   }
}

export const UserProvider = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducers, initialState)
   return (
      <UserContext.Provider value={{ state, dispatch }}>
         {children}
      </UserContext.Provider>
   )
}
