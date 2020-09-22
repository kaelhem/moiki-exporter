import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { Grid } from 'semantic-ui-react'
import ExportPageLayout from 'containers/export-page-layout'
import { convertToJdrBot } from 'moiki-exporter'
import './page-options.css'

const CreateJdrBot = (props) => {
  const {
    exportStory,
    story,
    match,
    location
  } = props

  const [file, setFile] = useState(null)

  useEffect(() => {
    setFile(story ? convertToJdrBot(story) : null)
  }, [story])

  const OptionsPane = (props) => (
    <div className="export-buttons export-pane-options" style={{ width: 400, minHeight: 360, margin: 'auto' }}>
      <Grid columns={2}>
        <div>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Cyril-Fiesta/jdr-bot">JDR-Bot</a> is a french discord bot that allows teams to play roleplay games. This export will allows you to transform your Moiki story in a scenario for this bot.
        </div>
      </Grid>
    </div>
  )

  const layoutProps = {
    story,
    match,
    location,
    leftPanes: [{ name: 'options', component: OptionsPane}],
    rightPanes: file && [{ name: 'story.ink', showSource: {data: file} }],
    downloadButtonLabel: 'Download file',
    onDownload: () => exportStory('jdrbot')
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateJdrBot)