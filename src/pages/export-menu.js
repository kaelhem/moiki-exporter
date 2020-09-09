import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { actions as pdfActions } from 'core/reducers/pdf'
import { Button, Segment, Divider, Image } from 'semantic-ui-react'
import { utils } from 'moiki-exporter'

const ExportMenu = (props) => {
  const {
    error,
    story,
    exportStory,
    clear,
    showPdfView,
    gotoPdfView
  } = props

  if (showPdfView) {
    return <Redirect to="/create-pdf" />
  }

  if (!story) {
    return <Redirect to="/" />
  }

  return !story ? (
    <Redirect to="/" />
  ) : (
    <Fragment>
      { error && (
        <Segment className="error-message" color='red'>
          { error }
          <Fragment>
            <Divider />
            <p>Please, consider opening an <a href="https://github.com/kaelhem/moiki-exporter/issues" target="_blank" rel="noopener noreferrer">issue on github</a> to help us improve this tool.</p>
          </Fragment>
        </Segment>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
          <Button onClick={() => exportStory('ink')}>Export to Inkle's ink</Button>
          <Button onClick={() => exportStory('harlowe')}>Export to Twee (<em>Harlowe 3.1.0</em>)</Button>
          <Button onClick={() => exportStory('sugarcube')}>Export to Twee (<em>SugarCube 2.31.1</em>)</Button>
          <Button onClick={() => exportStory('inform6')}>Export to Inform (<em>v6.33</em>)</Button>
          <Button onClick={() => exportStory('jdrbot')}>Export to JDR-Bot</Button>
          <Button onClick={() => gotoPdfView(true)}>Make PDF...</Button>
          <Divider />
          <Button onClick={clear}>Import another story</Button>
        </div>
        <div className="zip-warning">When you request one of these exports, a file is generated and downloaded. With some browsers, you may receive an alert
          stating "this file may be dangerous". Indeed, file extensions (.ink, .twee ...) are not often used on the Web. If you doubt our good
          faith, but really want these exports, you can create and launch the webapp yourself by <a href="https://github.com/kaelhem/moiki-exporter/blob/website/README.md" target="_blank" rel="noopener noreferrer">following the instructions</a> of the github
          project. There is nothing we can do to resolve this problem.</div>
      </div>
    </Fragment>
  )
}


const mapStateToProps = (state) => ({
  error: state.story.exportError,
  story: state.story.story,
  showPdfView: state.pdf.showView
})

const mapDispatchToProps = (dispatch) => ({
  exportStory: bindActionCreators(storyActions.export, dispatch),
  clear: bindActionCreators(storyActions.clear, dispatch),
  gotoPdfView: bindActionCreators(pdfActions.showView, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ExportMenu)