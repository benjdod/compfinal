import moment from "moment";
import React from "react"
import { useHistory } from "react-router-dom"

import localStyle from "./modules/quizcrumb.module.css"
import Menu from "../images/menu.png"

// STYLE: these are the inline results that are displayed
// in the user's account page. NEed to look sexy 
export default (props) => {

    const notFound = (
        <div className={localStyle.container}>
            <p>Quiz data not found</p>
        </div>
    )

    if (!props.data) return notFound

    const data = props.data;

    const history = useHistory();

    const viewQuiz = () => {
        history.push({
            pathname: '/quizresult',
            state: {
                result: data,
            }
        })
    }

    // no guarantee that the timezone won't be messed up for people 
    // not in EST

    // FIXME: never display a risk of 0, it will provide a false impression
    // of complete safety to the user. 
    const inner = (
        <div >
            <h3 className={localStyle.title}>{data.county} County, {data.state}</h3>
            <p className={localStyle.date}>{moment(data.timestamp).fromNow()}</p>
            {/* <img class={localStyle.menu} src={Menu} /> */}
            <div className={localStyle.menu}>
                <img className={localStyle.menuIcon} src={Menu} />
                <div className={localStyle.dropdownContent}>
                    <p className={localStyle.dropItem} onClick={(e) => {
                        e.stopPropagation();
                        console.log(`delete /user/quizzes/${data.uid}`);
                        fetch(`/user/quizzes/${data.uid}`, {
                            method: 'delete',
                            credentials: 'include'
                        }).then(() => {
                            window.location.reload();
                        }).catch(e => {
                            console.error(e);
                            alert('could not delete quiz!');
                        })
                    }}>Delete</p>
                </div>
            </div>
            <p className={localStyle.risk}>Risk: {data.risk}</p>

        </div>
    )
    return (
        <div className={`${localStyle.container}`} onClick={viewQuiz}>
            {inner}
        </div>
    )
}