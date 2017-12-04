import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { selectCategory, fetchReadables } from "./actions";
import reducer from './reducers'
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger()
const middleware = [ thunk, logger ]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

// Testing the primary actions
store.dispatch(selectCategory('all'))
store.dispatch(fetchReadables('all'))

store.dispatch(selectCategory('react'))
store.dispatch(fetchReadables('react'))

store.dispatch(selectCategory('redux'))
store.dispatch(fetchReadables('redux'))

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)

registerServiceWorker()
