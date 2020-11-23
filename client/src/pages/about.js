import React from "react"
import PageFrame from "../components/pageframe"

import localStyle from "./modules/about.module.css"

export default () => {

    // this makes it easier to put in links...
    const references = [
        'https://figshare.com/articles/COVID-19_Event_Risk_Assessment_Planner/11965533?file=21967428',
        'https://twitter.com/joshuasweitz/status/1237556232304508928/',
        'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext',
        'https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277',
        'https://github.com/nytimes/covid-19-data'
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

    // to add citations, add the citation link to the references array, then call
    // makeInline with the citation's array index to make an inline ref.

    // just a tip if you're working on this in VS Code, alt-z toggles word wrap
    // that will make your time a lot easier...
    return (
        <PageFrame>
            <h3>Methods</h3>
            <p>The COVID Risk Assessor expands upon Joshua Weitz's risk calculation equation, using his method as a base for calculating the user’s risk. {makeInline(0,1)} Using his equation, the Risk Assessor also takes in the users’ inputted event details to give a personalized risk percentage based on social distancing, mask wearing, duration of event, and event location. To factor these relevant metrics we took data from a variety of research papers.</p>
            <ul>
                <li>Social distancing: Increases in social distance have been found to correspond with decreased risk. One meta-analysis found a 2x change in relative risk per meter{makeInline(2)}, but our equation uses a more conservative estimate since the data is not as "settled" </li>
                <li>Mask wearing: Taking research compiled by Univ. of Colorado Boulder Prof. Jose L. Jimenez, we were able to infer that the general population wearing masks reduces the risk of emission by 50%. By other’s wearing cloth masks, your risk of inhaling air transmitted COVID is 30%.{makeInline(3)}</li>
                <li>Duration of event: The average event duration in our equation model is 2 hours, so any time longer that 2 hours adds to the risk factor.</li>
                <li>Event location: Using The New York Time’s ongoing repository of data on coronavirus cases and deaths in the U.S.{makeInline(4)}, the COVID Risk Assessor takes in the number of infections in the user’s event’s area, separated by county, and uses that data to give the user a more personalized risk assessment.</li>
            </ul>

            <h3>Risk</h3>
            <p>If you take a quiz, you might be surprised to find out how low your risk percentage is. But it is important to remember that our assessment model is at best a rough estimate which cannot possibly account for every aspect of the situation. Furthermore, there can be no guarantees of any health outcome in the event of contracting COVID-19, and the disease has a reputation as being unpredictable in who it affects adversely, even in different age brackets. <em><strong>This quiz should not be used as an implied permission to do stupid things!</strong></em> If you are at all in doubt about the risk of any activity you are thinking of engaging in, it is always better to err on the side of caution, especially in the face of a deadly disease.</p>

            <h3>Your Data</h3>
            <p>We store your data doubly encrypted, and we can't see it directly. When you log in, your browser is given a unique key which is used to decrypt your quizzes, but the server is unable to generate or decrypt your data without you.</p>
            {/* STYLE: fancy references, maybe italics? smushed together at bottom of page under content. */}
            <h3>Sources</h3>
            <div>
                {refElts}
            </div>
        </PageFrame>
    )
}