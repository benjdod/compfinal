import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { useLocation, useHistory } from "react-router-dom"

import PageFrame from "../components/pageframe"
import UpdateAccount from "../components/upadateAccount"
import QuizList from "../components/quizlist"

import localStyle from "./modules/account.module.css"

export default () => {

    const [details, setDetails] = useState({});

    const [navMessage, setNavMessage] = useState(null);

    const [editing, showEditing] = useState(false);

    const location = useLocation();
    const history = useHistory();

    
    
    // TODO: add indexedDB api for faster load times (when we renavigate here and haven't added a new quiz)
    useEffect(() => {

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

    }, [])


    const editCancelHandler = () => {
        showEditing(null);
    }

    const userDetails = (
        <div>
            <p className={localStyle.header}>Name:&nbsp; <strong>{details.firstname} {details.lastname}</strong></p>
            <p className={localStyle.header}>Username:&nbsp; <strong>{details.username}</strong></p>
            <div className={`button greyBtn`} style={{display: 'inline-block'}} onClick={(e) => {
                e.preventDefault();
                showEditing(
                <div style={{padding: '25px'}}>
                    <UpdateAccount userData={details} cancelClick={editCancelHandler}/>
                </div>);
            }}>Edit Details</div>
        </div>
    )

    const quizDetails = (
        <div>
            <p className={localStyle.header}>Quizzes:</p>
            <hr/>
            <QuizList/>
        </div>
    )

    const basePageContent = (<div className={localStyle.flexItem}>
        {navMessage}
        {userDetails}
        {quizDetails}
    </div>)

    const right = editing;

    return (
        <PageFrame>
            <div className={localStyle.flexBox}>
                {basePageContent}
                {right}
            </div>     
        </PageFrame>
    )
}