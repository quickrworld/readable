import React, { Component } from 'react'
import {connect} from "react-redux";
import {sortReadablesNewest, sortReadablesOldest, sortReadablesTopvoted} from "../actions";

class ToplineMenu extends Component {
  render() {
    return (
      <div className="top-line" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto minmax(min-content, min-content)',
        paddingBottom: '6px'}}>
        <div style={{gridColumnStart: '1', gridColumnEnd: '2'}}>
          <span onClick={this.props.sortNewest} style={{'cursor': 'pointer'}}>
            Newest</span> | <span onClick={this.props.sortOldest} style={{'cursor': 'pointer'}}>
            Oldest</span> | <span onClick={this.props.sortTopvoted} style={{'cursor': 'pointer'}}>
            Top voted</span>
          <hr/>
        </div>
        <div style={{gridColumnStart: '2', gridColumnEnd: '3', textAlign: 'right'}}>
          New Readable
          <hr/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortNewest: () => dispatch(sortReadablesNewest()),
    sortOldest: () => dispatch(sortReadablesOldest()),
    sortTopvoted: () => dispatch(sortReadablesTopvoted())
  }
}

export default connect(null, mapDispatchToProps)(ToplineMenu)
