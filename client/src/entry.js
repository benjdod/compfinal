import React from "react"
import App from './app'

import ReactDOM from "react-dom"

document.body.onload = () => {
    const root = document.getElementById('root');
    ReactDOM.render(<App/>,root);
}