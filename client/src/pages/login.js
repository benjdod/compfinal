import React from "react"
import { Link } from "react-router-dom"
import LoginBox from "../components/loginbox"
import Footer from "../components/footer"

export default () => {
    return (
        <div className="bg-image">
            <div className="pageWrap">
            </div>
            <LoginBox />
            <Footer />
        </div>
    )
}