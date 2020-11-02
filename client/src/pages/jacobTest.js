import React from "react"
import { Link } from "react-router-dom"
import NewsCard from "../components/newscard"
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('aa2563d3450c496aaf2ec57d20b500ce');


export default() => {
    return (
      <p>Hey Hey We Made It</p>
    )

}