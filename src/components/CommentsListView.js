import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentView from './CommentView'

class CommentsListView extends Component {
  render() {
    return (
      <div>
        {this.props.comments.comments.map((comment) => (
          <CommentView key={comment.id} comment={comment}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { commentsByReadable, selectedReadable } = state

  const comments = {
    isFetching: commentsByReadable[selectedReadable].isFetching,
    didInvalidate: commentsByReadable[selectedReadable].didInvalidate,
    lastUpdated: commentsByReadable[selectedReadable].lastUpdated,
    comments: Object.keys(commentsByReadable[selectedReadable].items).reduce((comments, comment) => {
      comments.push(commentsByReadable[selectedReadable].items[comment])
      return comments
    }, [])
  }

  return { comments, selectedReadable }
}

export default connect(mapStateToProps)(CommentsListView);
