import React from 'react'
import { FOOTER_HEIGHT } from '../constants'

const Footer = ({version}) => (
  <div className="app-footer" style={{ height: FOOTER_HEIGHT }}>
    <div>Moiki Exporter - v{version} {'//'} kaelhem ©2020</div>
  </div>
)

export default Footer