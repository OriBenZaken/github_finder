import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

/*
What is JSX?

JSX is Javascript Syntax Extension.
It enables us to write the output of our component in xml/HTML way.
This is actually a syntetic suger which under the hood is actually Js.

There are couple of differences between JSX and HTML:
1. 'className' attribute: we should use 'className' instead of 'class'.
2. 'htmlFor' attribute: we should use 'htmlFor' instead of 'for'.
3. Has to have only one parent emelment
4. If you don't want everythong to be under the same element, we can use
the <React.Fragment> element. This element will disapper when it will go to the html page.
5. can add Js code inside {}.
6. use component with the html syntax: <Component_name />

*/

class App extends Component {
  state = {
    users: [],
    user: {},
    repos:[],
    loading: false,
    alert: null
  }
  async componentDidMount() {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users?client-id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client-secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({ users: res.data, loading: false});
  }

  // Search github users
  searchUsers = async text => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client-id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client-secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    
    this.setState({ users: res.data.items, loading: false});
  }

  // Get a single Github user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?
    client-id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client-secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    client-id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client-secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  }
  // Clear search users results
  clearUsers = () => {
    this.setState({ users: [], loading: false});
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type }});
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {
    const { users, user, loading, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />

            {/* Will show only one rout at a time */}
            <Switch>

              {/* Rout should have render function / component. 
              If we use a render function in order to render several components
              and not just one, than we can wrap them all in a Fragment
              component. A reminder, render function should have only one
              parent element.
              */}
              {/* Home page */}
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true : false} 
                  setAlert={this.setAlert}/>
                <Users loading={loading} users={users}/>
                </Fragment>
              )} />

              {/* About page */}
              <Route exact path='/about' component={About} />

              {/* User page */}
              <Route exact path='/user/:login' render={ props=> (
                <User { ...props } 
                getUser={this.getUser} 
                getUserRepos={this.getUserRepos} 
                user={user} 
                repos={repos} 
                loading={loading}/>
              )} />

            </Switch>
            
          </div>

        </div>
      </Router>
    );
  }

}

export default App;
