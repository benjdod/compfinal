import React from "react"
import { Link } from "react-router-dom"
import NavBar from "../components/navbar"
import Footer from "../components/footer"

export default () => {

    // this makes it easier to put in links...
    const references = [
        'https://figshare.com/articles/COVID-19_Event_Risk_Assessment_Planner/11965533?file=21967428',
        'https://twitter.com/joshuasweitz/status/1237556232304508928/'
    ]

    const makeInline = (...args) => {

        return (
            <sup>
                {
                    args.map(idx => {
                        return (
                            <div style={{display: 'inline'}}>
                                <a href={references[idx]} target="_blank">[{idx + 1}]</a>
                                {idx < args.length - 1 ? ',' : ''}
                            </div>
                        )
                        
                    })
                }
            </sup>
        )
    }

    return (
        <div>
            <NavBar />
                <h3>Methods</h3>
                <p>We based our risk caluclation method off of Joshua Weitz's similar equation.{makeInline(0,1)} We also factored in relevant using relevant metrics and recent studies. </p>
                <ul>
                    <li>Social distancing distance</li>
                    <li>Mask wearing of user</li>
                </ul>

                <h3>Your Data</h3>
                <p>We store your data doubly encrypted, and we can't see it directly. When you log in, your computer is given a unique key which can decrypt your quizzes, but we can't generate that key ourselves.</p>
            <Footer />
        </div>
    )
}