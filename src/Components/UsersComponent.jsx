import React, {Component} from 'react'
import GitHubService from '../API/GitHubService'
import moment from 'moment'

class UsersComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            username : '',//store input from the user
            gitUsername : '', //store the actual username you getback from the call (Capitolization)
            name : '', // The person's actual name
            numberOfRepos : '', // the number of repos
            imageUrl : 'https://avatars3.githubusercontent.com/u/22620281?v=4', // avatar picture

            repos : [], // array of the user's repos

            searchFailed: false,
            userFound: false
        }
        //bindFunctionsHere
        this.searchClicked = this.searchClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.output = this.output.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    refresh () {
        this.forceUpdate();
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


    //Basically this function is overwritting the forks varabile in this array with the commit count for each repo / To make rendering more smooth
    //Have to force state to refresh in order to work
    output(item, index, array){
        GitHubService.retrieveRepoCommitCount(this.state.gitUsername, item.name)
        .then(response => {
            item.forks = response.data.length
            //console.log("Is this the end?")
            this.setState( {state: this.state})
        })
    }

    //The search button was clicked
    searchClicked(){
        console.log("searchClicked was clicked .... duh")
        this.setState({userFound:true})
        //Making API call to see if username is valid
        GitHubService.getUsername(this.state.username)
        .then(
            response => {
                console.log(response)
                if(response.status !== 200){
                    console.log("IT FAILED AHHHHHH")
                    this.setState({searchFailed:true})
                }else{
                    this.setState({searchFailed:false})
                    this.setState({name:response.data.name})
                    this.setState({gitUsername:response.data.login})
                    this.setState({imageUrl:response.data.avatar_url})
                    this.setState({numberOfRepos:response.data.public_repos})
                    //Call to get repos
                    GitHubService.retrieveRepos(this.state.username)
                    .then(
                        response => {
                            console.log(response)

                            response.data.forEach(this.output);              

                            this.setState({repos : response.data})
                            
                        }
                    )
                    .catch( () => {
                        console.log('ReposFailed')
                       })

                }
            }
        ).catch( () => {
            console.log('Yousuck')
            this.setState({searchFailed:true})
            this.setState({userFound:false})
           })        
    }

    render() {
        return (
        <div>
            <h4>Users</h4>
            <div className="container">
                Search:<input type="text" name = "username" value={this.state.username} onChange={this.handleChange}/>
                <button className="btn btn-success" onClick={this.searchClicked}>Search</button>
                {this.state.searchFailed && <div className="alert alert-danger">That Username is Invalid or You have exceeded the rate limit</div>} 
            </div>

            {this.state.userFound && <div className="User data">

            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <img src={this.state.imageUrl} alt="avatar" className="avatar"/>
                    </div>
                    <div className="col-sm">
                        <h1>{this.state.name}</h1>
                        <h3>{this.state.gitUsername}</h3>
                        <h5>Number of Repos: {this.state.numberOfRepos}</h5>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h5>List of Repos</h5>
                    </div>
                </div>
            </div>

            <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Repo Name</th>
                                <th>Date of Latest Commit</th>
                                <th>Number of Commits</th>
                            </tr>
                        </thead>
                        <tbody className="listofrepos">{
                                    this.state.repos.map(
                                        repos =>
                                        <tr key={repos.id}>
                                            <td>{repos.name}</td>
                                            <td>{moment(repos.updated_at).format("MM-DD-YYYY")}</td>
                                            <td>{repos.forks}</td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
            </div>

            
            </div>}

        </div>
        )
    }
}
export default UsersComponent