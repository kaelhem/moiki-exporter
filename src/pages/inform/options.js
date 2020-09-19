import React, { useState, useEffect, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as informActions } from 'core/reducers/inform'
import { Button, Icon, Input, Grid, Radio, Divider, Form } from 'semantic-ui-react'
import SelectField from 'components/select-field'
import { debounce } from 'utils/debounce'

const Options = (props) => {
  const {
    settings,
    updateSettings,
    resetDefault
  } = props

  const [clsPattern, setClsPattern] = useState(settings.clsPattern)

  const debounceCallback = useCallback(
    debounce(value => {
      updateSettings({clsPattern: value})
    }, 300),
    []
  )

  useEffect(() => {
    setClsPattern(settings.clsPattern)
  }, [settings])

  const updateClsPattern = (_, {value}) => {
    setClsPattern(value)
    debounceCallback(value)
  }

  return (
    <div className="export-buttons inform-export-options" style={{ width: 400, minHeight: 360, margin: 'auto' }}>
      <Grid columns={2}>
        <SelectField
          label="Lang"
          value={settings.lang}
          onChange={(value) => updateSettings({lang: value})}
          options={['fr', 'en']}
        />
        <SelectField
          label="Encoding"
          value={settings.encoding}
          onChange={(value) => updateSettings({encoding: value})}
          options={['latin1', 'utf8']}
        />
        <div style={{ width: '100%', marginTop: 20 }}>
          <Divider horizontal>pauses and screen clearing</Divider>
        </div>
        <Radio
          toggle
          label="Add pause when win/lose items"
          checked={!settings.disablePauseOnItems}
          onChange={() => updateSettings({disablePauseOnItems: !settings.disablePauseOnItems})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Add pause after each text sequence"
          checked={!settings.disablePauseOnSimpleSequence}
          onChange={() => updateSettings({disablePauseOnSimpleSequence: !settings.disablePauseOnSimpleSequence})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Add pause on game over"
          checked={!settings.disablePauseOnGameOver}
          onChange={() => updateSettings({disablePauseOnGameOver: !settings.disablePauseOnGameOver})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Clear screen (or separator) after choice selection"
          checked={!settings.disableClearScreenOnChoice}
          onChange={() => updateSettings({disableClearScreenOnChoice: !settings.disableClearScreenOnChoice})}
          style={{ margin: '.5em auto' }}
        />
        <Radio
          toggle
          label="Prefer separators over screen clearing"
          checked={settings.preferSeparatorThanCls}
          onChange={() => updateSettings({preferSeparatorThanCls: !settings.preferSeparatorThanCls})}
          style={{ margin: '.5em auto' }}
          disabled={settings.disableClearScreenOnChoice}
        />
        <Form.Field inline style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <label style={{ marginRight: 20, fontWeight: 'bold' }}>Separator pattern</label>
          <Input style={{ flexGrow: 1 }} value={clsPattern} onChange={updateClsPattern} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Options)