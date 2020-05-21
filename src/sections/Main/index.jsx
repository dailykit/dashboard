import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Views
import {
   Home,
   Account,
   Payment,
   Instance,
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
         </Switch>
      </main>
   )
}

export default Main
