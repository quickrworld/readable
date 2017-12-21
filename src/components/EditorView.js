import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAddComment} from '../actions'

class EditorView extends Component {
  addComment = () => {
    this.props.addComment({readable: this.props.readable, author: this.authorInput.value, comment: this.commentTextArea.value})
  }
  render() {
    const editorStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingTop: '12px',
      paddingBottom: '24px',
    }
    return (
      <div style={editorStyle}>
        <div style={{
          gridRow: '1',
          gridColumnStart: '1',
          gridColumnEnd: '3',
        }}><span style={{paddingRight: '4px'}}>Comment as </span>
          <input ref={(input) => {this.authorInput = input}} type={'text'} name={'author'} placeholder={'Your name'}>
          </input>
        </div>
        <div style={{
          gridRow: '2',
          gridColumnStart: '1',
          gridColumnEnd: '5',
          paddingTop: '12px',
          marginRight: '12px'
        }}>
          <textarea ref={(textarea) => {this.commentTextArea = textarea}} rows={'5'} placeholder={'Your comment'} style={{
              border: '1px solid lightgray',
              overflowY: 'auto',
              width: '100%',
              outline: 'none',
              boxShadow: 'none',
              resize: 'none'
          }}>
          </textarea>
        </div>
        <div style={{gridRow:'3', gridColumnStart:'4', justifySelf: 'end', paddingRight: '6px'}}>
          <button onClick={this.addComment} style={{align:'right'}}>Comment</button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(fetchAddComment(data))
  }
}

export default connect(null, mapDispatchToProps)(EditorView)
