import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';
import GithubState from './context/github/GithubState';

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

const App = () => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true);
  //     const res = await axios.get(`https://api.github.com/users?client-id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client-secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      
  //     setUsers(res.data);
  //     setLoading(false);
  //   } 
  //   fetchData();
  // }, []); 

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />

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
                  setAlert={showAlert}/>
                <Users/>
                </Fragment>
              )} />

              {/* About page */}
              <Route exact path='/about' component={About} />

              {/* User page */}
              <Route exact path='/user/:login' render={ props=> (
                <User { ...props } />
              )} />

            </Switch>
            
          </div>

        </div>
      </Router>
    </GithubState>
  );
  

}

export default App;
