import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoriesListView from './CategoriesListView'
import ReadablesListView from './ReadablesListView'
import {fetchCategories, fetchReadables, selectCategory} from '../actions'

import '../App.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.selectCategory(this.props.selectedCategory)
    this.props.fetchReadables(this.props.selectedCategory)
  }

  render() {
    return (
      <Router>
      <div>
        <CategoriesListView />
        <div>
          <Route exact={true} path={'/'} render={() => (
            <div>
              <div>Category: all</div>
              <ReadablesListView category={'all'}/>
            </div>
          )}/>
          <Route exact={true} path={'/:category/posts'} render={({match}) => (
            <div>
              <div>Category: {match.params.category}</div>
              <ReadablesListView category={match.params.category}/>
            </div>
          )}/>
        </div>
      </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  const { selectedCategory } = state
  return { selectedCategory }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    selectCategory: (category) => dispatch(selectCategory(category)),
    fetchReadables: (category) => dispatch(fetchReadables(category.path))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
