import React, { useEffect, useState } from "react"

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
        <div style={{wordWrap: 'break-word', wordBreak: 'break-all'}}>
            {/* use pageWrap div if the page doesn't scroll, delete if it does */}
            <div class="pageWrap">
            <NavBar />
            <h3>Account:</h3>
            <p>The content of your user token:</p>
            <pre>{data}</pre>
            <p>Your quizzes:</p>
            <pre style={{wordBreak: 'break-all'}}>{JSON.stringify(quizzes, null, 4)}</pre>
            </div>
            <Footer />
        </div>
    )
}