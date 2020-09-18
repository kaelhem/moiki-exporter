import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { Button, Segment, Divider, Image } from 'semantic-ui-react'
import { utils } from 'moiki-exporter'

const ExportMenu = (props) => {
  const {
    error,
    story,
    exportStory,
    clear
  } = props

  return (
    <div>
      { error && (
        <Segment className="error-message" color='red'>
          { error }
          <Fragment>
            <Divider />
            <p>Please, consider opening an <a href="https://github.com/kaelhem/moiki-exporter/issues" target="_blank" rel="noopener noreferrer">issue on github</a> to help us improve this tool.</p>
          </Fragment>
        </Segment>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '1em' }}>
        <div className="export-buttons">
          <Segment>
            { story.meta.image && (
              <Image style={{maxHeight: 225, overflow: 'hidden'}} wrapped ui={false}>
                <div className='cover' style={{ backgroundImage: 'url(' + story.meta.image + ')' }} />
              </Image>
            )}
            <h2>{story.meta.name}</h2>
            <div><em>A story by {utils.getAuthor(story.meta)}</em></div>
          </Segment>
          <Button onClick={() => exportStory('ink')}>Export to Inkle's ink</Button>
          <Button onClick={() => exportStory('harlowe')}>Export to Twee (<em>Harlowe 3.1.0</em>)</Button>
          <Button onClick={() => exportStory('sugarcube')}>Export to Twee (<em>SugarCube 2.31.1</em>)</Button>
          <Button as={Link} to='/create-inform'>Export to Inform (<em>v6</em>)</Button>
          <Button onClick={() => exportStory('jdrbot')}>Export to JDR-Bot</Button>
          <Button as={Link} to='/create-pdf'>Make PDF...</Button>
          <Divider />
          <Button onClick={clear}>Import another story</Button>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  error: state.story.exportError,
  story: state.story.story
})

const mapDispatchToProps = (dispatch) => ({
  exportStory: bindActionCreators(storyActions.export, dispatch),
  clear: bindActionCreators(storyActions.clear, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(ExportMenu)