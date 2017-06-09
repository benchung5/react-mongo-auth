import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Header from './components/header';
import customHistory from './history';

//import { Router, Route, IndexRoute, browserHistory } from 'react-router-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reduxThunk from 'redux-thunk';

import ProtecetWarning from './components/protected_warning';
import Home from './components/home';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Dashboard from './components/dashboard';
import ArticlesList from './components/articles/articles_list';
import ArticleAdd from './components/articles/article_add';
import ArticleEdit from './components/articles/article_edit';
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

//Header needs to be a pathless Route so it updates when 
//the route changes and use props.history
//note the "exact" in the /articles-list route
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={customHistory}>
      <div>
       <Route history={customHistory} component={Header} />
       <Switch history={customHistory}>
          <Route history={customHistory} exact path="/" component={Home} />
          <Route history={customHistory} path="protected" component={ProtecetWarning} />
          <Route history={customHistory} path="/signin" component={Signin} />
          <Route history={customHistory} path="/signup" component={Signup} />
          <Route history={customHistory} path="/signout" component={Signout} />
          <Route history={customHistory} path="/dashboard" component={RequireAuth(Dashboard)} />
          <Route history={customHistory} exact path="/articles-list" component={RequireAuth(ArticlesList)} />
          <Route path="/articles-list/:articleId" component={RequireAuth(ArticleEdit)} />
          <Route path="/article-add" component={RequireAuth(ArticleAdd)} />
          <Route path="/users-list" component={RequireAuth(UsersList)} /> 
        </Switch> 
      </div>  
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
