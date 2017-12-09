import { combineReducers } from 'redux'
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SELECT_CATEGORY,
  FETCH_READABLES_REQUEST,
  FETCH_READABLES_SUCCESS,
  FETCH_READABLES_FAILURE,
  SELECT_READABLE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_READABLE_REQUEST,
  FETCH_READABLE_SUCCESS,
  FETCH_READABLE_FAILURE
} from "../actions";

// categories
function categories(
  state = {
    isFetching: false,
    items: {}
  }, action) {
  switch(action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categories,
        lastUpdated: action.receivedAt
      })
    case FETCH_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

function allCategories(state = {
  isFetching: false,
  lastUpdated: 0,
  items: {},
}, action) {
  switch (action.type) {
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
function selectedCategory(state = '', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category ? action.category : state
    default:
      return state
  }
}

function readables(state = {
    isFetching: false,
    items: {}
  }, action) {
  switch(action.type) {
    case FETCH_READABLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_READABLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.readables,
        lastUpdated: action.receivedAt
      })
    case FETCH_READABLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

function readable(state = {
  isFetching: false,
  readable: {}
}, action) {
  switch(action.type) {
    case FETCH_READABLE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_READABLE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        readable: action.readable,
        lastUpdated: action.receivedAt
      })
    case FETCH_READABLE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

function readableById(state = {
  isFetching: false,
  lastUpdated: 0,
  // readable: {}
}, action) {
  switch(action.type) {
    case FETCH_READABLE_SUCCESS:
    case FETCH_READABLE_REQUEST:
      if(action.id) {
        const value =  Object.assign({}, state, {
          [action.id]: readable(state[action.id], action)
        })
        return value
      }
      return state
    default:
      return state
  }
}

function readablesByCategory(state = {
  isFetching: false,
  lastUpdated: 0,
  // items: {},
}, action) {
  switch (action.type) {
    case FETCH_READABLES_SUCCESS:
    case FETCH_READABLES_REQUEST:
      if (action.category) {
        return Object.assign({}, state, {
          [action.category]: readables(state[action.category], action)
        })
      }
      return state
    default:
      return state
  }
}

// comments
function selectedReadable(state = {}, action) {
  switch (action.type) {
    case SELECT_READABLE:
      return action.readable
    default:
      return state
  }
}

function comments(state = {
  isFetching: false,
  // items: {}
}, action) {
  switch(action.type) {
    case FETCH_COMMENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.comments,
        lastUpdated: action.receivedAt
      })
    case FETCH_COMMENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

function commentsByReadable(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
    case FETCH_COMMENTS_REQUEST:
      return Object.assign({}, state, {
        [action.readable]: comments(state[action.readable], action)
      })
    default:
      return state
  }
}

// root reducer
const reducer = combineReducers({
  allCategories,
  readablesByCategory,
  selectedCategory,
  selectedReadable,
  readableById,
  // readable,
  commentsByReadable
})

export default reducer