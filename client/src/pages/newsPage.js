import React from "react"
import { Link } from "react-router-dom"
import NewsCard from "../components/newscard"
import axios from "axios";
import newsPageStyle from "../components/modules/newsPage.module.css";
import PageFrame from "../components/pageframe.js"
const APIKEY = 'e1609839b7mshbeec556ba3a5b6dp1d7311jsn10f13f0e49bc';


export class News extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      localNews: [],
      usaNews: [],
      worldNews: [],
    }
  }

componentDidMount() {
  axios({
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      pageSize: '10',
      q: 'coronavirus north carolina',
      autoCorrect: 'true',
      pageNumber: '1',
      toPublishedDate: 'null',
      fromPublishedDate: 'null',
      withThumbnails: 'true'
    },
    headers: {
      'x-rapidapi-key': 'e1609839b7mshbeec556ba3a5b6dp1d7311jsn10f13f0e49bc',
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  }).then(response => {
    this.setState({
      localNews: response.data.value
    })
  });

  axios({
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      pageSize: '10',
      q: 'coronavirus united states',
      autoCorrect: 'true',
      pageNumber: '1',
      toPublishedDate: 'null',
      fromPublishedDate: 'null',
      withThumbnails: 'true'
    },
    headers: {
      'x-rapidapi-key': 'e1609839b7mshbeec556ba3a5b6dp1d7311jsn10f13f0e49bc',
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  }).then(response => {
    this.setState({
      usaNews: response.data.value
    })
  });

  axios({
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      pageSize: '10',
      q: 'coronavirus global',
      autoCorrect: 'true',
      pageNumber: '1',
      toPublishedDate: 'null',
      fromPublishedDate: 'null',
      withThumbnails: 'true'
    },
    headers: {
      'x-rapidapi-key': 'e1609839b7mshbeec556ba3a5b6dp1d7311jsn10f13f0e49bc',
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  }).then(response => {
    this.setState({
      worldNews: response.data.value
    })
  });
}


  render() {

    let ncArticles = this.state.localNews;
    let usaArticles = this.state.usaNews;
    const parser = new DOMParser();
  
    ncArticles.forEach(article =>{
      let descrip = this.formatDescripiton(article.description, 20);
      article.description = descrip + '...';
    }
      )
   usaArticles.forEach(article => {
      let descrip = this.formatDescripiton(article.description, 20);
      article.description = descrip + '...';
    })

    this.state.worldNews.forEach(article => {
      let descrip = this.formatDescripiton(article.description, 20);
      article.description = descrip + '...';
    })
    

    
    return (
      
      <div>
      <h1 className={newsPageStyle.local}>Local News</h1>
      <h1 className={newsPageStyle.national}>National News</h1>
      <h1 className={newsPageStyle.global}>Global News</h1>

      <div className={newsPageStyle.masonrycontainer}>
      <ul>
      {this.state.localNews.map(article => 
        <div className={newsPageStyle.masonryitem}>
          <div className={newsPageStyle.masonrycontent}>
      <li><NewsCard
        image = {article.image.url}
        title = {article.title}
        date = {article.datePublished.splice}
        publisher = {article.provider.name}
        description = {article.description}
        link = {article.url}/> 
        </li>
        </div>
        </div>)}
      </ul>
  

       
      <ul>
        {this.state.usaNews.map(article => 
        <div className={newsPageStyle.masonryitem}>
          <div className={newsPageStyle.masonrycontent}>
          <li><NewsCard
          image = {article.image.url}
          title = {article.title}
          date = {article.datePublished.splice}
          publisher = {article.provider.name}
          description = {article.description}
          link = {article.url}/> 
          </li>
          </div>
          </div>)}
      </ul>


     
      <ul>
      {this.state.worldNews.map(article => 
        <div className={newsPageStyle.masonryitem}>
          <div className={newsPageStyle.masonrycontent}>
          <li><NewsCard
          image = {article.image.url}
          title = {article.title}
          date = {article.datePublished.splice}
          publisher = {article.provider.name}
          description = {article.description}
          link = {article.url}/> 
          </li>
          </div>
          </div>)}
          </ul>
          </div>
      </div>
    )
        }

  formatDescripiton(description, n){ 
    return description.split(" ").splice(0, n).join(" ");
  }
}

/*
 <ul>
        {this.state.usaNews.forEach(article => 
          <li><NewsCard
          image = {article.image.url}
          title = {article.title}
          date = {article.datePublished.splice}
          publisher = {article.provider.name}
          description = {article.description}
          link = {article.url}/> 
          </li>)}
        )
      </ul>
      */
export default News