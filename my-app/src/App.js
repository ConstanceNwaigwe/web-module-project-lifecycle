import './App.css';
import React from 'react';
import axios from 'axios';

const fetchUser = (user) => {
  return axios.get(`https://api.github.com/users/${user}/followers`)
      .then(res => res)
      .catch(err => console.log(err))
}

class App extends React.Component {
  state = {
      userFollowers: [],
      username: '',
      currentUser: 'collie'
  }

  componentDidMount() {
    fetchUser(this.state.currentUser)
          .then(res => {
                  this.setState({
                    userFollowers: res.data.message
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
                userFollowers: res.data.message
              })
          })
          .catch(err => console.log(err))
  }

  render() {
      return (
          <div>
              <h1>Search Fpr Github user followers</h1>
              <form onSubmit={this.handleSubmit}>
                  <input onChange={this.handleChange} type="text" />
                  <button>Search new user</button>
              </form>
              <div className="dogContainer">
                  {this.state.userFollowers.map(userFollowers => <p>{userFollowers}</p>)}
              </div>
          </div>
      )
  }
}

export default App
