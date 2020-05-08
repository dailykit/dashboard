import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Views
import { Home, Account } from '../../views'

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
         </Switch>
      </main>
   )
}

export default Main
