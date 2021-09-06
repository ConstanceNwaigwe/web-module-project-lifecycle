import './App.css';
import React from 'react';
import axios from "axios";



const fetchUser = (user) => {
  return axios
    .get(`https://api.github.com/users/${user}/followers`)//https://api.github.com/users/${user}/followers
    .then((res) => res)
    .catch((err) => console.log(err));
};

/*function App() {
  ///fetchUser("ConstanceNwaigwe");
  let a;
  axios
    .get(`https://api.github.com/users/ConstanceNwaigwe/followers`)//https://api.github.com/users/${user}/followers
    .then((res) => a = res.data[0].avatar_url)
    .catch((err) => console.log(err));
  return(
    <div>
      <img src={a}/>
    </div>
  )
}*/

class App extends React.Component {

  state = {
      userFollowers: [],
      username: '',
      currentUser: 'ConstanceNwaigwe'
  }

  componentDidMount() {
    fetchUser(this.state.currentUser)
          .then(res => {
                  this.setState({
                    userFollowers: res.data[0].avatar_url
                  })
              }   
          )
  }


  handleChange = (e) => {
      this.setState({
        username: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      fetchUser(this.state.username)
          .then(res => {
              this.setState({
                userFollowers: res.data[0].avatar_url
              })
          })
          .catch(err => console.log(err))
  }

  render() {
      return (
          <div className="App">
              <h1 className="App-header">Search For Github user followers</h1>
              <form onSubmit={this.handleSubmit}>
                  <input onChange={this.handleChange} type="text" />
                  <button>Search new user</button>
              </form>
              <div className="usersfollowers">
                  {/*this.state.userFollowers.map(userFollower => <p>{userFollower}</p>)*/}
                  <p>{this.state.userFollowers}</p>
                  <img src={this.state.userFollowers}/>
              </div>
          </div>
      )
  }
}

export default App