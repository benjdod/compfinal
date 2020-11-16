import React from "react"
import { Link } from "react-router-dom"
import PageFrame from "_components/pageframe"
import HomeBox from "../components/homebox"
import Footer from "../components/footer"

import boxStyle from "../components/modules/box.module.css"

export default () => {
    return (
        <div class="bg-image">
<<<<<<< HEAD
=======
            <div class="pageWrap">
            <Link to="/newsPage" class="underline" style = {{padding: "10px", display: "inline-block"}}>News</Link>
            </div>
>>>>>>> a7ac2ea45da6978d36727a6455ab36c15e4eb253
            <HomeBox />
            <Footer />
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