import React from 'react'
import { HEADER_HEIGHT } from '../constants'

const Header = ({version}) => (
  <div className="app-header" style={{ height: HEADER_HEIGHT }}>
    <div>Moiki Exporter</div>
  </div>
)

export default Header