import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategoryView extends Component {
  render() {
    return (
      <div>{this.props.category.name}</div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedCategory } = state

  return { selectedCategory }
}

export default connect(mapStateToProps)(CategoryView);
