import React, { Component } from 'react'

class CommentView extends Component {
  render() {
    return (
      <div>
        <div>Comment View:</div>
        <div key={this.props.comment.id}>
          <div>{`Id: ${this.props.comment.id}`}</div>
          <div>{`Body: ${this.props.comment.body}`}</div>
        </div>
      </div>
    )
  }
}

export default CommentView
