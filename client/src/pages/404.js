import React from "react"
import { Link } from "react-router-dom"
import PageFrame from "_components/pageframe"

export default () => {
    return (
        <PageFrame>
            <p>404! there's nothing here...</p>
            <Link to='/'>Go home.</Link>
        </PageFrame>
    )
}