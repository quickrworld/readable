export const INVALIDATE_CATEGORIES = 'INVALIDATE_CATEGORIES'
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'
export const FETCH_READABLES_REQUEST = 'FETCH_READABLES_REQUEST'
export const FETCH_READABLES_SUCCESS = 'FETCH_READABLES_SUCCESS'
export const FETCH_READABLES_FAILURE = 'FETCH_READABLES_FAILURE'

// Categories
export function fetchCategoriesRequest() {
  return {
    type: FETCH_CATEGORIES_REQUEST
  }
}

export function fetchCategoriesSuccess(response) {
  console.log("response",response)
  const categories = response.categories.reduce((categories, category) => {
    console.log("category", category)
    categories[category.name] = category
    return categories
  }, {})
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories,
    receivedAt: Date.now()
  }
}

export function fetchCategoriesFailure(response) {
  const status = response // TODO: extract status from response
  return {
    type: FETCH_CATEGORIES_FAILURE,
    status
  }
}

export function fetchCategories() {
  return function (dispatch) {
    dispatch(fetchCategoriesRequest())
    const url = 'http://localhost:3001/categories'
    return fetch(
      url, {
        headers: {
          authorization: 'quickrworld'
        }
      }
    )
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(
      json => json
              ? dispatch(fetchCategoriesSuccess(json))
              : dispatch(fetchCategoriesFailure(json))
    )
  }
}

// Readables
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}

export function fetchReadablesRequest(category) {
  return {
    type: FETCH_READABLES_REQUEST,
    category
  }
}

export function fetchReadablesSuccess(category, response) {
  const readables = response.reduce((readables, readable) => {
    readables[readable.id] = readable
    return readables
  }, {})
  return {
    type: FETCH_READABLES_SUCCESS,
    category,
    readables,
    receivedAt: Date.now()
  }
}

export function fetchReadablesFailure(category, response) {
  const status = response // TODO: extract status from response
  return {
    type: FETCH_READABLES_FAILURE,
    category,
    status
  }
}

export function fetchReadables(category) {
  return function (dispatch) {
    dispatch(fetchReadablesRequest(category))
    const url = (category === 'all')
                ? 'http://localhost:3001/posts'
                : `http://localhost:3001/${category}/posts`
    return fetch(
      url, {
        headers: {
          authorization: 'quickrworld'
        }
      }
    )
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(
      json => json
              ? dispatch(fetchReadablesSuccess(category, json))
              : dispatch(fetchReadablesFailure(category, json))
    )
  }
}
