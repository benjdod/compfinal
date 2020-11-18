import React, { useEffect, useState } from "react"

import PageFrame from "../components/pageframe"
import QuizCrumb from "../components/quizcrumb"

export default () => {

    const [data, setData] = useState('');

    const [quizzes, setQuizzes] = useState([]);
    
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
        .then(res => {
            const quizCrumbs = res.map(quiz => <QuizCrumb data={quiz}/>);
            setQuizzes(quizCrumbs);
        })
        .catch(err => {
            console.error(err);
        })
    }, [])

    return (
        <PageFrame>
            <h3>Account:</h3>
            <p>The content of your user token:</p>

            <pre style={{wordBreak: 'break-all'}}>{data}</pre>
            {quizzes}
        </PageFrame>
    )
}