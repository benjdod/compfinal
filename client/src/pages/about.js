import React from "react"
import { Link } from "react-router-dom"
import NavBar from "../components/navbar"
import Footer from "../components/footer"
import PageFrame from "../components/pageframe"

import localStyle from "./modules/about.module.css"

export default () => {

    // this makes it easier to put in links...
    const references = [
        'https://figshare.com/articles/COVID-19_Event_Risk_Assessment_Planner/11965533?file=21967428',
        'https://twitter.com/joshuasweitz/status/1237556232304508928/',
        'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext'
    ]

    const refElts = []

    const makeInline = (...args) => {
        return (
            <sup>
                {
                    args.map(idx => {
                        refElts.push(<p>{idx+1}: <a className={localStyle.link} href={references[idx]} target="_blank">{references[idx]}</a></p>)
                        return (
                            <span><a href={references[idx]} target="_blank">[{idx + 1}]</a>{idx < args.length - 1 ? ',' : ''}</span>
                        )
                        
                    })
                }
            </sup>
        )
    }


    // TODO: this needs more info, or just to be rewritten. The wording 
    // needs to be explicit about the data we're using, as well as the assumptions
    // we make in our equation model. We also should say what the equation is?

    // to add citations, add the citation link to the references array, then call
    // makeInline with the citation's array index to make an inline ref.

    // TODO: just a tip if you're working on this in VS Code, alt-z toggles word wrap
    // that will make your time a lot easier...
    return (
        <PageFrame>
            <h3>Methods</h3>
            <p>We based our risk caluclation method off of Joshua Weitz's similar equation.{makeInline(0,1)} We also factored in relevant metrics based off of recent studies on the effectiveness of mask wearing, social distancing, and event location.</p>
            <ul>
                <li>Social distancing: Increases in social distance have been found to correspond with decreased risk. One meta-analysis found a 2x change in relative risk per meter{makeInline(2)}, but our equation uses a more conservative estimate since the data is not as "settled" </li>
                <li>Mask wearing of user</li>
            </ul>

            <h3>Risk</h3>
            <p>If you take a quiz, you might be surprised to find how low your risk is. But it is important to remember that our assesement model is at best a rough estimate which cannot possibly account for every aspect of the situation. Furthermore, there can be no guarantees of any health outcome in the event of contracting COVID-19, and the disease has a reputation as being unpredictable in who it affects adversely, even in different age brackets. Writ large: <em><strong>This quiz should not be used as an implied permission to do stupid things!</strong></em> If you are at all in doubt about the risk of any activity you are thinking of engaging in, it is always better to err on the side of caution, especially in the face of a deadly disease.</p>

            <h3>Your Data</h3>
            <p>We store your data doubly encrypted, and we can't see it directly. When you log in, your browser is given a unique key which is used to decrypt your quizzes, but the server is unable to generate or decrypt your data without you.</p>
            {/* STYLE: fancy references, maybe italics? smushed together at bottom of page under content. */}
            <div>
                {refElts}
            </div>
        </PageFrame>
    )
}