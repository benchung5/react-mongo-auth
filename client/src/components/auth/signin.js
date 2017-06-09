import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions/auth';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import renderField from '../parts/form_fields';

class Signin extends Component {

    componentWillMount() {
        if (this.props.authenticated) {
          // if the user is already logged in, just forward them right to the dashboard
          this.props.history.push('/dashboard');
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.authenticated) {
          //if just authenticated, redirect to dashboard
          this.props.history.push('/dashboard');
        }
    }

    handleFormSubmit({ email, password }) {
        //need to do sometihing to log user in
        this.props.signinUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        //props that are pulled off of redux form
        const { handleSubmit, fields: {email, password} } = this.props;

        return (
            <div>
            <h3 className="margin-bottom">Login</h3>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                  label="Email:"
                  name="email"
                  component={renderField}
                />
                <Field
                  label="Password:"
                  name="password"
                  component={renderField}
                />
                { this.renderAlert() }
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
            <p>Don't have an account?</p>
            <Link className="nav-link" to="/signup">Sign Up</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //have our state to show up in props as errorMessage
    return {
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error,
        authenticated: state.auth.authenticated
    }
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(
    connect(mapStateToProps, { signinUser })(Signin)
    );
