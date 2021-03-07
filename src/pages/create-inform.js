import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import ExportPageLayout from 'containers/export-page-layout'
import OptionsPane from './inform/options'
import { convertToInform } from 'moiki-exporter'
import windows1252 from 'windows-1252'
import './page-options.css'

const CreateInform = (props) => {
  const {
    settings,
    exportStory,
    story,
    match,
    location
  } = props

  const [files, setFiles] = useState(null)

  useEffect(() => {
    const files = story ? convertToInform(story, 'inform6', settings) : null
    setFiles(files)
  }, [story, settings])

  const withEncoding = (data) => {
    return settings.encoding === 'utf8' ? data : windows1252.encode(data, {'mode': 'html'})
  }

  const layoutProps = {
    story,
    match,
    location,
    leftPanes: [{ name: 'options', component: OptionsPane}],
    rightPanes: files && files.map(({filename, data}) => ({ name: filename, showSource: {data: withEncoding(data), options: {mode: 'text/x-inform6'}}})),
    downloadButtonLabel: 'Download files',
    onDownload: () => exportStory('inform6', settings)
  }

  return (
    <ExportPageLayout {...layoutProps} />
  )
}

const mapStateToProps = (state) => ({
  pending: state.story.exportPending,
  error: state.story.exportError,
  story: state.story.story,
  settings: state.inform.settings
})

const mapDispatchToProps = (dispatch) => ({
  exportStory: bindActionCreators(storyActions.export, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateInform)