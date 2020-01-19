import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

// destructoring the props  we gat as an argument

const Navbar = ({icon, title}) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
            
        </nav>
    )
}

// object with default props which can be ovrriden by the user of the component.
// it must be called defaultProps
Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

// propTypes allows us to do type-checking
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navbar;
