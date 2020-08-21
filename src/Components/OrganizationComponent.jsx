import React, {Component} from 'react'
import GitHubService from '../API/GitHubService'
import moment from 'moment'

class OrganizationsComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            username : '', //this is for the input from the user
            name : 'defaultName',// this is for the name of the organization
            imageUrl : 'https://avatars3.githubusercontent.com/u/22620281?v=4',

            repos : [], //store the member list with infomation

            searchFailed: false,
            userFound: false
        }
        //bindFunctionsHere
        this.searchClicked = this.searchClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.output = this.output.bind(this);
    }

    //Handles the User Input for Search
    handleChange(event) {
        //console.log(event.target.value);
        this.setState(
            {
                [event.target.name]
                :event.target.value
            }
            )
    }

    //Basically I am making a call for each user to get their real name and email and then I am storing it
    //In the array of members of the organization. I'm simplying overwritting it in and storing it unused variables
    //in the array for each memeber
    output(item, index, array){
        GitHubService.getUsername(item.login)
        .then(response => {
            if(response.data.name == null){
                item.type = "Not Listed"
            }else{
            item.type = response.data.name
            }
            if(response.data.email == null){
                item.gravatar_id = "Not Listed"
            }else{
                item.gravatar_id = response.data.email
            }

            item.node_id = index + 1

            //console.log("Is this the end?")
            this.setState( {state: this.state})
        })

    }

    getBasicInfo(){
        //console.log("getBasicINfo was Activated")
        //Gathering Basic org data
        GitHubService.getUsername(this.state.username)
        .then(response => {
            console.log("Organization Details")
            console.log(response)
            this.setState({imageUrl:response.data.avatar_url})
            this.setState({name:response.data.login})
            
            GitHubService.getOrganizationDetails(this.state.username)
            .then(response => {
                console.log("Please let this be the end")
                console.log(response)

                response.data.forEach(this.output);

                this.setState({repos : response.data})
            }
            )
            .catch( () => {
                console.log('ItsaBroken')
                this.setState({searchFailed:true})
                this.setState({userFound:false})
               }) 
        }
        ).catch( () => {
            console.log('ItsBroken')
            this.setState({searchFailed:true})
            this.setState({userFound:false})
           }) 
    }

    //The search button was clicked
    searchClicked(){
        //console.log("searchClicked was clicked .... duh")
        this.setState({userFound:true})
        this.setState({searchFailed:false})

        GitHubService.getOrganizationDetails(this.state.username)
        .then(response => {
            console.log(response)
            if(response.status !== 200){
                console.log("Not a valid Organization")
                this.setState({searchFailed:true})
            }else{
                this.getBasicInfo();
            }
        }
        ).catch( () => {
            console.log('ItsaBroken')
            this.setState({searchFailed:true})
            this.setState({userFound:false})
           }) 
        

    }

    render() {
        return (
            <div>
                <h4>Organizations</h4>
                <div className="container">
                Search:<input type="text" name = "username" value={this.state.username} onChange={this.handleChange}/>
                <button className="btn btn-success" onClick={this.searchClicked}>Search</button>
                {this.state.searchFailed && <div className="alert alert-danger">That Organization does not Exist or You have exceeded the rate limit</div>} 
            </div>

            {this.state.userFound && <div className="User data"> 

            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h1>{this.state.name}</h1>
                        <img src={this.state.imageUrl} alt="avatar" className="avatar"/>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h5>List of Members</h5>
                    </div>
                </div>
            </div>

            <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Actual Name</th>
                                <th>Email Address (if listed)</th>
                            </tr>
                        </thead>
                        <tbody className="listofrepos">{
                                    this.state.repos.map(
                                        repos =>
                                        <tr key={repos.id}>
                                            <td>{repos.node_id}</td>
                                            <td>{repos.login}</td>
                                            <td>{repos.type}</td>
                                            <td>{repos.gravatar_id}</td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
            </div>
            </div>}
            </div>//grand mighty ending
        )
    }
}
export default OrganizationsComponent