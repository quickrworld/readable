import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentView from './CommentView'
import {fetchComments, selectReadable} from "../actions"

class CommentsListView extends Component {
  componentDidMount() {
    // console.log("CommentsListView:DidMount:selectedReadable", this.props.selectedReadable)
    if(this.props.selectedReadable) {
      this.props.selectReadable(this.props.selectedReadable)
      this.props.fetchComments(this.props.selectedReadable)
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log("CommentsListView:WillReceiveProps:props:selectedReadable", this.props.selectedReadable)
    // console.log("CommentsListView:WillReceiveProps:nextProps:selectedReadable", nextProps.selectedReadable)
    if(this.props.selectedReadable !== nextProps.selectedReadable) {
      this.props.fetchComments(nextProps.selectedReadable)
    }
  }
  render() {
    return (
      <div>
        <div>Comments List View</div>
        <div>
          {this.props.comments.comments.map((comment) => (
            <CommentView key={comment.id} comment={comment}/>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { commentsByReadable, selectedReadable } = state
  const comments = selectedReadable
    ? {
        isFetching: commentsByReadable[selectedReadable] ? commentsByReadable[selectedReadable].isFetching : false,
        lastUpdated: commentsByReadable[selectedReadable] ? commentsByReadable[selectedReadable].lastUpdated : 0,
        comments: commentsByReadable[selectedReadable] &&
                  commentsByReadable[selectedReadable].items ?
                  Object.keys(commentsByReadable[selectedReadable].items).reduce((comments, comment) => {
                    comments.push(commentsByReadable[selectedReadable].items[comment])
                    return comments
                  }, []) : []
      }
    : {
        comments: []
      }

  return { comments, selectedReadable }
}

function mapDispatchToProps(dispatch) {
  return {
    selectReadable: (readable) => dispatch(selectReadable(readable)),
    fetchComments: (readable) => dispatch(fetchComments(readable))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsListView);
