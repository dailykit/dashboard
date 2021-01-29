import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
   Home,
   Login,
   Signup,
   Account,
   Payment,
   Company,
   Hosting,
   Support,
   Instance,
   DeviceHub,
   FinishSetup,
   Installation,
   AboutYourself,
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
         <Route path="/instance" exact>
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
            <Signup />
         </Route>
         <Route path="/signup/company" exact>
            <Company />
         </Route>
         <Route path="/signup/about-yourself" exact>
            <AboutYourself />
         </Route>
         <Route path="/signup/hosting" exact>
            <Hosting />
         </Route>
         <Route path="/signup/support" exact>
            <Support />
         </Route>
         <Route path="/signup/installation" exact>
            <Installation />
         </Route>
         <Route path="/signup/finish-setup" exact>
            <FinishSetup />
         </Route>
         <Route>404</Route>
      </Switch>
   )
}

export default App
