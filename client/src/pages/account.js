import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { useLocation, useHistory } from "react-router-dom"

import PageFrame from "../components/pageframe"
import QuizCrumb from "../components/quizcrumb"

import localStyle from "./modules/account.module.css"

export default () => {

    const [details, setDetails] = useState({});

    const [quizzes, setQuizzes] = useState();

    const [navMessage, setNavMessage] = useState(null);

    const location = useLocation();
    const history = useHistory();


    if (location.state)
        if (location.state.message) {
            setNavMessage(
                <div style={{
                    display: 'inline-block',
                    position: 'absolute',
                    top: 20,
                    width: '40%',
                    padding: '20px',
                }}>
                    <p>{location.state.message}</p>
                </div>
            )

            // make the message go away after 3 seconds
            setTimeout(() => {
                setNavMessage(null);
            }, 3000);
        }

    // little blurb to show the user if they have 0 quizzes
    const noQuizzes = (
        <div className={localStyle.noquiz}>
            <h3>Looks like you haven't taken any quizzes!</h3>
        </div>
    )
    
    // TODO: add indexedDB api for faster load times (when we renavigate here and haven't added a new quiz)
    useEffect(() => {

        fetch('/user/details', {
            method: 'get',
            credentials: 'include'
        }).then(res => res.json())
        .then(res => setDetails(res))
        .catch(err => {
            console.error(err);
            history.push('/login')
        })

        fetch('/user/quizzes', {
            method: 'get',
            credentials: 'include'
        }).then(res => res.json())
        .then(res => {
            // FIXME: sort quiz results by time
            console.log(res);

            if (res.length === 0) {
                setQuizzes(noQuizzes);
                return;
            }

            const quizCrumbs = res.map(quiz => <QuizCrumb data={quiz}/>).reverse();
            setQuizzes(quizCrumbs);
        })
        .catch(err => {
            console.error(err);
        })
    }, [])

    const userDetails = (
        <div>
            <h2>{details.firstname} {details.lastname}</h2>
            <h4>{details.username}</h4>
        </div>
    )

    const quizDetails = (
        <div>
            <h3>Quizzes:</h3>
            {quizzes}
        </div>
    )

    const basePageContent = (<div>
        {navMessage}
        {userDetails}
        {quizDetails}
    </div>)

    const router = (
    <Router>
        <Switch>
            <Route exact path="/account" component={basePageContent}/>
        </Switch>
    </Router>)

    return (
        <PageFrame>
            {basePageContent}            
        </PageFrame>
    )
}