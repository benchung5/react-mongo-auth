import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions/auth';
import PropTypes from 'prop-types';

class Header extends Component {

    static contextTypes = {
      router: PropTypes.object
    };

    onSignOutClick() {
        this.props.signoutUser();
        this.context.router.push('/signin');
    }

    renderLinks() {
        if (this.props.authenticated) {
          // show a link to sign out
          return <li className="nav-item">
                 <a href="#" className="nav-link" onClick={this.onSignOutClick.bind(this)}>Sign Out</a>
              </li>
          } else {
              // show a link to sign in or sign up
              return [
                  <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin">Sign In</Link>
                  </li>,
                  <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
              ];
          }
    }

    render() {
        return (
            <div>
                <nav className="navbar nabar-light">
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                        <a href="/" className="nav-link">Website</a>
                        </li>
                        {this.renderLinks() }
                    </ul>
                </nav>
                <div className="clear"></div>
            </div>
            );
    }
}

function mapStateToProps(state) {
  return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, actions)(Header);
