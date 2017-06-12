import axios from 'axios';
import {ROOT_URL} from '../../config';
import {
    FETCH_ARTICLES,
    ADD_ARTICLE,
    UPDATE_ARTICLE,
    GET_ARTICLE,
    ADD_ARTICLE_ERROR,
    UPDATE_ARTICLE_ERROR
    } from '../types';

//import config from '../../../config-new';

export function fetchArticles() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/articles/all`)
        .then(response => {

            dispatch({
                type: FETCH_ARTICLES,
                payload: response.data
             });
            return Promise.resolve();

        })
        .catch((err) => {
            console.log('error fetching articles', err);
            //todo: if request is bad
            // dispatch(fetchArticlesError('response.data.error'));
        });
    }
}

export function getArticle(slug) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/articles/single?id=${slug}`)
        .then(response => {
            dispatch({
                type: GET_ARTICLE,
                payload: response.data
             });
        })
        .catch((err) => {
            console.log('error getting article: ', err);
            //todo: if request is bad
            // dispatch(fetchArticlesError('response.data.error'));
        });
    }
}

export function addArticle({ title, slug, body }) {
    return function(dispatch) {
        // post to http://192.168.99.100/api/articles/create
        axios.post( `${ROOT_URL}/articles/create`, { title, slug, body } )
        .then( response => {
            if(response.data.error) {
                dispatch(addArticleError(`There was an error creating the article: ${response.data.error}`));
            } else {
                dispatch({
                    type: ADD_ARTICLE,
                    payload: response.data
                });
            }
        })
        .catch((err) => {
            //todo: if request is bad
            dispatch(addArticleError('there was an error creating the article', err));
        });
    }
}

export function updateArticle({ title, slug, body }) {
    return function(dispatch) {
        // post to http://192.168.99.100/api/articles/create
        axios.post( `${ROOT_URL}/articles/update`, { title, slug, body } )
        .then( response => {
            if(response.data.error) {
                dispatch(updateArticleError(`there was an error updating the article: ${response.data.error}`));
            } else {
                dispatch({
                    type: UPDATE_ARTICLE,
                    payload: response.data
                });
            }
        })
        .catch((err) => {
            //todo: if request is bad
            dispatch(updateArticleError('there was an error updating the article', err));
        });
    }
}

export function deleteArticle({ slug }) {
        return function(dispatch) {

        // post to http://192.168.99.100/articles/delete
        axios.post( `${ROOT_URL}/articles/delete`, { slug } )
        .then( response => {
            if(response.data.error) {
                //dispatch(deleteArticleError(`there was an error deleting the article: ${response.data.error}`));
            } else {
                dispatch(fetchArticles());
                // dispatch({
                //     type: DELETE_ARTICLE,
                //     payload: response.data
                // });
            }
        })
        .catch((err) => {
            //todo: handle if request is bad
            console.log('error deleting the article', err);
        });
    }
}

export function addArticleError(error) {
    return {
        type: ADD_ARTICLE_ERROR,
        payload: error
    }
}

export function updateArticleError(error) {
    return {
        type: UPDATE_ARTICLE_ERROR,
        payload: error
    }
}