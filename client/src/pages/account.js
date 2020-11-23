import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { useLocation, useHistory } from "react-router-dom"

import PageFrame from "../components/pageframe"
import QuizCrumb from "../components/quizcrumb"
import UpdateAccount from "../components/upadateAccount"

import localStyle from "./modules/account.module.css"

export default () => {

    const [details, setDetails] = useState({});

    const [quizzes, setQuizzes] = useState();

    const [navMessage, setNavMessage] = useState(null);

    const [editing, showEditing] = useState(false);

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

        showEditing(false);

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
            <p className={localStyle.header}>Name:&nbsp; <strong>{details.firstname} {details.lastname}</strong></p>
            <p className={localStyle.header}>Username:&nbsp; <strong>{details.username}</strong></p>
        </div>
    )

    const quizDetails = (
        <div>
            <p className={localStyle.header}>Quizzes:</p>
            {quizzes}
        </div>
    )

    const basePageContent = (<div className={localStyle.flexItem}>
        {navMessage}
        {userDetails}
        {quizDetails}
    </div>)

    const right = (
        <div className={localStyle.flexItem}>
            <div className={localStyle.flexBox}>
                <div className="button greyBtn" onClick={(e) => {
                    e.preventDefault();
                    showEditing(true);
                }}>Edit Details</div>
            </div>

            <div style={{visibility: editing ? 'visible': 'hidden'}}>
                <UpdateAccount/>
            </div>

        </div>
    )

    return (
        <PageFrame>
            <div className={localStyle.flexBox}>
                {basePageContent}
                {right}
            </div>     
        </PageFrame>
    )
}