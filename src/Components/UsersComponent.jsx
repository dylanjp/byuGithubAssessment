import React, {Component} from 'react'
import GitHubService from '../API/GitHubService'


class UsersComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            username : '',
            gitUsername : '',
            name : '',
            numberOfRepos : '',
            imageUrl : 'https://avatars3.githubusercontent.com/u/22620281?v=4',

            repos : [],

            searchFailed: false,
            userFound: false
        }
        //bindFunctionsHere
        this.searchClicked = this.searchClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getRepoCount = this.getRepoCount.bind(this);
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

    //Gets the repo count
    getRepoCount(username, name) {

        console.log("Trying to get repo count")
        GitHubService.retrieveRepoCommitCount(username, name)
        .then(
            response => {
                console.log(response)
            }
        )
    
        return "Zero"
    }


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
                    console.log("YOU SAVE HYRULE AND YOU'RE A REAL HERO")
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
                            this.setState({repos : response.data})
                        }
                    ).catch( () => {
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
                <button className="btn btn-success" onClick={this.searchClicked}>Login</button>
                {this.state.searchFailed && <div className="alert alert-danger">That Username is Invalid</div>} 
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
                                <th>Number of Commits</th>
                                <th>Date of Latest Commit</th>
                            </tr>
                        </thead>
                        <tbody>{
                                    this.state.repos.map(
                                        repos =>
                                        <tr key={repos.id}>
                                            <td>{repos.name}</td>
                                            <td>{this.getRepoCount(this.state.gitUsername, repos.name)}</td>
                                            <td>{repos.updated_at}</td>
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