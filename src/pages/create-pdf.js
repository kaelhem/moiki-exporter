import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { actions as pdfActions } from 'core/reducers/pdf'
import { Button, Divider, Icon, Select, Dimmer, Loader, Grid } from 'semantic-ui-react'
import NumberInput from 'semantic-ui-react-numberinput'
import { generatePdfStream } from '../pdf/convert-to-pdfkit'
import { saveAs } from 'file-saver'
import kebabCase from 'lodash.kebabcase'
import './create-pdf.css'

const SelectField = ({ label, value, options, onChange }) => {
  const opts = options.map(opt => {
    if (typeof opt === 'string') {
      return {key: opt, value: opt, text: opt}
    }
    return opt
  })
  return (
    <Grid.Row>
      <Grid.Column width={6} className="field-label">
        <b>{ label }</b>
      </Grid.Column>
      <Grid.Column width={10}>
        <Select
          fluid
          style={{ flexGrow: 1, width: 'auto' }}
          value={ value }
          onChange={(_, opt) => onChange(opt.value)} 
          options={opts}
        />
      </Grid.Column>
    </Grid.Row>
  )
}

const NumberField = ({ label, value, min, max, onChange }) => {
  return (
    <Grid.Row>
      <Grid.Column width={6} className="field-label">
        <b>{ label }</b>
      </Grid.Column>
      <Grid.Column width={10}>
        <NumberInput
          className="number-input"
          value={value.toString()}
          onChange={(value) => onChange(parseInt(value))}
          minValue={min}
          maxValue={max}
          allowMouseWheel={true}
        />
      </Grid.Column>
    </Grid.Row>
  )
}

const CreatePdf = (props) => {
  const {
    showPdfView,
    pdfSettings,
    updateSettings,
    story,
    clear,
    exitPdfView,
    resetDefault
  } = props

  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [iframeSrc, setIframeSrc] = useState(null)
  const [blob, setBlob] = useState(null)

  const convertToPdf = async (pdfData=null) => {
    setGeneratingPdf(true)
    const {stream, pageLinksMap, sequencesShuffle} = await generatePdfStream(story, pdfSettings, pdfData)
    const onStreamFinished = () => {
      setBlob(stream.toBlob('application/pdf'))
      const url = stream.toBlobURL('application/pdf')
      setIframeSrc(url)
      stream.off('finish', onStreamFinished)
      if (!pdfData) {
        convertToPdf({pageLinksMap, sequencesShuffle})
      } else {
        setGeneratingPdf(false)
      }
    }
    stream.on('finish', onStreamFinished)
  }

  useEffect(() => {
    convertToPdf()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const downloadPdf = () => {
    saveAs(blob, kebabCase(story.meta.name) + '.pdf')
  }

  if (!story) {
    return <Redirect to="/" />
  }

  if (!showPdfView) {
    return <Redirect to="/export" />    
  }

  return (
    <div className="two-columns-view">
      <div className="divided-panel">
        <div className="export-buttons" style={{ width: 400 }}>
          <Dimmer active={generatingPdf} inverted>
            <Loader>Generating PDF...</Loader>
          </Dimmer>
          <Divider horizontal style={{ marginBottom: 25 }}>Settings</Divider>
          <Grid columns={2}>
            <SelectField
              label="Page format"
              value={pdfSettings.format}
              onChange={(value) => updateSettings({...pdfSettings, format: value})}
              options={['A4', 'A5', 'LETTER', 'FOLIO']}
            />
            <SelectField
              label="Font family"
              value={pdfSettings.font}
              onChange={(value) => updateSettings({...pdfSettings, font: value})}
              options={[
                {key: 'courier', value: 'courier', text: 'Courier'},
                {key: 'helvetica', value: 'helvetica', text: 'Helvetica'},
                {key: 'times', value: 'times', text: 'Times New Roman'},
                {key: 'catamaran', value: 'catamaran*', text: 'Catamaran'},
                {key: 'comfortaa', value: 'comfortaa*', text: 'Comfortaa'},
                {key: 'muli', value: 'muli*', text: 'Muli'},
                {key: 'roboto', value: 'roboto*', text: 'Roboto'}
              ]}
            />
            <NumberField
              label="Font size"
              value={pdfSettings.fontSize}
              onChange={(value) => updateSettings({...pdfSettings, fontSize: value})}
              min={10}
              max={20}
            />
            <NumberField
              label="Horizontal margins"
              value={pdfSettings.margins.left}
              onChange={(value) => updateSettings({...pdfSettings, margins: { ...pdfSettings.margins, left: value, right: value}})}
              min={20}
              max={100}
            />
            <NumberField
              label="Vertical margins"
              value={pdfSettings.margins.top}
              onChange={(value) => updateSettings({...pdfSettings, margins: { ...pdfSettings.margins, top: value, bottom: value}})}
              min={20}
              max={100}
            />
          </Grid>
          <Button onClick={resetDefault} style={{ marginTop: 15 }}>
            <Icon name='repeat' /> Reset default settings
          </Button>
          <Button onClick={() => convertToPdf()} color="green">
            <Icon name='sync' /> Update changes...
          </Button>
          <Button onClick={downloadPdf} color="green">
            <Icon name='download' /> Download file
          </Button>
          <Divider/>
          <Button onClick={() => exitPdfView()}>Back</Button>
          <Button onClick={clear}>Import another story</Button>
        </div>
      </div>
      <div className="divided-panel" style={{ borderLeft: '2px rgb(79, 82, 85) solid'}}>
        <iframe download="MyFilaname" title='generated PDF' style={{ boxShadow: 'none', border: 'none', width: '100%', height: '100%' }} src={iframeSrc} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  pending: state.story.exportPending,
  error: state.story.exportError,
  story: state.story.story,
  pdfSettings: state.pdf.settings,
  showPdfView: state.pdf.showView
})

const mapDispatchToProps = (dispatch) => ({
  updateSettings: bindActionCreators(pdfActions.updateSettings, dispatch),
  exportStory: bindActionCreators(storyActions.export, dispatch),
  clear: bindActionCreators(storyActions.clear, dispatch),
  exitPdfView: bindActionCreators(pdfActions.showView, dispatch),
  resetDefault: bindActionCreators(pdfActions.resetDefault, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(CreatePdf)