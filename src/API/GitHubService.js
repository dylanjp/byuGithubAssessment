import axios from 'axios'

class GitHubService{
    //checks to see if username is valid and in Github
    getUsername(name){
        //console.log('excuted get Username')
        return axios.get(`https://api.github.com/users/${name}`);
    }

    //Gets a users list of Repos
    retrieveRepos(name){
        //console.log('excuted repos')
        return axios.get(`https://api.github.com/users/${name}/repos`);
    }

    //Gets a Repos CommitCount
    retrieveRepoCommitCount(username, name){
        //console.log('excuted repos commit count retrieve')
        return axios.get(`https://api.github.com/repos/${username}/${name}/commits`)
    }


    //Organization Calls
    getOrganizationDetails(username){
        //console.log('OrganizationCall was Excuted')
        return axios.get(`https://api.github.com/orgs/${username}/members`);
        //return axios.get(`https://api.github.com/users/dylanjp/events/public`); // for email
    }

}

export default new GitHubService()