import React, { Component } from 'react'
import {fetchReadable} from "../actions"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"

class ReadableView extends Component {
  componentDidMount() {
    const id = this.props.id || ((this.props.readable) && this.props.readable.id)
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

function mapStateToProps(state) {
  const { readable, readableById  } = state
  return { readable, readableById }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchReadable: (id) => dispatch(fetchReadable(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableView));

