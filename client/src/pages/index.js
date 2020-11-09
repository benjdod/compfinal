import React from "react"
import { Link } from "react-router-dom"
import NewsCard from "../components/newscard"
import Map from "../components/maptestapp"
import HomeBox from "../components/homebox"

import boxStyle from "../components/modules/box.module.css"

export default () => {
    return (
        <div>
            <div className={boxStyle.bgimage}></div>
            <h1>Index Page</h1>
            <Link to="/about" style={{padding: "10px", display: "inline-block"}}>About</Link>
            <Link to="/newsPage" style = {{padding: "10px", display: "inline-block"}}>News</Link>
            <Link to="/cookie">Get cookie maybe?</Link>
            <br/>

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