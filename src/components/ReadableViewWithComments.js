import React, { Component } from 'react'
import {selectReadable, fetchReadable} from "../actions"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import CommentsListView from './CommentsListView'
import UpvoteReadableView from './UpvoteReadableView'
import DownvoteReadableView from './DownvoteReadableView'
import FaEdit from 'react-icons/lib/fa/edit'
import EditorView from './EditorView'

class ReadableViewWithComments extends Component {
  componentDidMount() {
    const id = this.props.id
    if(id) {
      this.props.selectReadable(id)
      this.props.fetchReadable(id)
    }
  }
  render() {
    const topLineStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingBottom: '6px',
    }
    const titleStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      fontSize: '18px',
      color: 'rgb(79, 79, 79)'
    }
    const editIconStyle = {
      fontSize: '12pt',
      color: 'rgb(79, 79, 79)'
    }
    const voteStyle = {
      whiteSpace: 'nowrap',
      color: 'rgb(79, 79, 79)'
    }
    const headlineStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      color: 'rgb(79, 79, 79)'
    }
    const storyStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      padding: '12px 0px 12px 0px',
      fontSize: '14px',
      borderBottom: '1px solid lightgray',
      color: 'rgb(79, 79, 79)'
    }
    const title = this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.title
    const author = this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.author
    const date = this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.timestamp && new Date(
      this.props.readableById[this.props.id].readable.timestamp).toDateString()
    const commentCount = this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.commentCount
    const voteScore = this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.voteScore
    const body = this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.body
    const readable = this.props.readableById[this.props.id]
    return (
      <div>
        <div className="top-line" style={topLineStyle}>
          <div style={titleStyle}>
            {title}
          </div>
          <div style={{
            gridColumnStart: '2',
            gridColumnEnd: '3',
            textAlign: 'right',
            alignContent: 'center'}}>
            <span style={editIconStyle}><span role={'img'} aria-label="">
              <button><FaEdit/></button></span> ︎</span>
          </div>
          <div style={headlineStyle}>
            {author} |
            {date} | <span style={{whiteSpace: 'nowrap'}}>{commentCount} Comments</span> |
            <span style={voteStyle}><span>{voteScore} votes </span>
              <span role={'img'} aria-label="Up vote">
                <UpvoteReadableView readable={readable}/>
              </span> <span role={'img'} aria-label="Down vote">
                <DownvoteReadableView readable={readable}/>
              </span>
            </span>
          </div>
          <div className="story" style={storyStyle}>
            {body}
          </div>
        </div>
        <div style={{gridRow:'2', gridColumnStart:'1', gridColumnEnd:'3'}}>
          <EditorView readable={this.props.id}/>
        </div>
        <CommentsListView selectedReadable={this.props.id}/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const selectedReadable = ownProps.id
  const { readable, readableById  } = state
  if(readable && readable.category) {
    return { selectedReadable, readable, readableById, category: readable.category }
  }
  return { selectedReadable, readable, readableById }
}

function mapDispatchToProps(dispatch) {
  return {
    selectReadable: (id) => dispatch(selectReadable(id)),
    fetchReadable: (id) => dispatch(fetchReadable(id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableViewWithComments));

