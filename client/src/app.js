
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Index from "./pages/index"
import About from "./pages/about"
import Test from "./pages/test"
import NotFound from "./pages/404"
import Maps from "./pages/map"
import Login from "./pages/login"
import Info from "./pages/info"
import Account from "./pages/account"
import newsPage from "./pages/newsPage"

import "./styles/global.css"

const App = () => {    
    return (
        <Router>
            <Switch>
                {/*  add your page components here.  */}
                <Route exact path='/' component={Index}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/news' component={newsPage}/>
                <Route exact path='/jacobTest' component={newsPage}/>
                <Route exact path='/map' component={Maps}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/info' component={Info}/>
                <Route exact path='/account' component={Account}/>

                {/* Cookie needs to be fixed cus right now it's pointed to 404 page */}
                <Route exact path='/cookie' component={NotFound}/>

                {/* this is the default page 404 page. It needs to stay below 
                    all other routes since it catches any route that falls
                    through, like a switch statement. */}
                <Route path='/' component={NotFound}/>
            </Switch>
        </Router>
    )
    
}

export default App;