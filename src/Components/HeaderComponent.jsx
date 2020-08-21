import React, {Component} from 'react'
import { withRouter } from 'react-router'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

class HeaderComponent extends Component {
    render() {
        return (
            <header className="header">
                <nav className="navbar navbar-expand-md navbar-dark">
                    <div><a href="https://www.byu.edu/" className="navbar-brand">BYU</a></div>
                    <ul className="navbar-nav">
                        <li ><Link className="nav-link" to="/">Home</Link></li>
                        <li ><Link className="nav-link" to="/users">Users</Link></li>
                        <li ><Link className="nav-link" to="/organizations">Organizations</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)