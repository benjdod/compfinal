import React from "react"
import { Link } from "react-router-dom"
import LoginBox from "../components/loginbox"
import Footer from "../components/footer"
import PageFrame from "../components/pageframe"

export default () => {
    return (
        <PageFrame header={false} gutter={false} footerCover transparentFooter>
            <div className="bg-image">
                <LoginBox />
            </div>
        </PageFrame>
        
    )
}