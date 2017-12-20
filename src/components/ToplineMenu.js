import React, { Component } from 'react'
import {connect} from "react-redux";
import {sortReadablesNewest, sortReadablesOldest, sortReadablesTopvoted} from "../actions";

class ToplineMenu extends Component {
  render() {
    const topLineStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingBottom: '6px'
    }
    const sortLineStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '2'
    }
    const newReadableButtonStyle = {
      gridColumnStart: '2',
      gridColumnEnd: '3',
      textAlign: 'right'
    }
    const pointerStyle = {
      'cursor': 'pointer'
    }
    return (
      <div className="top-line" style={topLineStyle}>
        <div style={sortLineStyle}>
          <span onClick={this.props.sortNewest} style={pointerStyle}>
            Newest</span> | <span onClick={this.props.sortOldest} style={pointerStyle}>
            Oldest</span> | <span onClick={this.props.sortTopvoted} style={pointerStyle}>
            Top voted</span>
          <hr/>
        </div>
        <div style={newReadableButtonStyle}>
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
