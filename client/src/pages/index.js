import React from "react"
import { Link } from "react-router-dom"
import PageFrame from "_components/pageframe"
import HomeBox from "../components/homebox"

import boxStyle from "../components/modules/box.module.css"

export default () => {
    return (
        <div class="bg-image">
            <Link to="/about" class="underline" style={{padding: "10px", display: "inline-block"}}>About</Link>
            <Link to="/newsPage" class="underline" style = {{padding: "10px", display: "inline-block"}}>News</Link>
            <Link to="/cookie" class="underline">Get cookie maybe?</Link>

            <HomeBox />
        </div>
    )
}

/* <p>Example newscard: </p>
<NewsCard
    title="Cat Saved From Tree" 
    date="October 10, 2020" 
    publisher="Daily Tar Heel" 
    description="They got the cat out of the tree!"
    link="https://www.radio.com/fm1019/blogs/james-steele/man-gets-stuck-tree-saving-cat"
/> */