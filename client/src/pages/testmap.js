import React from "react"

import NavBar from "../components/navbar"
import NewsCard from "../components/newscard"

export default () => {

    const catintree = "https://facespayneuter.org/wp-content/uploads/2014/08/catintree.jpg";

    return (
        <div>
            <NavBar/>
            <NewsCard 
                title="Cat Saved From Tree" 
                date="October 10, 2020" 
                publisher="Daily Tar Heel" 
                description="They got the cat out of the tree!"
                link="https://www.radio.com/fm1019/blogs/james-steele/man-gets-stuck-tree-saving-cat"
                image={catintree}/>
            <NewsCard 
            title="Florida Man Breaks Into Homes, Steals People's Food" 
            date="Idk when" 
            publisher="Orlando something or other" 
            description="Yet another Florida man at work"
            link="https://www.clickorlando.com/news/local/2020/10/23/florida-man-accused-of-breaking-into-multiple-homes-eating-victims-food/"
            image="https://www.clickorlando.com/resizer/6Go8TeA-HPKCg6In9TsubbNxWkM=/1280x720/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/54537H646VBB7NLFJONYJJWS6A.jpg"/>
        </div>
    )
}