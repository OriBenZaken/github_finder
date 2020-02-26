import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RepoItem } from './RepoItem';
import GithubContext from '../../context/github/githubContext';


export const Repos = () => {
  const githubContext = useContext(GithubContext);

  return githubContext.repos.map(repo => <RepoItem repo={repo} key={repo.id} />)
}
