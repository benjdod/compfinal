import React from "react"
import style from "./fancybutton.module.css"

/* props: 
*  style(Object): sets the button's style
*/

export default (props) => {
    return (
        <button className={`${style.reset} ${style.button}`} style={props.style}>
            {props.children + 'he'}
        </button>
    )
}