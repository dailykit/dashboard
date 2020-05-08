import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Views
import { Home, Account, Instance, DeliveryPartnerships } from '../../views'

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
         </Switch>
      </main>
   )
}

export default Main
