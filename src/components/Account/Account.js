import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Account = (props) => {
    const logInfo = useSelector(state => state.logged);
    // console.log(logInfo);

    return(
            props.isAuthenticated
                ?
                <ul className={"nav__list"}>
                    <li className="nav__list-item">
                        <Link className={"nav__link"} to={"/mycart"}>cart</Link>
                    </li>
                    <li className={'nav__list-item'}>
                        <Link className={"nav__link"} to={"/account"}>{logInfo.username}</Link>
                    </li>
                </ul>
                :
                <ul className={"nav__list"}>
                    <li className={"nav__list-item"}>
                        <Link className={"nav__link"} to={"/login"}>Login</Link>
                    </li>
                    <li className={"nav__list-item"}>
                        <Link className={"nav__link"} to={"/register"}>Register</Link>
                    </li>

                </ul>
    )
}

export default Account;