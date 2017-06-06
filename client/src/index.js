import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/home';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Dashboard from './components/dashboard';
import ArticlesList from './components/articles/articles_list';
import ArticleAdd from './components/articles/article_add';
import UsersList from './components/users/users_list';

import reducers from './reducers';

import RequireAuth from './components/auth/require_auth';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/dashboard" component={RequireAuth(Dashboard)} />
        <Route path="articles-list" component={RequireAuth(ArticlesList)} />
        <Route path="article-add" component={RequireAuth(ArticleAdd)} />
        <Route path="users-list" component={RequireAuth(UsersList)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
