import React, { Component } from 'react'
import UpvoteCommentView from './UpvoteCommentView'
import DownvoteCommentView from './DownvoteCommentView'
import FaEdit from 'react-icons/lib/fa/edit'

class CommentView extends Component {
  render() {
    const topLineStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto minmax(min-content, min-content)',
      paddingBottom: '6px',
    }
    const commentHeadingStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '2',
      color: 'rgb(79, 79, 79)',
      alignContent: 'center',
      paddingTop: '12px'
    }
    const commentVoteLineStyle = {
      whiteSpace: 'nowrap',
      color: 'rgb(79, 79, 79)'
    }
    const editButtonStyle = {
      gridColumnStart: '2',
      gridColumnEnd: '3',
      textAlign: 'right',
      alignContent: 'center',
      paddingTop: '12px'
    }
    const editIconStyle = {
      fontSize: '12pt',
      color: 'rgb(79, 79, 79)'
    }
    const commentStoryStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '3',
      padding: '0px 0px 12px 0px',
      fontSize: '14px',
      borderBottom: '1px solid lightgray',
      color: 'rgb(79, 79, 79)'
    }
    return (
      <div>
        <div className="top-line" style={topLineStyle}>
          <div style={commentHeadingStyle}>
            {this.props.comment && this.props.comment.author && this.props.comment.author} |
            {this.props.comment && this.props.comment && new Date(this.props.comment.timestamp).toDateString()} |
            <span style={commentVoteLineStyle}><span>
                {this.props.comment &&
                this.props.comment.voteScore} votes </span>
              <span role={'img'} aria-label="Up vote">
                <UpvoteCommentView id={this.props.comment.id} parent={this.props.comment.parentId}/>
              </span> <span role={'img'} aria-label="Down vote">
                <DownvoteCommentView id={this.props.comment.id} parent={this.props.comment.parentId}/>
              </span>
            </span>
          </div>
          <div style={editButtonStyle}>
            <span style={editIconStyle}>
              <span role={'img'} aria-label="">
                <FaEdit/>
              </span>
            ︎</span>
          </div>
        </div>
        <div className="story" style={commentStoryStyle}>
          {this.props.comment &&
          this.props.comment.body &&
          this.props.comment.body}
        </div>
      </div>
    )
  }
}

export default CommentView