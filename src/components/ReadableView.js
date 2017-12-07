import React, { Component } from 'react'

class ReadableView extends Component {
  render() {
    return (
      <div key={this.props.readable.id}>
        <p>{`Id: ${this.props.readable.id}`}</p>
        <p>{`Title: ${this.props.readable.title}`}</p>
      </div>
    )
  }
}

export default ReadableView
