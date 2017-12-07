import React, { Component } from 'react'
import CategoriesListView from './CategoriesListView'
import ReadablesListView from './ReadablesListView'
import CommentsListView from './CommentsListView'
import '../App.css'

class App extends Component {
  render() {
    return (
      <div>
        <CategoriesListView/>
        <ReadablesListView/>
        <CommentsListView/>
      </div>
    )
  }
}

export default App
