import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { Grid, Divider } from 'semantic-ui-react'
import SelectField from 'components/select-field'
import ExportPageLayout from 'containers/export-page-layout'
import { convertToTwee } from 'moiki-exporter'
import './page-options.css'

const HARLOWE = 'harlowe'
const SUGARCUBE = 'sugarcube'

const FORMATS = [
  {label: 'Harlowe 3.1.0', value: HARLOWE},
  {label: 'SugarCube 2.31.1', value: SUGARCUBE}
]

const CreateTwine = (props) => {
  const {
    exportStory,
    story,
    match,
    location
  } = props

  const [format, setFormat] = useState(HARLOWE)
  const [file, setFile] = useState(null)

  useEffect(() => {
    setFile(story ? convertToTwee(story, format) : null)
  }, [story, format])

  const TwineOptionsPane = (props) => (
    <div className="export-buttons export-pane-options" style={{ width: 400, minHeight: 360, margin: 'auto' }}>
      <Grid columns={2}>
        <div>
          Twee is the format behind <a target="_blank" rel="noopener noreferrer" href="https://twinery.org/">Twine</a>.
          It will allows you to compile your moiki story to be Twine compatible with the help of <a target="_blank" rel="noopener noreferrer" href="http://www.motoslave.net/tweego/">TweeGO</a>.
          <br/><br/>
          Two story formats are supported : <br/>
          <b>Harlowe</b>, which is the default story-format used in Twine2.<br/>
          <b>SugarCube</b> that is the most used by Twee/Twine users.
          <br/>
        </div>
        <Divider style={{ width: '100%' }} />
        <SelectField
          label="Format"
          value={FORMATS.find(f => f.value === format).label}
          onChange={(value) => setFormat(FORMATS.find(f => f.label === value).value)}
          options={FORMATS.map(f => f.label)}
        />
      </Grid>
    </div>
  )

  const layoutProps = {
    story,
    match,
    location,
    leftPanes: [{ name: 'options', component: TwineOptionsPane}],
    rightPanes: file && [{ name: 'story.twee', showSource: {data: file} }],
    downloadButtonLabel: 'Download file',
    onDownload: () => exportStory(format)
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTwine)