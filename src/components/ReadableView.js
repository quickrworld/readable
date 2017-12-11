import React, { Component } from 'react'
import {selectReadable, fetchReadable} from "../actions"
import CommentsListView from "./CommentsListView"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"

class ReadableView extends Component {
  componentDidMount() {
    const id = this.props.id
    if(id) {
      this.props.selectReadable(id)
      this.props.fetchReadable(id)
    }
  }
  render() {
    return (
      <div>
        <div>Readable View</div>
        <div>Id: {
          this.props.readableById &&
          this.props.readableById[this.props.id] &&
          this.props.readableById[this.props.id].readable &&
          this.props.readableById[this.props.id].readable.id}</div>
        <div>Title: {
          this.props.readableById &&
          this.props.readableById[this.props.id] &&
          this.props.readableById[this.props.id].readable &&
          this.props.readableById[this.props.id].readable.title}</div>
        <div>Category: {
          this.props.readableById &&
          this.props.readableById[this.props.id] &&
          this.props.readableById[this.props.id].readable &&
          this.props.readableById[this.props.id].readable.category}</div>
        <CommentsListView selectedReadable={this.props.id}/>
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

