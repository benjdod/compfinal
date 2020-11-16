import React, { useEffect, useState } from "react"

import PageFrame from "../components/pageframe"
import NavBar from "../components/navbar"
import Footer from "../components/footer"

export default () => {

    const [data, setData] = useState('');

    const [quizzes, setQuizzes] = useState({});

    
    useEffect(() => {
        fetch('/user/reflectjwt', {
            method: 'get',
            credentials: 'include'
        }).then(res => res.json())
        .then(res => setData(JSON.stringify(res, null, 2)))
        .catch(err => {
            console.error(err);
        })

        fetch('/user/quizzes', {
            method: 'get',
            credentials: 'include'
        }).then(res => res.json())
        .then(res => setQuizzes(res))
        .catch(err => {
            console.error(err);
        })
    }, [])

    return (
        <PageFrame>
            <h3>Account:</h3>
            <p>The content of your user token:</p>

            <pre style={{wordBreak: 'break-all'}}>{data}</pre>
            <p>Your quizzes:</p>
            <pre style={{wordBreak: 'break-all'}}>{JSON.stringify(quizzes, null, 4)}</pre>
        </PageFrame>
    )
}