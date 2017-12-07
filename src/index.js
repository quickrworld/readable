import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {
  fetchCategories,
  selectCategory,
  fetchReadables,
  selectReadable,
  fetchComments } from "./actions";
import reducer from './reducers'
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const middleware = [ thunk ]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

// Testing the primary actions

store.dispatch(fetchCategories())

store.dispatch(selectCategory('all'))
store.dispatch(fetchReadables('all'))

// store.dispatch(selectCategory('react'))
// store.dispatch(fetchReadables('react'))
//
// store.dispatch(selectCategory('redux'))
// store.dispatch(fetchReadables('redux'))
//
store.dispatch(selectReadable('8xf0y6ziyjabvozdd253nd'))
store.dispatch(fetchComments('8xf0y6ziyjabvozdd253nd'))
//
// store.dispatch(selectReadable('6ni6ok3ym7mf1p33lnez'))
// store.dispatch(fetchComments('6ni6ok3ym7mf1p33lnez'))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>, document.getElementById('root')
)

registerServiceWorker()
