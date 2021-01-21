import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
   Home,
   Login,
   Account,
   Payment,
   Instance,
   DeviceHub,
   EmailIntegrations,
   DeliveryPartnerships,
} from './views'

const App = () => {
   return (
      <Switch>
         <Route path="/" exact>
            <Home />
         </Route>
         <Route path="/account" exact>
            <Account />
         </Route>
         <Route path="/dailyos" exact>
            <Instance />
         </Route>
         <Route path="/partnerships/delivery" exact>
            <DeliveryPartnerships />
         </Route>
         <Route path="/payment" exact>
            <Payment />
         </Route>
         <Route path="/device" exact>
            <DeviceHub />
         </Route>
         <Route path="/email-integrations" exact>
            <EmailIntegrations />
         </Route>
         <Route path="/login" exact>
            <Login />
         </Route>
         <Route path="/signup" exact>
            signup
         </Route>
         <Route>404</Route>
      </Switch>
   )
}

export default App
