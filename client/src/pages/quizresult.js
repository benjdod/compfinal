import React from "react"
import { useLocation, useHistory } from "react-router-dom"

import PageFrame from "../components/pageframe"

export default (props) => {

    const location = useLocation();

    const history = useHistory();

    // if no result data has been set, we didn't come from the quizzard,
    // so we redirect to /account
    if (!location.state) {
        history.push('/account')
        return null;
    }

    if (!location.state.result) history.push('/account');

    const quizresult = location.state.result;

    return (
        <PageFrame>
            <p>Quiz result</p>
            <pre>{JSON.stringify(quizresult, null, 2)}</pre>
        </PageFrame>
    )
}