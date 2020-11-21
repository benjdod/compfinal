import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { useLocation, useHistory } from "react-router-dom"

import PageFrame from "../components/pageframe"
import QuizCrumb from "../components/quizcrumb"

export default () => {

    const [details, setDetails] = useState({});

    const [quizzes, setQuizzes] = useState([]);

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
            const quizCrumbs = res.map(quiz => <QuizCrumb data={quiz}/>).reverse();
            setQuizzes(quizCrumbs);
        })
        .catch(err => {
            console.error(err);
        })
    }, [])

    const basePageContent = (<div>
        {navMessage}
        <h2>{details.firstname} {details.lastname}</h2>
        <h3>Quizzes:</h3>
        {quizzes}
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