import React, {Component} from 'react'

class WelcomeComponent extends Component {
    render() {
        return (
        <div>
            <h1>Welcome</h1>
            <body className="container">
                Hello and welcome to Dylan's skill assessment project for the OIT Web Development Position I applied to at BYU. This project will 
                be working with the Github REST API. This is a GUI React project primarily written in JavaScript. The requirement for this project are 
                to do the following:
            </body>
            <body className ="container">
            1. Find a user by their username and return the following:<br/>
                - A list of all their public repos. For each repo the list must include: repo name / number of commits / date of last commit<br/>
            <br/>
            2. Find an Organization by name and return the following:<br/>
                -A list of all public members. For each member the list must include: Username / Actual Name / email(if avaiable)<br/>
            <br/>
            Above on the nav bar you will find links for "Users" and "Organizations". These pages will meet the requirements listed above. Again I would 
            like to thank BYU for the opportunity to apply for this position. I enjoyed my time working on this skills assessment.<br/>
            <br/>
            For a video demostration of this app look here:<br/>
            <br/>
            Thank you again for your time and consideration,<br/>
            -Dylan John Pratt

            </body>
        </div>
        )
    }
}
export default WelcomeComponent