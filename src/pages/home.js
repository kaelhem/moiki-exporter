import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import Dropzone from 'components/dropzone'
import { Segment, Divider } from 'semantic-ui-react'

const Home = (props) => {
  const {
    error,
    importStory,
    story
  } = props

  return story ? (
    <Redirect to="/export" />
  ) : (
    <Fragment>
      { error && (
        <Segment className="error-message" color='red'>
          { error }
        </Segment>
      )}
      <div style={{ textAlign: 'center' }}>
        <p>This tool allows you to export stories made with <a href="https://moiki.fr" target="_blank" rel="noopener noreferrer">Moiki</a> in different formats.</p>
        <a href="https://github.com/kaelhem/moiki-exporter" target="_blank" rel="noopener noreferrer"><em>Learn more about it</em></a>
        <Divider />
        <Dropzone
          onDataLoaded={ importStory }
          content={<p>Drop your story as <em>.zip</em> here</p>}
        />
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  error: state.story.error,
  story: state.story.story
})

const mapDispatchToProps = (dispatch) => ({
  importStory: bindActionCreators(storyActions.import, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)