import React, { useState, Fragment } from 'react'
import Header from './containers/header'
import Footer from './containers/footer'
import ForkMeOnGithub from 'fork-me-on-github'
import ContentLayout from './components/content-layout'
import Dropzone from './components/dropzone'
import kebabCase from 'lodash.kebabcase'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { BlobProvider } from '@react-pdf/renderer'
import { Button, Segment, Divider, Image, Message } from 'semantic-ui-react'
import {
  version,
  utils,
  convertToInk,
  convertToTwee,
  convertToJdrBot
} from 'moiki-exporter'
import { svgAsPngUri } from 'save-svg-as-png'
import { StoryAsPdf } from './pdf'

const App = () => {
  const [story, setStory] = useState(null)
  const [error, setError] = useState(null)
  const [pdfView, setPdfView] = useState(false)

  const generatePngIcons = async (storyData) => {
    const parser = new DOMParser()
    for (let asset of storyData.assets) {
      try {
        const svgString = decodeURIComponent(asset.icon.replace(/data:image\/svg\+xml,/g, ''))
        const doc = parser.parseFromString(svgString, 'image/svg+xml')
        const svgEl = doc.getElementsByTagName('svg')[0]
        const pngDataURI = await svgAsPngUri(svgEl, {excludeCss: true})
        asset.pngIcon = pngDataURI
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  const importStory = async (data) => {
    setError(null)
    try {
      const zip = await JSZip.loadAsync(data)
      const fileContent = await zip.file('story.json').async('string')
      const rawStory = JSON.parse(fileContent)
      await generatePngIcons(rawStory)
      setStory(rawStory)
    } catch (e) {
      setError({
        message: 'This file is not in the correct format!',
        kind: 'normal'
      })
    }
  }

  const clear = () => {
    setPdfView(false)
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
      console.log(e)
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

  const tweeSugarcubeExport = () => {
    const converter = s => convertToTwee(s, 'sugarcube')
    exportStory(converter, 'twee')
  }  

  const jdrbotExport = () => {
    exportStory(convertToJdrBot, 'txt')
  }

  const pdfExport = (blob, error) => {
    if (error) {
      setError(error)
      return
    }
    setError(null)
    try {
      const filename = kebabCase(story.meta.name)
      saveAs(blob, filename + '.pdf')
    } catch (e) {
      console.log(e)
      setError({ message: 'Oops, there is a bug :-(' })
    }
  }

  return (
    <div className="app">
      <Header />
      <ContentLayout render={({width, height}) => (
        <Fragment>
          { error && (
            <Segment className="error-message" color='red'>
              { error.message }
              { error.kind !== 'normal' && (
                <Fragment>
                  <Divider />
                  <p>Please, consider opening an <a href="https://github.com/kaelhem/moiki-exporter/issues" target="_blank" rel="noopener noreferrer">issue on github</a> to help us improve this tool.</p>
                </Fragment>
              )}
            </Segment>
          )}
          { pdfView ? (
            <div style={{ width, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <div className="export-buttons">
                <Message info style={{ width: 310, textAlign: 'left' }}>
                  <Message.Header>Warning</Message.Header>
                  This tool is an experiment. Depending on your story, you may experience unwanted behavior, including a browser crash. But if it works, you will love it!
                </Message>
                <BlobProvider document={<StoryAsPdf story={story} />}>
                  {({ blob, url, loading, error }) => (
                    <Button onClick={() => pdfExport(blob, error)} loading={loading}>Export to PDF</Button>
                  )}
                </BlobProvider>
                <Divider/>
                <Button onClick={() => setPdfView(false)}>Back</Button>
                <Button onClick={clear}>Import another story</Button>
              </div>
            </div>
          ) : (
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
                      <div><em>A story by {utils.getAuthor(story.meta)}</em></div>
                    </Segment>
                    <Button onClick={inkExport}>Export to Inkle's ink</Button>
                    <Button onClick={tweeHarloweExport}>Export to Twee (<em>Harlowe 3.1.0</em>)</Button>
                    <Button onClick={tweeSugarcubeExport}>Export to Twee (<em>SugarCube 2.31.1</em>)</Button>
                    <Button onClick={jdrbotExport}>Export to JDR-Bot</Button>
                    <Button onClick={() => setPdfView(true)}>Make PDF...</Button>
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
          )}
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
