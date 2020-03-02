import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import User from './components/users/User';
import Home from './components/pages/Home';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import './App.css';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';


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
  return (
    <AlertState>
      <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert/>

              {/* Will show only one rout at a time */}
              <Switch>

                {/* Rout should have render function / component. 
                If we use a render function in order to render several components
                and not just one, than we can wrap them all in a Fragment
                component. A reminder, render function should have only one
                parent element.
                */}
                {/* Home page */}
                <Route exact path='/' component={Home} />

                {/* About page */}
                <Route exact path='/about' component={About} />

                {/* User page */}
                <Route exact path='/user/:login' component={User} />

                {/* Not Found: important to be at the END of the Router */}
                <Route component={NotFound}/>
              </Switch>
              
            </div>

          </div>
        </Router>
      </GithubState>
    </AlertState>
  );
}

export default App;
