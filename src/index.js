import React from 'react'
import ReactDOM from 'react-dom'

// polyfills !
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import App from './app'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
