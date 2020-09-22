import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { Grid } from 'semantic-ui-react'
import ExportPageLayout from 'containers/export-page-layout'
import { convertToInk } from 'moiki-exporter'
import './page-options.css'

const CreateInk = (props) => {
  const {
    exportStory,
    story,
    match,
    location
  } = props

  const [file, setFile] = useState(null)

  useEffect(() => {
    setFile(story ? convertToInk(story, 'ink') : null)
  }, [story])

  const InkOptionsPane = (props) => (
    <div className="export-buttons export-pane-options" style={{ width: 400, minHeight: 360, margin: 'auto' }}>
      <Grid columns={2}>
        <div>
          Ink is the language of Inkle's Studio. Export your Moiki story in this format and open it with <a target="_blank" rel="noopener noreferrer" href="https://www.inklestudios.com/ink/">Inky</a>.
        </div>
      </Grid>
    </div>
  )

  const layoutProps = {
    story,
    match,
    location,
    leftPanes: [{ name: 'options', component: InkOptionsPane}],
    rightPanes: file && [{ name: 'story.ink', showSource: {data: file, options: {mode: 'text/x-ink'}} }],
    downloadButtonLabel: 'Download file',
    onDownload: () => exportStory('ink')
  }

  return (
    <ExportPageLayout {...layoutProps} />
  )
}

const mapStateToProps = (state) => ({
  pending: state.story.exportPending,
  error: state.story.exportError,
  story: state.story.story
})

const mapDispatchToProps = (dispatch) => ({
  exportStory: bindActionCreators(storyActions.export, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateInk)