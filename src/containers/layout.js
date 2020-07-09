import React from 'react'
import { version } from 'moiki-exporter'
import ForkMeOnGithub from 'fork-me-on-github'
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '../constants'

const Layout = ({ children }) => {
  return (
    <div className="app">
      <div className="app-header" style={{ height: HEADER_HEIGHT }}>
        <div>Moiki Exporter</div>
      </div>
      <div className="content">
        { children }
      </div>
      <div className="app-footer" style={{ height: FOOTER_HEIGHT, overflowY: 'hidden' }}>
        <div>Moiki Exporter - v{version} {'//'} kaelhem ©2020</div>
      </div>
      <ForkMeOnGithub
        colorBackground="#246b44"
        text="View source on GitHub"
        repo="https://github.com/kaelhem/moiki-exporter"
        side="right"
      />
    </div>
  )
}

export default Layout //withSizes(sizes => sizes)(Layout)