import { combineReducers } from 'redux'
import {
  INVALIDATE_CATEGORIES,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SELECT_CATEGORY,
  INVALIDATE_CATEGORY,
  FETCH_READABLES_REQUEST,
  FETCH_READABLES_SUCCESS,
  FETCH_READABLES_FAILURE
} from "../actions";

// categories
function categories(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: {}
  }, action) {

  switch(action.type) {
    case INVALIDATE_CATEGORIES:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case FETCH_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case FETCH_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.categories,
        lastUpdated: action.receivedAt
      })
    case FETCH_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      })
    default:
      return state
  }
}

function allCategories(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORIES:
    case FETCH_CATEGORIES_SUCCESS:
    case FETCH_CATEGORIES_REQUEST:
      return Object.assign({}, state,
        categories(state[action.category], action)
      )
    default:
      return state
  }
}

// readables
function selectedCategory(state = 'all', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function readables(state = {
    isFetching: false,
    didInvalidate: false,
    items: {}
  }, action) {

  switch(action.type) {
    case INVALIDATE_CATEGORY:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case FETCH_READABLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case FETCH_READABLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.readables,
        lastUpdated: action.receivedAt
      })
    case FETCH_READABLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      })
    default:
      return state
  }
}

function readablesByCategory(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case FETCH_READABLES_SUCCESS:
    case FETCH_READABLES_REQUEST:
      return Object.assign({}, state, {
        [action.category]: readables(state[action.category], action)
      })
    default:
      return state
  }
}

// root reducer
const reducer = combineReducers({
  allCategories,
  readablesByCategory,
  selectedCategory
})

export default reducer