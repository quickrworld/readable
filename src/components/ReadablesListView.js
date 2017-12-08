import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReadableView from './ReadableView'
import {fetchReadables, selectCategory} from '../actions'

class ReadablesListView extends Component {
  componentDidMount() {
    this.props.selectCategory(this.props.category)
    this.props.fetchReadables(this.props.category)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.selectedCategory !== nextProps.selectedCategory) {
      this.props.fetchReadables(nextProps.selectedCategory)
    }
  }

  render() {
    return (
      <div>
        {this.props.readables.readables.map((readable) => (
          <ReadableView key={readable.id} readable={readable}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { readablesByCategory } = state
  const selectedCategory = ownProps.category
  const readables = {
    isFetching: readablesByCategory[selectedCategory] && readablesByCategory[selectedCategory].isFetching,
    didInvalidate: readablesByCategory[selectedCategory] && readablesByCategory[selectedCategory].didInvalidate,
    lastUpdated: readablesByCategory[selectedCategory] && readablesByCategory[selectedCategory].lastUpdated,
    readables: readablesByCategory[selectedCategory]
      ? Object.keys(readablesByCategory[selectedCategory].items).reduce((readables, readable) => {
          readables.push(readablesByCategory[selectedCategory].items[readable])
          return readables
        }, [])
      : []
      }

  return { readables, selectedCategory }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCategory: (category) => dispatch(selectCategory(category)),
    fetchReadables: (category) => dispatch(fetchReadables(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadablesListView);
