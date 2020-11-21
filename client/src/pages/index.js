import React, { useEffect, useState } from "react"
import PageFrame from "_components/pageframe"
import HomeBox from "../components/homebox"
import Footer from "../components/footer"

import { useHistory } from "react-router-dom"

import boxStyle from "../components/modules/box.module.css"

export default () => {

    const history = useHistory();

    const [homeBox, setHomeBox] = useState(null);

    useEffect(() => {
        // see if we're logged in or not
        fetch('/user/details')
        .then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            setHomeBox(<HomeBox loggedIn userData={res}/>)
        }).catch(e => {

            // if we're here, then the request failed,
            // probably due to a 401 unauthorized,
            // but regardless we render the not logged in homebox
            console.log('failed');
            console.error(e);
            setHomeBox(<HomeBox/>)
        })
    }, []) // no dependencies so we do NOT render a million times and crash a user's browser

    return (
        <PageFrame header={false} gutter={false} footerCover transparentFooter>
            <div class="bg-image">
                <div class="pageWrap">
                </div>
                {homeBox}
            </div>
        </PageFrame>
    )
}