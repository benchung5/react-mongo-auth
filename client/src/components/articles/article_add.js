import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/articles';
import Sidebar from '../sidebar'

class AddArticle extends Component {

    // if form isn't valit redux form will not call this function
    handleFormSubmit(formProps) {
        // call action creator to sign up user
        this.props.addArticle(formProps);
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

    renderAdded() {
        //only render if there's no error message
        if(this.props.articleAdded && !this.props.errorMessage) {
            return (
                <div>
                    <span>Article: {this.props.articleAdded.title}<br/>successfully added. </span>
                </div>
            )
        }
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.articleData && (prevProps.articleData !== this.props.articleData)) {
            this.handleInitialize();
        }
        //clear out error messsages if any
        if (this.props.articleAdded && (prevProps.articleAdded !== this.props.articleAdded)) {
            console.log(this.props.articleAdded);
            this.props.addArticleError('');
        }
    }

    renderAlert() {

    }
    
    render() {
        const { handleSubmit, fields: { title, slug, body }} = this.props;
        return (
            <div className="row">
                <Sidebar/>
                <div className="col-md-10">
                    <h3>Add Article</h3>
                    <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Field
                          label="title:"
                          name="title"
                          component={this.renderField}
                        />
                        <Field
                          label="slug:"
                          name="slug"
                          component={this.renderField}
                        />
                        <Field
                          label="body:"
                          name="body"
                          component={this.renderField}
                        />
                        <button action="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {this.renderAdded()}
                    {this.renderError()}
                </div>
            </div>
        );
    }
}

function validate(formProps) {
    const errors = {};

    //todo: use the map or foreach to shorten this code
    if (!formProps.title) {
        errors.title = 'Please enter a title';
    }

    if (!formProps.slug) {
        errors.slug = 'Please enter a slug';
    }

    if (!formProps.body) {
        errors.body = 'Please enter body';
    }

    // return empty object if no errors
    // this will get assigned to the error property of the field at hand
    // so we can display it with slug.error
    return errors;
}

function mapStateToProps(state) {
    return { 
        articleAdded: state.article.articleAdded,
        errorMessage: state.article.addArticleError
    };
}

// export default reduxForm({
//     form: 'article-add',
//     fields: ['title', 'slug', 'body'],
//     // validate: validate
//     validate
// }, mapStateToProps, actions)(AddArticle);



export default reduxForm({
    validate,
    form: 'article-add',
    fields: ['title', 'slug', 'body'],
})(
    connect(mapStateToProps, actions)(AddArticle)
    );



