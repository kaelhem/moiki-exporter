import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const mapStateToProps = (state) => ({
  story: state.story.story
})

export const RouteWithStory = connect(mapStateToProps)(({component: Component, ...props}) => {
  const { path, story, render } = props
  if( !story ){
    return <Redirect to="/" />
  }
  return (
    <Route path={ path } component={ Component } render={ render } />
  )
})

export const RouteWithoutStory = connect(mapStateToProps)(({component: Component, ...props}) => {
  const { path, story, render } = props
  if( story ){
    return <Redirect to="/export" />
  }
  return (
    <Route path={ path } component={ Component } render={ render } />
  )
})