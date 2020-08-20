import axios from 'axios'

class GitHubService{
    getUsername(name){
        console.log('excuted get Username')
        return axios.get(`https://api.github.com/users/${name}`);
    }

    retrieveRepos(name){
        console.log('excuted repos')
        return axios.get(`https://api.github.com/users/${name}/repos`);
    }

    retrieveRepoCommitCount(username, name){
        console.log('excuted repos commit count retrieve')
        return axios.get(`https://api.github.com/repos/${username}/${name}/stats/contributors`);
    }
    // deleteTodos(name, id){
    //     console.log('excuted Delete')
    //     return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    // }

    // updateTodos(name, id, todo){
    //     console.log('excuted update')
    //     return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
    // }

    // createTodo(name, todo){
    //     console.log('excuted update')
    //     return axios.post(`http://localhost:8080/users/${name}/todos/`, todo);
    // }


}

export default new GitHubService()