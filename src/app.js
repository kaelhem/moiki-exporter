import React, { useState, Fragment } from 'react'
import Header from './containers/header'
import Footer from './containers/footer'
import ForkMeOnGithub from 'fork-me-on-github'
import ContentLayout from './components/content-layout'
import Dropzone from './components/dropzone'
import kebabCase from 'lodash.kebabcase'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Button, Segment, Divider, Image } from 'semantic-ui-react'
import { version, convertToInk, convertToTwee, convertToJdrBot } from 'moiki-exporter'

const App = () => {
  const [story, setStory] = useState(null)
  const [error, setError] = useState(null)

  const importStory = async (data) => {
    setError(null)
    try {
      const zip = await JSZip.loadAsync(data)
      const fileContent = await zip.file('story.json').async('string')
      setStory(JSON.parse(fileContent))
    } catch (e) {
      setError({
        message: 'This file is not in the correct format!',
        kind: 'normal'
      })
    }
  }

  const getAuthor = () => {
    if (story && story.meta && story.meta.author) {
      const { firstname, lastname, pseudo } = story.meta.author
      return pseudo ? pseudo : firstname + ' ' + lastname
    }
    return null
  }

  const clear = () => {
    setError(null)
    setStory(null)
  }

  const exportStory = async (converter, ext) => {
    setError(null)
    try {
      const filename = kebabCase(story.meta.name)
      const zip = new JSZip()
      zip.file(filename + '.' + ext, converter(story))
      const blob = await zip.generateAsync({type: 'blob'})
      saveAs(blob, filename + '.zip')
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

  const jdrbotExport = () => {
    console.log(convertToJdrBot(story))
    //exportStory(convertToJdrBot, 'txt')
  }

  return (
    <div className="app">
      <Header />
      <ContentLayout render={({width, height}) => (
        <Fragment>
          { error && (
            <Segment style={{ position: 'absolute', top: 70, width: 500, textAlign: 'center' }} color='red'>
              { error.message }
              { error.kind !== 'normal' && (
                <Fragment>
                  <Divider />
                  <p>Please, consider opening an <a href="https://github.com/kaelhem/moiki-exporter/issues" target="_blank" rel="noopener noreferrer">issue on github</a> to help us improve this tool.</p>
                </Fragment>
              )}
            </Segment>
          )}
          <div style={{ width, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            { story ? (
              <Fragment>
                <div className="export-buttons">
                  <Segment>
                    { story.meta.image && (
                      <Image style={{maxHeight: 225, overflow: 'hidden'}} wrapped ui={false}>
                        <div className='cover' style={{ backgroundImage: 'url(' + story.meta.image + ')' }} />
                      </Image>
                    )}
                    <h2>{story.meta.name}</h2>
                    <div><em>A story by {getAuthor() || 'Unknown user'}</em></div>
                  </Segment>
                  <Button onClick={inkExport}>Export to Inkle's ink</Button>
                  <Button onClick={tweeHarloweExport}>Export to Twee (<em>Harlowe 3.1.0</em>)</Button>
                  <Button onClick={jdrbotExport}>Export to JDR-Bot</Button>
                  <Divider />
                  <Button onClick={clear}>Import another story</Button>
                </div>
                <div className="zip-warning">When you request one of these exports, a <em>.zip</em> file is generated and downloaded. With some browsers, you may receive an alert
                  stating "this file may be dangerous". Indeed, file extensions (.ink, .twee ...) are not often used on the Web. If you doubt our good
                  faith, but really want these exports, you can create and launch the webapp yourself by <a href="https://github.com/kaelhem/moiki-exporter/blob/website/README.md" target="_blank" rel="noopener noreferrer">following the instructions</a> of the github
                  project. There is nothing we can do to resolve this problem.</div>
              </Fragment>
            ) : (
              <div style={{ textAlign: 'center' }}> 
                <p>This tool allows you to export stories made with <a href="https://moiki.fr" target="_blank" rel="noopener noreferrer">Moiki</a> in different formats.</p>
                <a href="https://github.com/kaelhem/moiki-exporter" target="_blank" rel="noopener noreferrer"><em>Learn more about it</em></a>
                <Divider />
                <Dropzone
                  onDataLoaded={ importStory }
                  content={<p>Drop your story as <em>.zip</em> here</p>}
                />
              </div>
            )}
          </div>
        </Fragment>
      )} />
      <Footer {...{version}} />
      <ForkMeOnGithub
        colorBackground="#246b44"
        text="View source on GitHub"
        repo="https://github.com/kaelhem/moiki-exporter"
      />
    </div>
  )
}

export default App
