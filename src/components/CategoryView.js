import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class CategoryView extends Component {
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

export default withRouter(connect(mapStateToProps)(CategoryView))
