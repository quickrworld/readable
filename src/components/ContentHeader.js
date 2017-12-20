import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
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
  const { selectedCategory, allCategories  } = state

  if (allCategories.items[ownProps.selectedCategory] &&
      allCategories.items[selectedCategory]) {
    return { 'category': allCategories.items[selectedCategory].name }
  }
  if (allCategories.items[selectedCategory]) {
    return { 'category': allCategories.items[selectedCategory].name }
  }
  if(selectedCategory === 'all') {
    return { 'category': 'All Categories' }
  }
  return { 'category': 'No category selected' }
}

export default withRouter(connect(mapStateToProps)(ContentHeader));

