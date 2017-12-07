import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReadableView from './ReadableView'

class ReadablesListView extends Component {
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

function mapStateToProps(state) {
  const { readablesByCategory, selectedCategory } = state

  const readables = {
    isFetching: readablesByCategory[selectedCategory].isFetching,
    didInvalidate: readablesByCategory[selectedCategory].didInvalidate,
    lastUpdated: readablesByCategory[selectedCategory].lastUpdated,
    readables: Object.keys(readablesByCategory[selectedCategory].items).reduce((readables, readable) => {
      readables.push(readablesByCategory[selectedCategory].items[readable])
      return readables
    }, [])
  }

  return { readables, selectedCategory }
}

export default connect(mapStateToProps)(ReadablesListView);
