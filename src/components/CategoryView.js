import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class CategoryView extends Component {
  render() {
    const categoryStyle = {
      alignContent: 'center',
      height: '35px',
      borderBottom: '1px',
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: '100',
      color: 'rgba(255,255,255,.5)',
      padding: '11px 20px 0px 40px',}
    const navLinkStyle = {
      color: 'rgba(255,255,255,.5)',
      textDecoration: 'none',
    }
    const navLinkActiveStyle = {
      textDecoration: 'none',
      pointerEvents: 'none'
    }
    return (
      <div style={categoryStyle}>
      <NavLink
        style={navLinkStyle}
        activeStyle={navLinkActiveStyle}
        to={{
          pathname: `/${this.props.category.path}/posts`,
          state: { category: this.props.category }
        }}>{this.props.category.name}</NavLink>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedCategory } = state
  return { selectedCategory }
}

export default withRouter(connect(mapStateToProps)(CategoryView))
