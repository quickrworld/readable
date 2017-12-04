import { combineReducers } from 'redux'

import {
  SELECT_CATEGORY,
  INVALIDATE_CATEGORY,
  FETCH_READABLES_REQUEST,
  FETCH_READABLES_SUCCESS,
  FETCH_READABLES_FAILURE
} from "../actions";

function selectedCategory(state = 'all', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function readables(
  state = {
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
      return state
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

const reducer = combineReducers({
  readablesByCategory,
  selectedCategory
})

export default reducer