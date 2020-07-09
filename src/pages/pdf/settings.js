import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as pdfActions } from 'core/reducers/pdf'
import { Button, Icon, Select, Grid, Radio } from 'semantic-ui-react'
import NumberInput from 'semantic-ui-react-numberinput'

const Settings = (props) => {

  const {
    pdfSettings,
    updateSettings,
    resetDefault
  } = props

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

  const NumberField = ({ label, value, min, max, dblClickStep, onChange }) => {
    return (
      <Grid.Row>
        <Grid.Column width={6} className="field-label">
          <b>{ label }</b>
        </Grid.Column>
        <Grid.Column width={10}>
          <NumberInput
            className="number-input"
            value={value.toString()}
            onChange={(newValue) => {
              if (newValue !== value.toString()) {
                onChange(parseInt(newValue))
              }
            }}
            minValue={min}
            maxValue={max}
            doubleClickStepAmount={dblClickStep}
          />
        </Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <div className="export-buttons" style={{ width: 400, minHeight: 360, margin: 'auto' }}>
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
          dblClickStep={2}
        />
        <NumberField
          label="Horizontal margins"
          value={pdfSettings.margins.left}
          onChange={(value) => updateSettings({...pdfSettings, margins: { ...pdfSettings.margins, left: value, right: value}})}
          min={20}
          max={100}
          dblClickStep={5}
        />
        <NumberField
          label="Vertical margins"
          value={pdfSettings.margins.top}
          onChange={(value) => updateSettings({...pdfSettings, margins: { ...pdfSettings.margins, top: value, bottom: value}})}
          min={20}
          max={100}
          dblClickStep={5}
        />
        <Radio
          toggle
          label="Avoid page break on paragraphs"
          defaultChecked={pdfSettings.avoidSequencesSplitting}
          onChange={() => updateSettings({...pdfSettings, avoidSequencesSplitting: !pdfSettings.avoidSequencesSplitting})}
          style={{ margin: '.5em auto' }}
        />
      </Grid>
      <Button onClick={resetDefault} style={{ marginTop: 15 }}>
        <Icon name='repeat' /> Reset default
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  pdfSettings: state.pdf.settings
})

const mapDispatchToProps = (dispatch) => ({
  updateSettings: bindActionCreators(pdfActions.updateSettings, dispatch),
  resetDefault: bindActionCreators(pdfActions.resetDefault, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings)