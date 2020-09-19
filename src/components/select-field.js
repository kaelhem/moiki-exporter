import React from 'react'
import { Select, Grid } from 'semantic-ui-react'

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

export default SelectField