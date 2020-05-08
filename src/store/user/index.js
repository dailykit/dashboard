import React from 'react'

export const UserContext = React.createContext()

const initialState = {
   name: '',
   email: '',
   organization: {
      id: null,
      name: '',
      status: '',
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
               name: payload.organization.organizationName,
               status: payload.organization.instanceStatus,
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
