import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as informActions } from 'core/reducers/inform'
import { Button, Icon, Input, Grid, Radio, Divider, Form } from 'semantic-ui-react'
import SelectField from 'components/select-field'

const OptionsPane = (props) => {
  const {
    settings,
    updateSettings,
    resetDefault
  } = props

  const [timeoutId, setTimeoutId] = useState(settings)
  const [options, setOptions] = useState(settings)

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setOptions(settings)
  }, [settings])

  useEffect(() => {
    if (JSON.stringify(settings) !== JSON.stringify(options)) {
      //updateSettings(options)
      clearTimeout(timeoutId)
      setTimeoutId(setTimeout(() => updateSettings(options), 300))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const update = (data) => {
    setOptions({...options, ...data})
  }

  return (
    <div className="export-buttons export-pane-options" style={{ width: 400, minHeight: 360, margin: 'auto' }}>
      <Grid columns={2}>
        <div>
          <div>
             <a target="_blank" rel="noopener noreferrer" href="https://www.inform-fiction.org/">Inform</a> is a programming language and design system for interactive fiction. Export your Moiki story in this format and compile it in z-code (v3, v5 or v8) to run on lots of retro computers!
          </div>
          <Divider style={{ marginBottom: 30 }} />
        </div>
        <SelectField
          label="Lang"
          value={options.lang}
          onChange={(value) => update({lang: value})}
          options={['fr', 'en']}
        />
        <SelectField
          label="Encoding"
          value={options.encoding}
          onChange={(value) => update({encoding: value})}
          options={['latin1', 'utf8']}
        />
        <div style={{ width: '100%' }}>
          <Divider horizontal>pauses and screen clearing</Divider>
        </div>
        <Radio
          toggle
          label="Add pause when win/lose items"
          checked={!options.disablePauseOnItems}
          onChange={() => update({disablePauseOnItems: !options.disablePauseOnItems})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Add pause after each text sequence"
          checked={!options.disablePauseOnSimpleSequence}
          onChange={() => update({disablePauseOnSimpleSequence: !options.disablePauseOnSimpleSequence})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Add pause on game over"
          checked={!options.disablePauseOnGameOver}
          onChange={() => update({disablePauseOnGameOver: !options.disablePauseOnGameOver})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Clear screen (or separator) after choice selection"
          checked={!options.disableClearScreenOnChoice}
          onChange={() => update({disableClearScreenOnChoice: !options.disableClearScreenOnChoice})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Prefer separators over screen clearing"
          checked={options.preferSeparatorThanCls}
          onChange={() => update({preferSeparatorThanCls: !options.preferSeparatorThanCls})}
          style={{ margin: '.5em auto' }}
          disabled={options.disableClearScreenOnChoice}
        />
        <Form.Field inline style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <label style={{ marginRight: 20, fontWeight: 'bold' }}>Separator pattern</label>
          <Input style={{ flexGrow: 1 }} value={options.clsPattern} onChange={(_, {value}) => update({clsPattern: value})} />
        </Form.Field>
      </Grid>
      <Button onClick={resetDefault} style={{ marginTop: 30 }}>
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
export default connect(mapStateToProps, mapDispatchToProps)(OptionsPane)