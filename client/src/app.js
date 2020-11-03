
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Index from "./pages/index"
import About from "./pages/about"
import Test from "./pages/test"
import NoPage from "./pages/404"
import Restricted from "./pages/restricted"

import "./styles/global.css"

const App = () => {    
    return (
        <Router>
            <Switch>
                {/*  add your page components here.  */}
                <Route exact path='/' component={Index}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/maps' component={Test}/>
                <Route exact path='/cookie' component={NoPage}/>
                <Route exact path='/restricted' component={Restricted}/>
                <Route path='/' component={NoPage}/>
            </Switch>
        </Router>
    )
    
}

export default App;