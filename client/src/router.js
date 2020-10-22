
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Index from "./pages/index"
import About from "./pages/about"

const App = () => {    
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Index}/>
                <Route exact path='/about' component={About}/>
            </Switch>
        </Router>
    )
    
}

const root = document.getElementById('root');

document.body.onload = () => {
    ReactDOM.render(App(),root);
}

alert('alert from client\'s butthole');