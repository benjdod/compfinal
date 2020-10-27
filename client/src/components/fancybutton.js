import React from "react"

// CSS module:
// this basically generates random css class
// names so we can have local scope for classes.
// to use, import the style from a module and 
// essentially use it as an object where the 
// different fields are the strings of classnames

import style from "./fancybutton.module.css"

/* props: 
*  style(Object): sets the button's style
*/

export default (props) => {
    return (
        // CSS module: you can use `` and ${} to add multiple module classes
        // as well as global styles. in this case, the first two styles are
        // from the module we're using, and the last is a plain old reference to 
        // the cool-text class in styles/global.css
        <button className={`${style.reset} ${style.button}`} style={props.style}>
            {props.children}
        </button>
    )
}