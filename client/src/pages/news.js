import React from "react";
import NewsCard from "../components/newscard";
import axios from "axios";
import newsPageStyle from "../components/modules/newsPage.module.css";
import PageFrame from "../components/pageframe.js";
import listStyle from "../components/modules/hlist.module.css";
// import loading from "../images/maginfyingGlass.svg";
const APIKEY = 'e1609839b7mshbeec556ba3a5b6dp1d7311jsn10f13f0e49bc';


// @JACOB: just added state field to an api endpoint called querylatlon. lat and long are url encoded. 
// you can try it out by just navigating to it in a browser (it's a GET endpoint),
// you can use fetch to construct a request with the coords from navigator.geolocation.getcurrent
// or whatever it is

export class News extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      localNews: [],
      usaNews: [],
      worldNews: [],
      isLoading: true
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
      pageSize: '50',
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
  }).catch(error => {
    console.log(error);
  });

  axios({
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      pageSize: '50',
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
  }).catch(error => console.log(error));

  axios({
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      pageSize: '50',
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
  }).catch(error => {
    console.log(error);
  })

  // trim descripitons
  this.state.localNews.forEach(article =>{
      let descrip = this.formatDescripiton(article.description, 20);
      article.description = descrip + '...';
    }
      )
  this.state.usaNews.forEach(article => {
      let descrip = this.formatDescripiton(article.description, 20);
      article.description = descrip + '...';
    })
  this.state.worldNews.forEach(article => {
      let descrip = this.formatDescripiton(article.description, 20);
      article.description = descrip + '...';
    })

}


  // TODO: this could use a loader component (a-la https://loading.io)
  render() {
    
    console.log(this.state);
    return (
      <div>
        <PageFrame>
      <h1 className={newsPageStyle.title}>Local News</h1>  
      <div className={listStyle.gallery}>
        <div className={listStyle.gallery_scroller}>
          {this.state.localNews.map(article => 
          <div className={listStyle.gallery_scroller_div}>
          <NewsCard
          image = {article.image.url}
          title = {article.title}
          date = {article.datePublished.splice}
          publisher = {article.provider.name}
          description = {article.description}
          link = {article.url}/>
          </div>
          )}
          </div>
          </div>
          
    <h1 className={newsPageStyle.title}>National</h1>  
      <div className={listStyle.gallery}>
        <div className={listStyle.gallery_scroller}>
          {this.state.usaNews.map(article => 
          <div className={listStyle.gallery_scroller_div}>
          <NewsCard
          image = {article.image.url}
          title = {article.title}
          date = {article.datePublished.splice}
          publisher = {article.provider.name}
          description = {article.description}
          link = {article.url}/>
          </div>
          )}
          </div>
          </div>

<h1 className={newsPageStyle.title}>Global</h1>  
      <div className={listStyle.gallery}>
        <div className={listStyle.gallery_scroller}>
          {this.state.worldNews.map(article => 
          <div className={listStyle.gallery_scroller_div}>
          <NewsCard
          image = {article.image.url}
          title = {article.title}
          date = {article.datePublished.splice}
          publisher = {article.provider.name}
          description = {article.description}
          link = {article.url}/>
          </div>
          )}
          </div>
          </div>
        </PageFrame>
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
      </PageFrame>
      </div>
    )
      */
export default News