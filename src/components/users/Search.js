import React, { useState } from 'react'; 
import PropTypes from 'prop-types';

const Search = ({ searchUsers, clearUsers, showClear, setAlert }) => {

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
        searchUsers(text);
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
            {showClear && (
                <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
            )}
        </div>
   );
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search;