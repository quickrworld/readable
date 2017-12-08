import React, { Component } from 'react'
import {fetchReadable} from "../actions"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"

class ReadableView extends Component {
  componentDidMount() {
    this.props.fetchReadable(this.props.id)
  }
  render() {
    return (
      <div>
        {this.props.id}
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
    fetchReadable: (id) => dispatch(fetchReadable(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableView));

