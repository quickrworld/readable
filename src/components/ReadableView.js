import React, { Component } from 'react'
import {selectReadable, fetchReadable} from '../actions'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import FaEdit from 'react-icons/lib/fa/edit'
import UpvoteReadableView from './UpvoteReadableView'
import DownvoteReadableView from './DownvoteReadableView'
import { NavLink } from 'react-router-dom'
import ReadableEditorView from './ReadableEditorView'

class ReadableView extends Component {
  state = {
    editorOpen: false
  }
  openEditor = () => {
    this.setState({editorOpen: true})
  }
  closeEditor = () => {
    this.setState({editorOpen: false})
  }
  componentDidMount() {
    const id = this.props.id
    if(id) {
      this.props.selectReadable(id)
      this.props.fetchReadable(id)
    }
  }
  render() {
    const id=this.props.id
    const author = (this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.author)
    const title=(this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.title)
    const story=(this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.body)
    const category=(this.props.readableById &&
      this.props.readableById[this.props.id] &&
      this.props.readableById[this.props.id].readable &&
      this.props.readableById[this.props.id].readable.category)
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
      gridColumnStart: '2',
      gridColumnEnd: '3',
      textAlign: 'right',
      alignContent: 'center'
    }
    const editLabelStyle = {
      fontSize: '12pt',
      color: 'rgb(79, 79, 79)'
    }
    const voteStyle = {
      whiteSpace: 'nowrap',
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
    const headlineStyle = {
      gridColumnStart: '1',
      gridColumnEnd: '2',
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
          <div style={editIconStyle}>
            <span style={editLabelStyle}>
              <button onClick={() => this.openEditor()} style={{borderWidth: '0px'}}>
                <FaEdit/>
              </button>
            </span>
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
                <UpvoteReadableView readable={this.props.readableById[this.props.id]}/> </span>
              <span role={'img'} aria-label="Down vote">
                <DownvoteReadableView readable={this.props.readableById[this.props.id]}/> </span>
            </span>
          </div>
          <div className="story" style={storyStyle}>
            <NavLink
              style={{textDecoration: 'none'}}
              activeStyle={{textDecoration: 'none'}}
              to={{
                pathname: `/posts/${this.props.id}`,
              }}>
              {this.props.readableById &&
                this.props.readableById[this.props.id] &&
                this.props.readableById[this.props.id].readable &&
                this.props.readableById[this.props.id].readable.body}
            </NavLink>
          </div>
        </div>
        <div style={{
          display: this.state.editorOpen ? 'block' : 'none',
          gridColumnStart:'1', gridColumnEnd: '5', borderBottom: '1px solid lightgray', marginBottom: '12px'}}>
          <ReadableEditorView
            id={id}
            author={author}
            title={title}
            story={story}
            category={category}
            close={this.closeEditor}/>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadableView));

