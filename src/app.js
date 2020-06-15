import React from 'react'
import Header from './containers/header'
import ForkMeOnGithub from 'fork-me-on-github'
import ContentLayout from './components/content-layout'
import Dropzone from './components/dropzone'
import { saveAs } from 'file-saver'
import { Button, Label } from 'semantic-ui-react'

function App() {

  const importStory = (data) => {
    console.log(data)
    //console.log(String.fromCharCode.apply(null, new Uint16Array(data)));
  }

  return (
    <div className="app">
      <Header />
      <ContentLayout render={({width, height}) => (
        <div style={{ width, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Dropzone onDataLoaded={ importStory } />
        </div>
      )} />
      <ForkMeOnGithub repo="https://github.com/kaelhem/moiki-exporter" />
    </div>
  )
}

export default App
