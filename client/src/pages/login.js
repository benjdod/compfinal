import React from "react"
import LoginBox from "../components/loginbox"
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