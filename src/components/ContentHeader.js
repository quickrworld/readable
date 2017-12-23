import React, { Component } from 'react'
import {connect} from "react-redux"

class ContentHeader extends Component {
  render() {
    const contentHeaderStyle = {
      backgroundColor: 'rgb(28,38,47)',
      boxShadow: 'rgba(0,0,0,0.5) 0px 2px 4px 0px',
      zIndex: '10',
      alignContent: 'baseline',
      textAlign: 'center',
      fontFamily: 'Open Sans',
      fontSize: '18px',
      color: 'rgb(255,255,255)',
      padding: '17px 12px 12px 12px',
      fontWeight: 200
    }
    return (
      <div id="content-header" style={contentHeaderStyle}>
        {this.props.category}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // if(state.readablesByCategory && state.readablesByCategory.selectedCategory) {
  //   if(state.readablesByCategory.selectedCategory === 'all') {
  //     return { 'category': 'All Categories' }
  //   }
  //   if(state.allCategories &&
  //     state.allCategories.items &&
  //     state.allCategories.items[state.readablesByCategory.selectedCategory]) {
  //     return  { 'category': state.allCategories.items[state.readablesByCategory.selectedCategory].name }
  //   }
  // }

  const { selectedCategory, allCategories } = state

  const category = ownProps.selectedCategory ? ownProps.selectedCategory : selectedCategory

  if (allCategories.items[category] && allCategories.items[category]) {
    return { 'category': allCategories.items[category].name }
  }
  if (allCategories.items[category]) {
    return { 'category': allCategories.items[category].name }
  }
  if(category === 'all') {
    return { 'category': 'All Categories' }
  }
  return { 'category': '' }
}

//export default withRouter(connect(mapStateToProps)(ContentHeader))
export default connect(mapStateToProps)(ContentHeader)

