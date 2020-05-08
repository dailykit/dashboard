import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './App'

import { AuthProvider } from './store/auth'
import { TabProvider } from './store/tabs'
import { UserProvider } from './store/user'

import './index.css'
import './styles.css'

const client = new ApolloClient({
   uri: process.env.REACT_APP_DAILYCLOAK_URL,
})

ReactDOM.render(
   <AuthProvider>
      <ApolloProvider client={client}>
         <UserProvider>
            <TabProvider>
               <App />
            </TabProvider>
         </UserProvider>
      </ApolloProvider>
   </AuthProvider>,
   document.getElementById('root')
)
