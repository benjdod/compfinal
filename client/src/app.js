
import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Index from "./pages/index"
import About from "./pages/about"
import Test from "./pages/test"

import "./styles/global.css"

const App = () => {    
    return (
        <Router>
            <Switch>
                {/*  add your page components here.  */}
                <Route exact path='/' component={Index}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/maps' component={Test}/>
            </Switch>
        </Router>
    )
    
}

export default App;