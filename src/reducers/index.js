import { combineReducers } from 'redux'
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SELECT_CATEGORY,
  FETCH_READABLES_REQUEST,
  FETCH_READABLES_SUCCESS,
  FETCH_READABLES_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_READABLE_REQUEST,
  FETCH_READABLE_SUCCESS,
  FETCH_READABLE_FAILURE,
  UPVOTE_READABLE,
  // FETCH_READABLE_UPVOTE_REQUEST,
  FETCH_READABLE_UPVOTE_SUCCESS,
  // FETCH_READABLE_UPVOTE_FAILURE,
  DOWNVOTE_READABLE,
  // FETCH_READABLE_DOWNVOTE_REQUEST,
  FETCH_READABLE_DOWNVOTE_SUCCESS,
  // FETCH_READABLE_DOWNVOTE_FAILURE,
  UPVOTE_COMMENT,
  // FETCH_COMMENT_UPVOTE_REQUEST,
  FETCH_COMMENT_UPVOTE_SUCCESS,
  // FETCH_COMMENT_UPVOTE_FAILURE,
  DOWNVOTE_COMMENT,
  // FETCH_COMMENT_DOWNVOTE_REQUEST,
  FETCH_COMMENT_DOWNVOTE_SUCCESS,
  // FETCH_COMMENT_DOWNVOTE_FAILURE,
  SORT_READABLES_NEWEST,
  SORT_READABLES_OLDEST,
  SORT_READABLES_TOPVOTED,
  SORT_COMMENTS_NEWEST,
  SORT_COMMENTS_OLDEST,
  SORT_COMMENTS_TOPVOTED,
  FETCH_COMMENT_ADD_SUCCESS,
  FETCH_COMMENT_ADD_FAILURE
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
function selectedCategory(state, action) {
  if(!state) {
    state = 'all'
  }
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
  isFetching: false
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
    case FETCH_READABLE_UPVOTE_SUCCESS:
      let upvotedState = Object.assign({}, state)
      return upvotedState[action.id] = action.readable
    case FETCH_READABLE_DOWNVOTE_SUCCESS:
      let downvotedState = Object.assign({}, state)
      return downvotedState[action.id] = action.readable
    default:
      return state
  }
}

function readableById(state = {
  isFetching: false,
  lastUpdated: 0
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
    case UPVOTE_READABLE:
      // we might also want to update the value of voteCount for the matching readable (local copy)
      return state
    case FETCH_READABLE_UPVOTE_SUCCESS:
      let upvotedState = Object.assign({}, state)
      upvotedState[action.id] = {
        isFetching: false,
        lastUpdated: action.readable.timestamp,
        readable: action.readable
      }
      return upvotedState
    case DOWNVOTE_READABLE:
      return state // we might want to update the value of voteCount for the matching readable (local copy)
    case FETCH_READABLE_DOWNVOTE_SUCCESS:
      let downvotedState = Object.assign({}, state)
      downvotedState[action.id] = {
        isFetching: false,
        lastUpdated: action.readable.timestamp,
        readable: action.readable
      }
      return downvotedState
    default:
      return state
  }
}

function readablesByCategory(state = {
  isFetching: false,
  lastUpdated: 0
}, action) {
  switch (action.type) {
    case FETCH_READABLES_SUCCESS:
    case FETCH_READABLES_REQUEST:
      if (action.category) {
        let value = Object.assign({}, state, {
          [action.category]: readables(state[action.category], action),
        })
        if (!state.selectedCategory) {
          value.selectedCategory = action.category
        }
        return value
      }
      return state
    case SORT_READABLES_NEWEST:
      return Object.assign({}, state, {
          'order': SORT_READABLES_NEWEST
      })
    case SORT_READABLES_OLDEST:
      return Object.assign({}, state, {
        'order': SORT_READABLES_OLDEST
      })
    case SORT_READABLES_TOPVOTED:
      return Object.assign({}, state, {
        'order': SORT_READABLES_TOPVOTED
      })
    case FETCH_READABLE_UPVOTE_SUCCESS:
      let upvotedState = Object.assign({}, state)
      if(upvotedState[state.selectedCategory] &&
        upvotedState[state.selectedCategory].items) {
        upvotedState[state.selectedCategory].items[action.readable.id] = action.readable
      }
      return upvotedState
    case FETCH_READABLE_DOWNVOTE_SUCCESS:
      let downvotedState = Object.assign({}, state)
      if(downvotedState[state.selectedCategory] &&
        downvotedState[state.selectedCategory].items) {
        downvotedState[state.selectedCategory].items[action.readable.id] = action.readable
      }
      return downvotedState
    default:
      return state
  }
}

function comments(state = {
  isFetching: false
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
      const value =  Object.assign({}, state, {
        [action.readable]: comments(state[action.readable], action)
      })
      return value
    case UPVOTE_COMMENT:
      return state // we might want to update the value of voteCount for the matching comment (local copy)
    case FETCH_COMMENT_UPVOTE_SUCCESS:
      let upvotedState = Object.assign({}, state)
      upvotedState[action.comment.parentId].items[action.id] = action.comment
      return upvotedState
    case DOWNVOTE_COMMENT:
      return state // we might want to update the value of voteCount for the matching comment (local copy)
    case FETCH_COMMENT_DOWNVOTE_SUCCESS:
      let downvotedState = Object.assign({}, state)
      downvotedState[action.comment.parentId].items[action.id] = action.comment
      return downvotedState
    case SORT_COMMENTS_NEWEST:
      return Object.assign({}, state, {
        'order': SORT_COMMENTS_NEWEST
      })
    case SORT_COMMENTS_OLDEST:
      return Object.assign({}, state, {
        'order': SORT_COMMENTS_OLDEST
      })
    case SORT_COMMENTS_TOPVOTED:
      return Object.assign({}, state, {
        'order': SORT_COMMENTS_TOPVOTED
      })
    case FETCH_COMMENT_ADD_SUCCESS:
      console.log('state', state)
      console.log('action', action)
      let newState = Object.assign({}, state)
      newState[action.comment.parentId].items[action.comment.id] = action.comment
      return newState
    case FETCH_COMMENT_ADD_FAILURE:
      return state // need to update any fetching flags to false
    default:
      return state
  }
}

// root reducer
const reducer = combineReducers({
  allCategories,
  readablesByCategory,

  readableById,
  commentsByReadable,
  selectedCategory,
})

export default reducer