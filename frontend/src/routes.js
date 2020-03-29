import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncodent'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
               <Route path="/" exact component={Logon} />
               <Register path='/register' component={Register} />
               <Profile path='/profile' component={Profile} />
               <NewIncident path='/incidents/new' component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )

}