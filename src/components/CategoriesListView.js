import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryView from './CategoryView'
import { withRouter } from 'react-router-dom'

class CategoryListView extends Component {
  render() {
    return (
      <div>
        <div>Categories List View</div>
          {this.props.categories.categories.map((category) => (
            <div key={category.path} >
              <CategoryView category={category}/>
            </div>
          ))}
        <hr/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { allCategories, selectedCategory } = state
  const categories = {
    isFetching: allCategories.isFetching,
    lastUpdated: allCategories.lastUpdated,
    categories: Object.keys(allCategories.items).reduce((categories, category) => {
      categories.push(allCategories.items[category])
      return categories
    }, [])
  }
  return { categories, selectedCategory }
}

export default withRouter(connect(mapStateToProps)(CategoryListView))
