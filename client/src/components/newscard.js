// this must be imported first for obvious reasons
import React from "react"

// get our css module for this file (you're
// probably gonna have one for most files)
import cardStyle from "./modules/newscard.module.css"

// we import local images using js import snytax
import DefaultImage from "../images/temp-img.jpg"





// (in react documentation, you'll find you can create components
// via functions or classes. You can do either, but for most 
// cases it's easier to just use functions for cleaner syntax)


// define a function returning the component, passing in props as an argument

// **** A note on Props: ****
// props is an object passed in by React which is
// a collection of the "attributes" or key-value pairs
// in this components JSX tag.
// for example, if we type
//      <NewsCard title="Hello" date="July 27 2018"/>
// in another file, we can access those fields under
// props.title and props.date. If the user of the components
// doesn't provide values for the fields, I think they're left
// undefined
const card = (props) => {

    // I like to define consts up top to process 
    // the arguments passed in. This way we can define
    // fallbacks

    // btw these are ternary expression, they go like
    // <expression> ? <value if true> : <value if false>

    const linkto = props.link ? props.link : "#";

    const image = props.image ? props.image : DefaultImage;

    // return in parentheses

    // **** Note on the h3 tag ****
    // you'll notice that the className is different...
    // there it's just a template string with the module class name
    // passed in as a class name, and then a the name of a class
    // defined in styles/global.css. You can use template strings to 
    // mix and match so you're not limited to one module class
    // per element

    return (
        <a href={linkto} className={cardStyle.link} target="_blank">
            <div className={cardStyle.card}>
                <img className={cardStyle.image} src={image}></img>
                <h3 className={`${cardStyle.title} text-bold`}>{props.title}</h3>
                <h5 className={cardStyle.date}>{props.date}</h5>
                <h5 className={cardStyle.publisher}>{props.publisher}</h5>
                <p className={cardStyle.description}>{props.description}</p>
            </div>
        </a>
        
    )
}


// export default our component
export default card;