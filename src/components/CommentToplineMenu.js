import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sortCommentsNewest, sortCommentsOldest, sortCommentsTopvoted} from '../actions'

class CommentToplineMenu extends Component {
  render() {
    return (
      <div className="comment-top-line" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto minmax(min-content, min-content)',
        paddingBottom: '6px'}}>
        <div style={{gridColumnStart: '1', gridColumnEnd: '2'}}>
          <span onClick={this.props.sortNewest} style={{'cursor': 'pointer'}}>
            Newest</span> | <span onClick={this.props.sortOldest} style={{'cursor': 'pointer'}}>
            Oldest</span> | <span onClick={this.props.sortTopvoted} style={{'cursor': 'pointer'}}>
            Top voted</span>
          <hr/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortNewest: () => dispatch(sortCommentsNewest()),
    sortOldest: () => dispatch(sortCommentsOldest()),
    sortTopvoted: () => dispatch(sortCommentsTopvoted())
  }
}

export default connect(null, mapDispatchToProps)(CommentToplineMenu)
