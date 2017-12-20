import React, { Component } from 'react'
import {selectReadable, fetchReadable} from "../actions"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import CommentsListView from './CommentsListView'
import UpvoteReadableView from './UpvoteReadableView'
import DownvoteReadableView from './DownvoteReadableView'
import FaEdit from 'react-icons/lib/fa/edit'

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
    return (
      <div>
        <div className="top-line" style={topLineStyle}>
          <div style={titleStyle}>
            {this.props.readableById &&
            this.props.readableById[this.props.id] &&
            this.props.readableById[this.props.id].readable &&
            this.props.readableById[this.props.id].readable.title}
          </div>
          <div style={{
            gridColumnStart: '2',
            gridColumnEnd: '3',
            textAlign: 'right',
            alignContent: 'center'}}>
            <span style={editIconStyle}><span role={'img'} aria-label=""><FaEdit/></span> ︎</span>
          </div>
          <div style={headlineStyle}>
            {this.props.readableById &&
            this.props.readableById[this.props.id] &&
            this.props.readableById[this.props.id].readable &&
            this.props.readableById[this.props.id].readable.author} |
            {this.props.readableById &&
            this.props.readableById[this.props.id] &&
            this.props.readableById[this.props.id].readable &&
            this.props.readableById[this.props.id].readable.timestamp && new Date(
              this.props.readableById[this.props.id].readable.timestamp).toDateString()} | <span style={{whiteSpace: 'nowrap'}}>
              {this.props.readableById &&
              this.props.readableById[this.props.id] &&
              this.props.readableById[this.props.id].readable &&
              this.props.readableById[this.props.id].readable.commentCount} Comments</span> |
            <span style={voteStyle}><span>
              {this.props.readableById &&
              this.props.readableById[this.props.id] &&
              this.props.readableById[this.props.id].readable &&
              this.props.readableById[this.props.id].readable.voteScore} votes </span>
              <span role={'img'} aria-label="Up vote">
                <UpvoteReadableView readable={this.props.readableById[this.props.id]}/>
              </span> <span role={'img'} aria-label="Down vote">
                <DownvoteReadableView readable={this.props.readableById[this.props.id]}/>
              </span>
            </span>
          </div>
          <div className="story"
               style={storyStyle}>
            {this.props.readableById &&
            this.props.readableById[this.props.id] &&
            this.props.readableById[this.props.id].readable &&
            this.props.readableById[this.props.id].readable.body}
          </div>
        </div>
        <CommentsListView selectedReadable={this.props.id}/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const selectedReadable = ownProps.id
  const { readable, readableById  } = state
  return { selectedReadable, readable, readableById }
}

function mapDispatchToProps(dispatch) {
  return {
    selectReadable: (id) => dispatch(selectReadable(id)),
    fetchReadable: (id) => dispatch(fetchReadable(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableViewWithComments));

