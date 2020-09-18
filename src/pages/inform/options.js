import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as informActions } from 'core/reducers/inform'
import { Button, Icon, Select, Grid, Radio, Divider } from 'semantic-ui-react'
//import NumberInput from 'semantic-ui-react-numberinput'

const Options = (props) => {

  const {
    settings,
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

  /*const NumberField = ({ label, value, min, max, dblClickStep, onChange }) => {
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
  }*/

  return (
    <div className="export-buttons inform-export-options" style={{ width: 400, minHeight: 360, margin: 'auto' }}>
      <Grid columns={2}>
        <SelectField
          label="Lang"
          value={settings.lang}
          onChange={(value) => updateSettings({...settings, lang: value})}
          options={['fr', 'en']}
        />
        <SelectField
          label="Encoding"
          value={settings.encoding}
          onChange={(value) => updateSettings({...settings, encoding: value})}
          options={['latin1', 'utf8']}
        />
        <div style={{ width: '100%' }}>
          <Divider horizontal>pauses and screen clearing</Divider>
        </div>
        <Radio
          toggle
          label="Add pause when win/lose items"
          defaultChecked={!settings.disablePauseOnItems}
          onChange={() => updateSettings({...settings, disablePauseOnItems: !settings.disablePauseOnItems})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Add pause after each text sequence"
          defaultChecked={!settings.disablePauseOnSimpleSequence}
          onChange={() => updateSettings({...settings, disablePauseOnSimpleSequence: !settings.disablePauseOnSimpleSequence})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Add pause on game over"
          defaultChecked={!settings.disablePauseOnGameOver}
          onChange={() => updateSettings({...settings, disablePauseOnGameOver: !settings.disablePauseOnGameOver})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Clear screen (or separator) after choice selection"
          defaultChecked={!settings.disableClearScreenOnChoice}
          onChange={() => updateSettings({...settings, disableClearScreenOnChoice: !settings.disableClearScreenOnChoice})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Prefer separators over screen clearing"
          defaultChecked={settings.preferSeparatorThanCls}
          onChange={() => updateSettings({...settings, preferSeparatorThanCls: !settings.preferSeparatorThanCls})}
          style={{ margin: '.5em auto' }}
          disabled={settings.disableClearScreenOnChoice}
        />
        {/*

        options:
         - cls-pattern
         - include wait (for key press) on every sequence


        <SelectField
          label="Font family"
          value={settings.font}
          onChange={(value) => updateSettings({...settings, font: value})}
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
          value={settings.fontSize}
          onChange={(value) => updateSettings({...settings, fontSize: value})}
          min={10}
          max={20}
          dblClickStep={2}
        />
        <NumberField
          label="Horizontal margins"
          value={settings.margins.left}
          onChange={(value) => updateSettings({...settings, margins: { ...settings.margins, left: value, right: value}})}
          min={20}
          max={100}
          dblClickStep={5}
        />
        <NumberField
          label="Vertical margins"
          value={settings.margins.top}
          onChange={(value) => updateSettings({...settings, margins: { ...settings.margins, top: value, bottom: value}})}
          min={20}
          max={100}
          dblClickStep={5}
        />
        <Radio
          toggle
          label="Avoid page break on paragraphs"
          defaultChecked={settings.avoidSequencesSplitting}
          onChange={() => updateSettings({...settings, avoidSequencesSplitting: !settings.avoidSequencesSplitting})}
          style={{ margin: '.5em auto' }}
        />
        */}
      </Grid>
      <Button onClick={resetDefault} style={{ marginTop: 15 }}>
        <Icon name='repeat' /> Reset default
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  settings: state.inform.settings
})

const mapDispatchToProps = (dispatch) => ({
  updateSettings: bindActionCreators(informActions.updateSettings, dispatch),
  resetDefault: bindActionCreators(informActions.resetDefault, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Options)