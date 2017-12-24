import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAddComment} from '../actions'
import {fetchEditComment} from '../actions'

class EditorView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      author: props.author,
      comment: props.story
    }
  }
  handleAuthorChange = (event) => {
    this.setState({author: event.target.value})
  }
  handleCommentChange = (event) => {
    this.setState({comment: event.target.value})
  }
  addComment = () => {
    if(!this.state.author || !this.state.comment) {
      return
    }
    this.props.addComment({
      readable: this.props.readable,
      author: this.state.author,
      comment: this.state.comment
    })
    this.props.fetchReadable(this.props.readable)
    // TODO
    if (this.props.close) {
      this.props.close()
    }
  }
  editComment = () => {
    if(!this.state.author || !this.state.comment) {
      return
    }
    this.props.editComment({
      id: this.props.id,
      readable: this.props.readable,
      author: this.state.author,
      comment: this.state.comment
    })
    // test code
    if (this.props.close) {
      this.props.close()
    }
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
          <input
            type="text"
            onChange={this.handleAuthorChange}
            name={'author'}
            placeholder={'Author'}
            value={this.state.author ? this.state.author : ''}
          />
        </div>
        <div style={{
          gridRow: '2',
          gridColumnStart: '1',
          gridColumnEnd: '5',
          paddingTop: '12px',
          marginRight: '12px'
        }}>
          <textarea
            onChange={this.handleCommentChange} name={'story'} rows={'5'} placeholder={'Your story'}
            value={this.state.comment ? this.state.comment : ''}
            style={{
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
          <button onClick={this.props.id ? this.editComment : this.addComment} style={{align:'right'}}>Comment</button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(fetchAddComment(data)),
    editComment: (data) => dispatch(fetchEditComment(data))
  }
}

export default connect(null, mapDispatchToProps)(EditorView)
