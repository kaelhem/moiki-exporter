import React from 'react'
import withSizes from 'react-sizes'
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '../constants'

const ContentLayout = ({ width, height, render }) => {
  const sizes = {
    width,
    height: height - HEADER_HEIGHT - FOOTER_HEIGHT
  }
  return (
    <div className="content">
      { render(sizes) }
    </div>
  )
}

export default withSizes(sizes => sizes)(ContentLayout)