import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryView from './CategoryView'

class CategoryListView extends Component {
  render() {
    return (
      <div>
        <div><CategoryView category={{'name': 'All Categories', 'path':'all'}}/></div>
          {this.props.categories.categories.map((category) => (
            <div key={category.path} >
              <CategoryView
                category={category}
                active={category.path === this.props.selectedCategory}/>
            </div>
          ))}
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

export default connect(mapStateToProps)(CategoryListView)
