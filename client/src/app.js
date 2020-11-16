
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { useCookies } from "react-cookie"

import Index from "./pages/index"
import About from "./pages/about"
import NotFound from "./pages/404"
import Maps from "./pages/map"
import Login from "./pages/login"
import Info from "./pages/guidelines"
import Account from "./pages/account"
import newsPage from "./pages/newsPage"
import hPage from "./pages/horizontalList.js"
import Register from "./pages/register"

import "./styles/global.css"

export default () => {  

    const [ cookies, setCookies ] = useCookies([]);

    // this wil have to be run on every page change
    // probably the best approach will be useLocation hook in react-router-dom
    const [ loggedIn, setLoggedIn ] = useState(false);

    return (
        <Router>
            <Switch>
                {/*  add your page components here.  */}
                <Route exact path='/' component={Index}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/news' component={newsPage}/>
                <Route exact path='/map' component={Maps}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/guidelines' component={Info}/>
                <Route exact path='/account' component={Account}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/list' component={hPage}/>

                {/* this is the default page 404 page. It needs to stay below 
                    all other routes since it catches any route that falls
                    through, like a switch statement. */}
                <Route path='/' component={NotFound}/>
            </Switch>
        </Router>
    )
    
}

//export default App;