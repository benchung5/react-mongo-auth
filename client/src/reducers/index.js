import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import reducerArticle from './reducerArticle';
import reducerArticles from './reducerArticles';
import reducerAuth from './reducerAuth';
import reducerUser from './reducerUser';
import reducerUsers from './reducerUsers';

const rootReducer = combineReducers({
  form,
  article: reducerArticle,
  articles: reducerArticles,
  auth: reducerAuth,
  user: reducerUser,
  users: reducerUsers,
});

export default rootReducer;
