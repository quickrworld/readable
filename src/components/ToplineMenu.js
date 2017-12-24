import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sortReadablesNewest, sortReadablesOldest, sortReadablesTopvoted} from '../actions'
import ReadableEditorView from './ReadableEditorView'

class ToplineMenu extends Component {
  state = {
    editorOpen: false
  }
  openEditor = () => {
    this.setState({editorOpen: true})
  }
  closeEditor = () => {
    this.setState({editorOpen: false})
  }
  sortNewest = () => {
    this.props.sortNewest()
  }
  sortOldest = () => {
    this.props.sortOldest()
  }
  sortTopvoted = () => {
    this.props.sortTopvoted()
  }
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
          <span onClick={this.sortNewest} style={pointerStyle}>
            Newest</span> | <span onClick={this.sortOldest} style={pointerStyle}>
            Oldest</span> | <span onClick={this.sortTopvoted} style={pointerStyle}>
            Top voted</span>
          <hr/>
        </div>
        <div style={newReadableButtonStyle}>
          <button onClick={() => this.openEditor()} style={{borderWidth: '0px'}}>New Readable</button>
          <hr/>
        </div>
        <div style={{display: this.state.editorOpen ? 'block' : 'none', gridColumnStart:'1', gridColumnEnd: '5'}}>
          <ReadableEditorView
            close={this.closeEditor}
          />
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
