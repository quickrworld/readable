import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAddReadable} from '../actions'
import {fetchEditReadable} from '../actions'

class ReadableEditorView extends Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      author: nextProps.author,
      category: nextProps.category,
      title: nextProps.title,
      story: nextProps.story
    })
  }
  addReadable = () => {
    if(!this.state.author || !this.state.story) {
      return
    }
    this.props.addReadable({
      category: this.state.category,
      author: this.state.author,
      body: this.state.story,
      title: this.state.title,
    })
    // TODO
    // success => close
    // failure => display message. Do not close. Provide a close button.
    // animate close
    if (this.props.close) {
      this.props.close()
    }
  }
  editReadable = () => {
    if(!this.state.author || !this.state.story) {
      return
    }
    this.props.editReadable({
      id: this.state.id,
      author: this.state.author,
      category: this.state.category,
      body: this.state.story,
      title: this.state.title,
    })
    // test code
    if (this.props.close) {
      this.props.close()
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      author: props.author,
      category: props.category,
      title: props.title,
      story: props.story
    }
  }
  handleAuthorChange = (event) => {
    this.setState({author: event.target.value});
  }
  handleCategoryChange = (event) => {
    this.setState({category: event.target.value});
  }
  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }
  handleStoryChange = (event) => {
    this.setState({story: event.target.value});
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
          gridColumnEnd: '5',
        }}>
          <span style={{paddingRight: '4px'}}>Authored by </span>
          <input
            type="text"
            onChange={this.handleAuthorChange}
            name={'author'}
            placeholder={'Author'}
            value={this.state.author ? this.state.author : ''}
          />
          <span style={{paddingLeft: '12px', paddingRight: '4px'}}>Category </span>
          <input
            type="text"
            onChange={this.handleCategoryChange}
            name={'category'}
            placeholder={'Category'}
            value={this.state.category ? this.state.category : ''}
          />
          <span style={{paddingLeft: '12px', paddingRight: '4px'}}>Title </span>
          <input
            type="text"
            onChange={this.handleTitleChange}
            name={'title'}
            placeholder={'Title'}
            value={this.state.title ? this.state.title : ''}
          />
        </div>
        <div style={{
          gridRow: '3',
          gridColumnStart: '1',
          gridColumnEnd: '5',
          paddingTop: '12px',
          marginRight: '12px'
        }}>
          <textarea
            onChange={this.handleStoryChange} name={'story'} rows={'5'} placeholder={'Your story'}
            value={this.state.story ? this.state.story : ''}
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
        <div style={{gridRow:'4', gridColumnStart:'4', justifySelf: 'end', paddingRight: '6px'}}>
          <button onClick={this.props.close} style={{align:'right'}}>Close</button>
          <button onClick={this.props.id ? this.editReadable : this.addReadable} style={{align:'right'}}>Submit</button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addReadable: (data) => dispatch(fetchAddReadable(data)),
    editReadable: (data) => dispatch(fetchEditReadable(data))
  }
}

export default connect(null, mapDispatchToProps)(ReadableEditorView)
