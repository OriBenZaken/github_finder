import React, { Component } from 'react';
import Navbar from './components/layouts/Navbar';
import UserItem from './components/users/UserItem'
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
6. use component with thw syntax: <Component_name />

*/

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />

        <UserItem />

      </div>
    );
  }

}

export default App;
