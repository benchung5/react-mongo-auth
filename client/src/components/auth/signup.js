import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { signupUser } from '../../actions/auth';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
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

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="error">
          {touched ? error : ''}
        </div>
      </div>
    );
  }


  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <div>
        <h3 className="margin-bottom">Sign Up</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          
          <Field
            label="Email:"
            name="email"
            component={this.renderField}
          />

          <Field
            label="Password:"
            name="password"
            component={this.renderField}
          />

          <Field
            label="Confirm Password:"
            name="passwordConfirm"
            component={this.renderField}
          />

          <button action="submit" className="btn btn-primary">Sign up!</button>
        </form>
        {this.renderAlert()}
        <p>Already have an account?</p>
        <Link className="nav-link" to="/signin">Sign In</Link>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  // //password strenth:
  // //https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
  // //let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  // //let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  // let lightRegex = new RegExp("^((?=.*[A-Z]|[a-z])(?=.*[0-9]))(?=.{6,})");
  // if(!lightRegex.test(formProps.password)) {
  //     //six characters or more and has at least one lowercase and one uppercase alphabetical character or has at least one lowercase and one numeric character or has at least one uppercase and one numeric character
  //     errors.password = 'password must be at least 6 characters long with at least one numeric character';
  // }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
})(
    connect(mapStateToProps, { signupUser })(Signup)
    );
