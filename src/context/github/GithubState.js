import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Everytime we are changing the state we will do it through dispatch.

  // Search Users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client-id=${githubClientId}&
    client-secret=${githubClientSecret}`);

    dispatch({
      type: SEARCH_USERS,
      // the data we want to send.
      // The reducer will put it into our state and will send it down
      // to every component that needs it.
      payload: res.data.items
    });
  }

  // Get User
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}?
    client-id=${githubClientId}&
    client-secret=${githubClientSecret}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    client-id=${githubClientId}&
    client-secret=${githubClientSecret}`);

    dispatch({ 
      type: GET_REPOS,
      payload: res.data
    })
  }

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  // Set Loading
  const setLoading = () => dispatch({type: SET_LOADING})

  // This provider will warp our entire app.
  // Here we are making a state which we be available to the entire app.
  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
    {props.children}
  </GithubContext.Provider>
}

export default GithubState;