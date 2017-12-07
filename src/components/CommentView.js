import React, { Component } from 'react'

class CommentView extends Component {
  render() {
    return (
      <div key={this.props.comment.id}>
        <p>{`Id: ${this.props.comment.id}`}</p>
        <p>{`Body: ${this.props.comment.body}`}</p>
      </div>
    )
  }
}

export default CommentView
