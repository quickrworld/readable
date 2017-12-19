import React, { Component } from 'react'
import UpvoteCommentView from './UpvoteCommentView'
import DownvoteCommentView from './DownvoteCommentView'
import FaEdit from 'react-icons/lib/fa/edit'

class CommentView extends Component {
  render() {
    return (
      <div>
        <div className="top-line" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto minmax(min-content, min-content)',
          paddingBottom: '6px',
        }}>
          <div style={{
            gridColumnStart: '1',
            gridColumnEnd: '2',
            color: 'rgb(79, 79, 79)',
            paddingTop: '12px'}}>
            {this.props.comment && this.props.comment.author && this.props.comment.author} |
            {this.props.comment && this.props.comment && new Date(this.props.comment.timestamp).toDateString()} |
            <span style={{whiteSpace: 'nowrap', color: 'rgb(79, 79, 79)'}}><span>
                {this.props.comment &&
                this.props.comment.voteScore} votes </span>
              <span role={'img'} aria-label="Up vote">
                <UpvoteCommentView id={this.props.comment.id} parent={this.props.comment.parentId}/>
              </span> <span role={'img'} aria-label="Down vote">
                <DownvoteCommentView id={this.props.comment.id} parent={this.props.comment.parentId}/>
              </span>
            </span>
          </div>
          <div style={{gridColumnStart: '2', gridColumnEnd: '3', textAlign: 'right', alignContent: 'center'}}>
            <span style={{fontSize: '12pt', color: 'rgb(79, 79, 79)'}}>
              <span role={'img'} aria-label="">
                <FaEdit/>
              </span>
            ︎</span>
          </div>
        </div>
        <div className="story"
             style={{gridColumnStart: '1', gridColumnEnd: '3', padding: '0px 0px 12px 0px', fontSize: '14px', borderBottom: '1px solid lightgray', color: 'rgb(79, 79, 79)'}}>
          {this.props.comment &&
          this.props.comment.body &&
          this.props.comment.body}
        </div>
      </div>
    )
  }
}

export default CommentView