import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CategoriesListView from './CategoriesListView'
import ReadablesListView from './ReadablesListView'
import {fetchCategories, fetchReadables, selectCategory} from '../actions'

import '../App.css'
import ReadableView from "./ReadableView";

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
            <ReadablesListView category={'all'}/>
          )}/>
          <Route exact={true} path={'/:category/posts'} render={({match}) => (
            <ReadablesListView category={match.params.category}/>
          )}/>
          <Route exact={true} path={'/posts/:id'} render={({match}) => (
            <ReadableView id={match.params.id}/>
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
