import React, { useEffect, useState } from "react"
import QuizCrumb from "./quizcrumb"

import localStyle from "../pages/modules/account.module.css"

export default (props) => {

    // little blurb to show the user if they have 0 quizzes
    const noQuizzes = (
        <div className={localStyle.noquiz}>
            <h3>Looks like you haven't taken any quizzes!</h3>
        </div>
    )

    const errorQuizzes = (
        <div className={localStyle.noquiz}>
            <h3>Couldn't get your quizzes :(</h3>
        </div>
    )

    const [quizzes, setQuizzes] = useState();

    useEffect(() => {

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
            setQuizzes(errorQuizzes)
        })
    }, [])

    return (
        <div>
            {quizzes}
        </div>
    )
}