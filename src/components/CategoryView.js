import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class CategoryView extends Component {
  render() {
    return (
      <NavLink
        activeStyle={{
          textDecoration: 'none',
          pointerEvents: 'none'
        }}
        to={{
          pathname: `/${this.props.category.path}/posts`,
          state: { category: this.props.category }
        }}>{this.props.category.name}</NavLink>
    )
  }
}

function mapStateToProps(state) {
  const { selectedCategory } = state
  return { selectedCategory }
}

export default withRouter(connect(mapStateToProps)(CategoryView))
