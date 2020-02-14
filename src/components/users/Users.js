import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layouts/Spinner';
import propTypes from 'prop-types';

const Users = ({ loading, users }) => {
    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}

Users.propTypes = {
    loading: propTypes.bool.isRequired,
    users: propTypes.array.isRequired
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
