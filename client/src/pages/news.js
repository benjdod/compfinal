import React from "react";
import NewsCard from "../components/newscard";
import axios from "axios";
import newsPageStyle from "../components/modules/newsPage.module.css";
import PageFrame from "../components/pageframe.js";
import listStyle from "../components/modules/hlist.module.css";
import loadingStyle from "../components/modules/loading.module.css";
import loading from "../images/maginfyingGlass.gif"

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
      isLoading: true,
      location: ""
    }
    this.getLocation = this.getLocation.bind(this);
  }

componentDidMount() {

  navigator.geolocation.getCurrentPosition(this.getLocation, (error=>console.log(error)));
  setTimeout(() => {
  axios({
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      pageSize: '10',
      q: `coronavirus ${this.state.location}`,
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
    console.log(this.state);
    this.setState({
      localNews: response.data.value
    })
  }).catch(error => console.log(error));

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
      worldNews: response.data.value,
      isLoading: false
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

  }, 200);

  
}

  render() {
    return (
      this.state.isLoading ? 
      <figure>
        <img className = {loadingStyle.loading} src = {loading}></img>
        <figcaption className={loadingStyle.text}>Loading News...</figcaption>
        </figure> :
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

  getLocation(location){
    let lat = location.coords.latitude.toFixed(3);
    let lon = location.coords.longitude.toFixed(3);
    let url = '/api/querylatlon'
    // adding params to url
    url += `?lat=${lat}&lon=${lon}`;
     fetch(url,{
      method: 'get',
      credentials: 'include'
  }).then(result => result.json())
    .then(result => this.setState({location: result.state}));
  }
}
export default News