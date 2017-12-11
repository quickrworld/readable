import React, { Component } from 'react'

class CommentView extends Component {
  componentWillMount() {
    console.log("CommentView will mounted", this.props)
  }
  componentWillReceiveProps(nextProps) {
    console.log("CommentView will receive props", nextProps)
  }
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
