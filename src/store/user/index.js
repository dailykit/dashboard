import React from 'react'

export const UserContext = React.createContext()

const initialState = {
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
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SET_USER': {
         return {
            ...state,
            email: payload.email,
            printNodePassword: payload.printNodePassword,
            name: `${payload.firstName} ${payload.lastName}`,
            organization: {
               id: payload.organization.id,
               url: payload.organization.organizationUrl,
               name: payload.organization.organizationName,
               status: payload.organization.instanceStatus,
               datahubUrl: payload.organization.datahubUrl,
               adminSecret: payload.organization.adminSecret,
               printNodeKey: payload.organization.printNodeKey,
               stripeAccountId: payload.organization.stripeAccountId,
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
