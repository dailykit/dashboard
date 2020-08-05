import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Views
import {
   Home,
   Account,
   Payment,
   Instance,
   DeviceHub,
   EmailIntegrations,
   DeliveryPartnerships,
} from '../../views'

const Main = () => {
   return (
      <main>
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
         </Switch>
      </main>
   )
}

export default Main
