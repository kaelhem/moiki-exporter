import React, { useState, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as pdfActions } from 'core/reducers/pdf'
import { Divider, Segment, Label, Button, Input } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'
import { unsecableSpaces } from 'utils/pdf-story-utils'

const SequenceLabel = ({index, identifier}) => (
  <Label
    attached='top left'
    content={
      <Fragment>
        <span style={{ fontSize: '1.5em' }}>{ index }</span> (<em>{identifier}</em>)
      </Fragment>
    }
  />
)

const SequenceEditor = (props) => {
  const {
    sequence,
    index,
    updateStory,
    story,
    realIndex,
    filter
  } = props

  const [showSave, setShowSave] = useState(false)
  const [chainContent, setChainContent] = useState(sequence.chainedContent)

  const onCancel = () => {
    setChainContent(sequence.chainedContent)
    setShowSave(false)
  }

  const onSave = () => {
    const sequences = [...story.sequences]
    sequences[realIndex] = { ...sequences[realIndex], chainedContent: chainContent }
    updateStory({...story, sequences})
    setShowSave(false)
  }

  return (
    <Segment padded>
      <SequenceLabel index={index + 1} identifier={sequence.id} />
      { showSave && (
        <Label
          attached='top right'
          content={
            <div>
              <Button style={{ marginRight: '.6em' }} size="mini" negative onClick={onCancel}>Cancel</Button>
              <Button size="mini" positive onClick={onSave}>Save</Button>
            </div>
          }
          style={{ cursor: 'pointer', paddingTop: '.3em', paddingRight: '.6em', paddingBottom: '.1em', paddingLeft: '.6em' }}
        />
      )}
      { chainContent && chainContent.map((chain, chainIdx) => {
        if (typeof chain === 'string') {
          const opacity = filter && chain.toLowerCase().indexOf(filter.toLowerCase()) === -1 ? .3 : 1
          return (
            <div key={chainIdx} className="textarea-container" style={{ marginTop: chainIdx === 0 ? '2em' : 0, opacity }}>
              <TextareaAutosize
                value={chain}
                onChange={evt => {
                  const value = evt.target.value
                  console.log(value, sequence.chainedContent[chainIdx])
                  setShowSave(value !== sequence.chainedContent[chainIdx])
                  const chainedContent = [...chainContent]
                  chainedContent[chainIdx] = unsecableSpaces(value)
                  setChainContent(chainedContent)
                }}
              />
            </div>
          )
        }
        return <div key={chainIdx} style={{ margin: 20 }}>[ICON]</div>
      })}
    </Segment>
  )
}

const Sequences = (props) => {

  const { story, updateStory } = props
  const [filter, setFilter] = useState('')

  const shouldFilter = (sequence) => {
    let respectFilter = false
    sequence.chainedContent.forEach(chain => {
      if (typeof chain === 'string' && chain.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        respectFilter = true
      }
    })
    return respectFilter
  }

  return (
    <div style={{ width: '100%' }} className="options-sequences-container">
      <div style={{ margin: 10, height: 40 }}>
        <Input
          action={filter ? <Button onClick={() => setFilter('')}>clear</Button> : null}
          placeholder='Filter...'
          value={filter}
          onChange={(_, {value}) => setFilter(value)}
        />
      </div>
      <Divider style={{ margin: 0, marginBottom: -1 }} />
      <div style={{ height: 'calc(100vh - 273px)', overflowY: 'auto', width: '100%' }}>
        <div style={{ padding: '1.5em' }}>
          { story.sequencesShuffle && story.sequencesShuffle.map((x, idx) => {
            const sequence = story.sequences[x]
            return filter && !shouldFilter(sequence) ? null : (
              <SequenceEditor
                key={sequence.id}
                sequence={sequence}
                index={idx}
                realIndex={x}
                updateStory={updateStory}
                story={story}
                filter={filter}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  story: state.pdf.simplifiedStory
})

const mapDispatchToProps = (dispatch) => ({
  updateStory: bindActionCreators(pdfActions.updateStory, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Sequences)