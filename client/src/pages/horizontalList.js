import React from "react"
import listStyle from "../components/modules/hList.module.css"

export default()  => {
    return (
<div>
<img className={listStyle.nextArrow} src="https://i.pinimg.com/originals/f7/4d/30/f74d3003e8f46b56021e42c6515a831d.jpg" />    
<div className={listStyle.gallery}>
  <div className={listStyle.gallery_scroller}>
    <div>
      <img className={listStyle.picture} src="https://placeimg.com/480/480/animals/grayscale"/>
    </div>
    <div>
      <img className={listStyle.picture} src="https://placeimg.com/360/480/animals/grayscale"/>
    </div>
    <div>
      <img className={listStyle.picture} src="https://placeimg.com/640/480/animals/grayscale"/>
    </div>
    <div>
      <img className={listStyle.picture} src="https://placeimg.com/360/360/animals/grayscale"/>
    </div>
    <div >
      <img  className={listStyle.picture} src="https://placeimg.com/2560/960/animals/grayscale"/>
    </div>
    <div>
      <img className={listStyle.picture}  src="https://placeimg.com/480/480/animals/grayscale"/>
    </div>
    <div >
      <img className={listStyle.picture}  src="https://placeimg.com/360/360/animals/grayscale"/>
    </div>
    <div>
      <img className={listStyle.picture} src="https://placeimg.com/640/480/animals/grayscale"/>
    </div>
  </div>
  </div>
  </div>
    )
       
}



