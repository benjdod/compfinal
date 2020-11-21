import React from "react"
import { useLocation, useHistory } from "react-router-dom"

import PageFrame from "../components/pageframe"
import QuizView from "../components/quizview"

export default (props) => {

    // this page should only be accessed as a redirect from the quiz page
    // (to display the results of the quiz). 

    const location = useLocation();

    const history = useHistory();

    // if no result data has been set, we didn't come from the quiz,
    // so we redirect to /account
    if (!location.state) {
        history.push('/account')
        return null;
    }
    if (!location.state.result) {
        history.push('/account')
    }

    const quizresult = location.state.result;

    return (
        <PageFrame>
            <QuizView data={quizresult}/>
        </PageFrame>
    )
}