import React, { Component } from 'react'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import {fetchCommentDownvote} from "../actions"
import {connect} from "react-redux"

class DownvoteCommentView extends Component {
  downvote = () => {
    this.props.downvoteComment(this.props.id)
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
    downvoteComment: (id) => dispatch(fetchCommentDownvote(id))
  }
}

export default connect(null, mapDispatchToProps)(DownvoteCommentView)