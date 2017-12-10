import React, { Component } from 'react'
import {selectReadable, fetchReadable} from "../actions"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"

class ReadableView extends Component {
  componentDidMount() {
    const id = this.props.id || ((this.props.readable) && this.props.readable.id)
    this.props.selectReadable(id)
    this.props.fetchReadable(id)
  }
  render() {
    return (
      <div>
        <p>this.props.id: {this.props.id}</p>
        <p>this.props.readable.readable.id: this.props.readable.readable.id}</p>
        <p>this.props.readableById[]: {
          this.props.readableById &&
          this.props.readableById[this.props.id] &&
          this.props.readableById[this.props.id].readable.id}</p>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const selectedReadable = ownProps.id
  const { readable, readableById  } = state
  return { selectedReadable, readable, readableById }
}

function mapDispatchToProps(dispatch) {
  return {
    selectReadable: (id) => dispatch(selectReadable(id)),
    fetchReadable: (id) => dispatch(fetchReadable(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableView));

