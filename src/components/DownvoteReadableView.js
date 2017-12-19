import React, { Component } from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {fetchReadableDownvote} from "../actions"
import {connect} from "react-redux"

class DownvoteReadableView extends Component {
  downvote = () => {
    this.props.downvoteReadable(this.props.readable.readable.id)
  }
  render() {
    return (
      <span onClick={this.downvote} style={{cursor: 'pointer'}}>
        <FaThumbsODown/>
      </span>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    downvoteReadable: (id) => dispatch(fetchReadableDownvote(id))
  }
}

export default connect(null, mapDispatchToProps)(DownvoteReadableView)