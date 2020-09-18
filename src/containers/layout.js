import React from 'react'
import { version } from 'moiki-exporter'
import ForkMeOnGithub from 'fork-me-on-github'
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '../constants'
import { withRouter } from 'react-router'

const ZipWarning = withRouter(({location}) => location.pathname === '/export' ? (
  <div className="zip-warning">When you request one of these exports, a file is generated and downloaded. With some browsers, you may receive an alert
    stating "this file may be dangerous". Indeed, file extensions (.ink, .twee ...) are not often used on the Web. If you doubt our good
    faith, but really want these exports, you can create and launch the webapp yourself by <a href="https://github.com/kaelhem/moiki-exporter/blob/website/README.md" target="_blank" rel="noopener noreferrer">following the instructions</a> of the github
    project. There is nothing we can do to resolve this problem.</div>
) : null)

const Layout = ({ children }) => {
  return (
    <div className="app">
      <div className="app-header" style={{ height: HEADER_HEIGHT }}>
        <div>Moiki Exporter</div>
      </div>
      <div className="content">
        { children }
      </div>
      <ZipWarning />
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

export default Layout