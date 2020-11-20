import React, { useEffect } from "react"
import PageFrame from "_components/pageframe"
import HomeBox from "../components/homebox"
import Footer from "../components/footer"

import { useHistory } from "react-router-dom"

import boxStyle from "../components/modules/box.module.css"

export default () => {

    const history = useHistory();

    useEffect(() => {
        fetch('/user/ping')
        .then(res => {
            if (res.status == 200) 
                history.push('/account')
        })
    })

    return (
        <div class="bg-image">
            <div class="pageWrap">
            </div>
            <HomeBox/>
            <Footer/>
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