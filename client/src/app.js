
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { useCookies } from "react-cookie"

import Index from "./pages/index"
import About from "./pages/about"
import NotFound from "./pages/404"
import Maps from "./pages/map"
import Login from "./pages/login"
import Guidelines from "./pages/guidelines"
import Account from "./pages/account"
import News from "./pages/news"
import Quiz from "./pages/quizzard"
import QuizResult from "./pages/quizresult"
import Register from "./pages/register"
import Explore from "./pages/explore"

import QuizView from "./components/quizview"

import Footer from "./pages/tests/footergang"
import BounceOut from "./pages/tests/bounceout"
import Spacing from "./pages/tests/spacing"

import "./styles/global.css"

export default () => {  

    const [ cookies, setCookies ] = useCookies([]);

    // this wil have to be run on every page change
    // probably the best approach will be useLocation hook in react-router-dom

    const restrictBounceTo = '/login';

    /**
     * Redirects a client depending on whether or not they can be validated as a user
     * @param {React.Component} component the React component to render if the user isn't redirected
     * @return {React.Component | null} the component is returned unchanged if the client is validated
     */
    const restrictRoute = (component) => {

    }

    return (
        <Router>
            <Switch>
                {/*  add your page components here.  */}
                <Route exact path='/' component={Index}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/news' component={News}/>
                <Route exact path='/map' component={Maps}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/guidelines' component={Guidelines}/>
                <Route path='/account' component={Account}></Route>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/quiz' component={Quiz}/>
                <Route exact path='/quizresult' component={QuizResult}/>
                <Route exact path='/explore' component={Explore}/>
                <Route exact path='/test/footer' component={Footer}/>
                <Route exact path='/test/bounce' component={BounceOut}/>
                <Route exact path='/test/spacing' component={Spacing}/>

                {/* this is the default page 404 page. It needs to stay below 
                    all other routes since it catches any route that falls
                    through, like a switch statement. */}
                <Route path='/' component={NotFound}/>
            </Switch>
        </Router>
    )
    
}

//export default App;