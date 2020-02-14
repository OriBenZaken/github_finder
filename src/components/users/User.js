import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Repos } from '../repos/Repos';

const User = ({ user, loading, repos, getUser, getUserRepos, match }) => {
    // useEffect will run all the time unsless we will give it some limitations
    // in array as the 2nd argument.
    // for exmaple, we can make it work only repos has changesd, and pass [repos].
    // In order to make it run only once and mimic ComponentDidMount() we
    // should pass an empty array ([])
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, []);

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    if (loading) return <Spinner />;
    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>Back To Search</Link>

            Hireable:{' '}
            {hireable ? (
                <i className='fas fa-check text-success' />
            ) : (
                <i className='fas fa-times-circle text-danger' />
            )}

            <div className='card grid-2'>
                <div className="all-center">
                    <img src={avatar_url} alt="" className="round-img" style= {{ width: '150px'}}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                
                <div>
                    {bio && (<Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>)}

                    <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && (<Fragment>
                                <strong>Username: </strong> {login}
                            </Fragment>)}
                        </li>

                        <li>
                            {company && (<Fragment>
                                <strong>Username: </strong> {company}
                            </Fragment>)}
                        </li>

                        <li>
                            {blog && (<Fragment>
                                <strong>Website: </strong> {blog}
                            </Fragment>)}
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-white">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            
            <Repos repos={repos} />
        </Fragment>
    )
}

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
};

export default User;