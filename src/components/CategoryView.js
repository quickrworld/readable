import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchReadables, selectCategory} from '../actions'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class CategoryView extends Component {
  handleChange(category) {
    this.props.selectCategory(category.path)
    this.props.fetchReadables(category.path)
  }

  render() {
    return (
      <div>
      <NavLink
        activeStyle={{textDecoration: 'none'}}
        to={{
          pathname: `/${this.props.category.path}/posts`,
          state: { category: this.props.category }
        }}>{this.props.category.name}</NavLink>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedCategory } = state
  return { selectedCategory }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCategory: (category) => dispatch(selectCategory(category)),
    fetchReadables: (category) => dispatch(fetchReadables(category))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryView))
