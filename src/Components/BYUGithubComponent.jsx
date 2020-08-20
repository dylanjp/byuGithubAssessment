import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import UsersComponent from './UsersComponent'
import OrganizationsComponent from './OrganizationComponent'

class BYUGithubComponent extends Component {
    render() {
        return(
            <div className="BYUGithub">
                <Router>
                    <>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={WelcomeComponent}/>
                        <Route path="/users" exact component={UsersComponent}/>
                        <Route path="/organizations" exact component={OrganizationsComponent}/>

                        <Route component={ErrorComponent}/>
                     </Switch>
                     <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}

function ErrorComponent() {   
        return <div>You got lost! Sorry! 404</div>
}

export default BYUGithubComponent