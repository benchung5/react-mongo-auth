import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/articles';
import { connect } from 'react-redux';
import renderField from '../parts/form_fields';


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


let InitializeFromStateForm = props => {
    const { handleSubmit, fields: { title, slug, body }} = this.props;
    return (
        <div className="row">
            <Sidebar/>
            <div className="col-md-10">
                <h3>Edit Article</h3>

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
                {this.renderUpdated()}
            </div>
            
        </div>
    );
}

function mapStateToProps(state) {
    return { 
        articleUpdated: state.article.articleUpdated,
        // errorMessage: state.article.addArticleError,
        articleData: state.article.articleSingle
    };
}

// export default reduxForm({
//     validate,
//     form: 'article-add',
//     fields: ['title', 'slug', 'body'],
//     //initialValues: {title: 'foobar', slug: 'foobar2', body: 'foobar3'}
// })(
//     connect(mapStateToProps, actions)(EditArticle)
//     );


// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState'  // a unique identifier for this form
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
mapStateToProps, actions)(InitializeFromStateForm);

export default InitializeFromStateForm



