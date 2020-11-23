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



    const userDetails = (
        <div>
            <h2>{details.firstname} {details.lastname}</h2>
            <h4>{details.username}</h4>
            <div className="button" style={{display: 'inline-block'}} onClick={(e) => {
                e.preventDefault();
                showEditing(true);
            }}>Edit Details</div>
        </div>
    )

    const quizDetails = (
        <div>
            <h2>Quizzes</h2>
            <hr/>
            <QuizList/>
        </div>
    )

    const basePageContent = (<div className={localStyle.flexItem}>
        {navMessage}
        {userDetails}
        {quizDetails}
    </div>)

    const right = editing ? (
            <div style={{padding: '25px'}}>
                <UpdateAccount userData={details}/>
            </div>
    ) : null;

    return (
        <PageFrame>
            <div className={localStyle.flexBox}>
                {basePageContent}
                {right}
            </div>     
        </PageFrame>
    )
}

// export function showForm() {
//     return (
//         <div className={localStyle.updateForm}>
//             <p>something</p>
//         </div>
//     )
// };