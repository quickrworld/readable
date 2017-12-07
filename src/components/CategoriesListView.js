import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryView from './CategoryView'

class CategoryListView extends Component {
  render() {
    return (
      <div>
        {this.props.categories.categories.map((category) => (
          <CategoryView key={category.path} category={category}/>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { allCategories, selectedCategory } = state

  const categories = {
    isFetching: allCategories.isFetching,
    didInvalidate: allCategories.didInvalidate,
    lastUpdated: allCategories.lastUpdated,
    categories: Object.keys(allCategories.items).reduce((categories, category) => {
      categories.push(allCategories.items[category])
      return categories
    }, [])
  }

  return { categories, selectedCategory }
}

export default connect(mapStateToProps)(CategoryListView);
