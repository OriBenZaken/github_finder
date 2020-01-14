import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Navbar extends Component {
    // object with default props which can be ovrriden by the user of the component.
    // it must be called defaultProps
    static defaultProps = {
        title: 'Github Finder',
        icon: 'fab fa-github'
    };

    // propTypes allows us to do type-checking
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    };

    render() {
        return (
            <nav className="navbar bg-primary">
                <h1>
                    <i className={this.props.icon} /> {this.props.title}
                </h1>
            </nav>
        )
    }
}

export default Navbar
