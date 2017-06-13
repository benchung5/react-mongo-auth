import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/articles';
import Sidebar from '../sidebar';
import { connect } from 'react-redux';
import renderField from '../parts/form_fields';


class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        //get initial data to populate the form
        this.props.getArticle(this.props.match.params.articleId);
    }

    handleInitialize() {

          const formData = {
            "title": this.props.articleData.title,
            "slug": this.props.articleData.slug,
            "body": this.props.articleData.body
        };

        this.props.initialize(formData);
    }

    // if form isn't valit redux form will not call this function
    handleFormSubmit(formProps) {
        // call action to submit edited
        this.props.updateArticle(formProps);
    }

    renderUpdated() {
        if(this.props.articleUpdated && !this.props.errorMessage) {
            return (
                <div>
                    <span>Article: {this.props.articleUpdated.title}<br/>successfully updated.</span>
                </div>
            )
        }
    }

    renderAlert() {
        if (this.props.errorMessage && !this.props.articleData) {
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
    }
    
    render() {
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
}

// {this.renderAlert()}


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

function mapStateToProps(state, ownProps) {
    return { 
        articleUpdated: state.article.articleUpdated,
        // errorMessage: state.article.addArticleError,
        articleData: state.article.articleSingle
    };
}

export default reduxForm({
    validate,
    form: 'article-add',
    fields: ['title', 'slug', 'body'],
    //initialValues: {title: 'foobar', slug: 'foobar2', body: 'foobar3'}
})(
    connect(mapStateToProps, actions)(EditArticle)
    );


// EditArticle = reduxForm({
//     form:'article-add',
//     enableReinitialize : true, // this is needed!!
// })(EditArticle)

// EditArticle = connect(
//   state => ({
//     initialValues: {title: 'foobar', slug: 'foobar2', body: 'foobar3'}
//   }), actions  
// )(EditArticle)

// export default EditArticle;



