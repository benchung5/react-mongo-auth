import React, {Component} from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar';
import {Link} from 'react-router-dom';
//no longer needed as the below uses the shorthand
//import {bindActionCreators} from 'redux';
//import {fetchArticles} from '../actions/index';
import * as actions from '../../actions/articles';
//Link is an actual react component provided by react router it will show up as an html anchor tag.
//The advantage is that ia really behaves like a real link with all it's perks
//import {Link} from 'react-router-dom';
import {
    ROOT_URL
    } from '../../config';

class ArticlesIndex extends Component {
    //this is a lifecyclemethod. If present, React will call this automatically whenever our compoenent is about to be rendered
    //to the dom for the first time. Here's where we should put our action creator in this case
    componentWillMount() {
        this.props.fetchArticles();
        //this.props.match.params comes in from the router query string
        //console.log('this.props.match.params: ', this.props.match.params);
    }

    onDeleteArticleClick(event) {
        let slug = event.target.getAttribute("data-slug");
        this.props.deleteArticle({ slug });
    }
    
    renderArticles() {

        return this.props.articles.map((article) => {
            return (
                <li className="list-group-item" key={article.slug}>
                    <span>{article.title}</span>
                    <a href="#" data-slug={article.slug} onClick={this.onDeleteArticleClick.bind(this)}>Delete</a>
                    <Link to={`/articles-list/${article.slug}`}>edit</Link>
                </li>
            );
        });
    }
    
    render() {
        return (
            <div className="row">
                <Sidebar/>
                <div className="col-md-10">
                    <h3>Articles</h3>
                    <ul className="list-group item-list">
                        {this.renderArticles()}
                    </ul>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        articles:state.articles.all,
        //you may not need the below, but there for now
        articleDeleted: state.article.articleDeleted
    };
}

export default connect(mapStateToProps, actions)(ArticlesIndex);