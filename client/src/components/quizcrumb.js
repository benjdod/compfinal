import moment from "moment";
import React from "react"

import localStyle from "./modules/quizcrumb.module.css"

export default (props) => {

    if (!props.data) return (
        <div className={localStyle.container}>
            <p>Quiz data not found</p>
        </div>
    )

    const data = props.data;

    // no guarantee that the timezone won't be messed up for people 
    // not in EST
    const timestamp = new Date(data.timestamp);

    const inner = data ? (
        <div>
            <p>{data.county}, {data.state}</p>
            <p>Risk: {data.risk}</p>
            <p>Time: {moment(timestamp).fromNow()}</p>
        </div>
    ) : (<p>Quiz data not found</p>)

    return (
        <div className={`${localStyle.container}`}>
            {inner}
        </div>
    )
}