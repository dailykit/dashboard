import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import {
   split,
   ApolloClient,
   ApolloLink,
   InMemoryCache,
   createHttpLink,
   ApolloProvider,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import App from './App'

import { AuthProvider } from './store/auth'
import { TabProvider } from './store/tabs'

import './index.css'
import './styles.css'

const wssClient = new SubscriptionClient(
   `${process.env.REACT_APP_DAILYCLOAK_SUBS_URL}`,
   {
      reconnect: true,
      connectionParams: {
         headers: {
            'x-hasura-admin-secret': `${process.env.REACT_APP_ADMIN_SECRET}`,
         },
      },
   }
)

const wssLink = new WebSocketLink(wssClient)

const authLink = new ApolloLink((operation, forward) => {
   operation.setContext(({ headers }) => ({
      headers: {
         ...headers,
         'x-hasura-admin-secret': `${process.env.REACT_APP_ADMIN_SECRET}`,
      },
   }))
   return forward(operation)
})

const httpLink = createHttpLink({
   uri: `${process.env.REACT_APP_DAILYCLOAK_URL}`,
})

const splitLink = split(
   ({ query }) => {
      const definition = getMainDefinition(query)
      return (
         definition.kind === 'OperationDefinition' &&
         definition.operation === 'subscription'
      )
   },
   wssLink,
   authLink.concat(httpLink)
)

const client = new ApolloClient({
   link: splitLink,
   cache: new InMemoryCache(),
})

ReactDOM.render(
   <Router>
      <ApolloProvider client={client}>
         <AuthProvider>
            <TabProvider>
               <App />
            </TabProvider>
         </AuthProvider>
      </ApolloProvider>
   </Router>,
   document.getElementById('root')
)
