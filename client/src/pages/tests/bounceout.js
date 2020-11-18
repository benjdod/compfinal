import React, { useState, useEffect } from "react"

import { Redirect } from "react-router-dom"


export default (props) => {

    const userState = {
        WAITING: 1,
        ALLOW: 2,
        REJECT: 3
    }

    const [isUser, setUser] = useState(userState.WAITING);

    useEffect(() => {
        fetch('/user/ping')
        .then(res => {
            console.log(res);
            if (res.status !== 200) {
                console.log('not logged in...');
                setUser(userState.REJECT)
            } else {
                console.log('logged in');
                setUser(userState.ALLOW);
            }
        })
    })

    const children = <p>Hello</p>

    const out = (isUser === userState.WAITING)
        ? null
        : (isUser === userState.ALLOW)
            ? children
            : <Redirect to='/login'/>

    return (
        <div className="restricted">
            {out}
        </div>
    )
}