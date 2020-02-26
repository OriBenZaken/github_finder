import React, { useState, useContext } from 'react'; 
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext'

const Search = ({ setAlert }) => {
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');

    const onChange = e => {
        // we use [] to use the name of the input as a key
        setText(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            // args for setAlert: message and type
            setAlert('Please enter something', 'light');
            return;
        }
        githubContext.searchUsers(text);
        setText( '')
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input
                    type="text" 
                    name="text" 
                    placeholder="Search Users..." 
                    value={text} 
                    onChange={onChange}>
                </input>
                <input type="submit" value="Search" className="btn btn-dark btn-block"></input>
            </form>
            {githubContext.users.length > 0 && (
                <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>
            )}
        </div>
   );
}

Search.propTypes = {
    setAlert: PropTypes.func.isRequired
};

export default Search;
