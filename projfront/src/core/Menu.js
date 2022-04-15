import React, {Fragment}  from 'react';
import {Link,withRouter} from "react-router-dom";
import { signout, isAuthenticated } from '../auth/helper';

const currentTab = (history,path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc72"}
    }else {
        return {color: "#FFFFFF"}
    }
}

const Menu  = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-items">
                <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
                    U.  Dashboard
                </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-items">
                <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                    A.  Dashboard
                </Link>
            </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-items">
                        <Link style={currentTab(history,"/")} className="nav-link" to="/">
                            Sign In
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-items">
                <span className="nav-link text-warning" 
                onClick={() => {
                    signout(() => {
                        history.push("/")
                    })
                }}
                 >
                    Signout
                </span>
                </li>
            )}
        </ul>
    </div>

)

export default withRouter(Menu);