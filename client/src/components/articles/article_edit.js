import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/articles';
import Sidebar from '../sidebar';
import { connect } from 'react-redux';
import renderField from '../parts/form_fields';

class EditArticle extends Component {

    componentWillMount() {
        //get initial data to populate the form
        console.log(this.props.match.params.articleId);
        this.props.getArticle();
    }

    componentDidMount() {
      this.handleInitialize();
    }

    handleInitialize() {
      const initData = {
        "title": 'foo',
        "slug": 'foo',
        "body": 'foo',
      };

      this.props.initialize(initData);
    }

    // if form isn't valit redux form will not call this function
    handleFormSubmit(formProps) {
        // call action creator to sign up user
        this.props.addArticle(formProps);
    }

    renderAdded() {
        if(this.props.articleAdded && !this.props.errorMessage) {
            return (
                <div>
                    <span>Article: {this.props.articleAdded.title}<br/>successfully added. </span>
                </div>
            )
        }
    }

    renderAlert() {
        if (this.props.errorMessage && !this.props.articleAdded) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    
    render() {
        const { handleSubmit, fields: { title, slug, body }} = this.props;
        return (
            <div className="row">
                <Sidebar/>
                <div className="col-md-10">
                    <h3>Edit Article</h3>
                    {this.props.articleData}
                    <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Field
                          type="input"
                          label="Title:"
                          name="title"
                          component={renderField}
                        />
                        <Field
                          type="input"
                          label="Slug:"
                          name="slug"
                          component={renderField}
                        />
                        <Field
                          type="textarea"
                          label="Body:"
                          name="body"
                          component={renderField}
                        />
                        <button action="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {this.renderAlert()}
                    {this.renderAdded()}
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
        errorMessage: state.article.addArticleError,
        articleData: state.article.articleSingle
    };
}

export default reduxForm({
    validate,
    form: 'article-add',
    fields: ['title', 'slug', 'body'],
})(
    connect(mapStateToProps, actions)(EditArticle)
    );



