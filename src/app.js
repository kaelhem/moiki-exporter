import React, { useState, Fragment } from 'react'
import Header from './containers/header'
import Footer from './containers/footer'
import ForkMeOnGithub from 'fork-me-on-github'
import ContentLayout from './components/content-layout'
import Dropzone from './components/dropzone'
import kebabCase from 'lodash.kebabcase'
import { saveAs } from 'file-saver'
import { Button, Segment, Divider } from 'semantic-ui-react'
import { version, convertToInk, convertToTwee } from 'moiki-exporter'

const App = () => {
  const [story, setStory] = useState(null)
  const [error, setError] = useState(null)

  const importStory = (data) => {
    setError(null)
    try {
      setStory(JSON.parse(data))
    } catch (e) {
      setError({
        message: 'This file is not in the correct format!',
        kind: 'normal'
      })
    }
  }

  const clear = () => {
    setError(null)
    setStory(null)
  }

  const exportStory = (converter, ext) => {
    setError(null)
    try {
      const blob = new Blob([converter(story)])
      saveAs(blob, kebabCase(story.meta.name) + '.' + ext)
    } catch (e) {
      setError({ message: 'Oops, there is a bug :-(' })
    }
  }

  const inkExport = () => {
    exportStory(convertToInk, 'ink')
  }

  const tweeHarloweExport = () => {
    const converter = s => convertToTwee(s, 'harlowe')
    exportStory(converter, 'twee')
  }

  return (
    <div className="app">
      <Header />
      <ContentLayout render={({width, height}) => (
        <Fragment>
          { error && (
            <Segment style={{ position: 'absolute', bottom: 10, width: 500, textAlign: 'center' }} color='red'>
              { error.message }
              { error.kind !== 'normal' && (
                <Fragment>
                  <Divider />
                  <p>Please, consider adding an <a href="https://github.com/kaelhem/moiki-exporter/issues" target="_blank" rel="noopener noreferrer">issue on github</a> to help us improve this tool</p>
                </Fragment>
              )}
            </Segment>
          )}
          <div style={{ width, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            { story ? (
              <div className="export-buttons">
                <Button onClick={inkExport}>Export to Inkle's ink</Button>
                <Button onClick={tweeHarloweExport}>Export to Twee (<em>Harlowe 3.1.0</em>)</Button>
                <Divider />
                <Button onClick={clear}>Import another story</Button>
              </div>
            ) : (
              <Dropzone
                onDataLoaded={ importStory }
                content={<p>Drop your story as .json here</p>}
              />
            )}
          </div>
        </Fragment>
      )} />
      <Footer {...{version}} />
      <ForkMeOnGithub repo="https://github.com/kaelhem/moiki-exporter" />
    </div>
  )
}

export default App
