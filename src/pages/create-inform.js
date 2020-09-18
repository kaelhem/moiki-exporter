import React, { useState, useEffect } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { Button, Divider, Icon, Loader, Menu } from 'semantic-ui-react'
import * as InformPanes from './inform'
import { convertToInform } from 'moiki-exporter'
import windows1252 from 'windows-1252'
import { Controlled as CodeMirror } from 'react-codemirror2'
import './inform/codemirror-inform6'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/css/css'
import './page-options.css'

const CreateInform = (props) => {
  const {
    settings,
    exportStory,
    story,
    clear
  } = props

  const [informSource, setInformSource] = useState(null)

  useEffect(() => {
    const files = story ? convertToInform(story, 'inform6', settings) : null
    if (files) {
      const source = files.find(f => f.filename.endsWith('.inf')).data
      if (settings.encoding === 'utf8') {
        setInformSource(source)
      } else {
        setInformSource(windows1252.encode(source))
      }
    }
  }, [story, settings])

  return story ? (
     <div className="two-columns-view">
      <div className="divided-panel">
        <div className="options-view-container">
          <Menu secondary style={{ padding: '.5em .8em', margin: 0 }}>
            <Menu.Item
              style={{ marginLeft: 0 }}
              name='options'
              active={props.location.pathname.endsWith('/create-inform')}
              as={Link}
              to='/create-inform'
            />
            {/*<Menu.Item
              name='strings'
              active={props.location.pathname.endsWith('/strings')}
              as={Link}
              to='/create-inform/strings'
            />*/}
          </Menu>
          <Divider style={{ margin: 0, marginBottom: -1 }} />
          <div style={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            <Switch>
              <Route exact path={`${props.match.path}`} component={InformPanes.Options} />
              <Route path={`${props.match.path}/strings`} component={InformPanes.Strings} />
            </Switch>
          </div>
          <Divider style={{ margin: 0 }}/>
          <div style={{ display: 'flex', padding: '.5em .8em' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, marginRight: '.8em' }}>
              <Button as={Link} to='/export'>Back</Button>
              <Button style={{ marginBottom: 0 }} onClick={clear}>Import another story</Button>
            </div>
            <Button size="huge" style={{ marginBottom: 0 }} onClick={() => exportStory('inform6', settings)} color="green">
              <Icon name='download' /> Download file
            </Button>
          </div>
        </div>
      </div>
      <div className="divided-panel" style={{ borderLeft: '2px rgb(79, 82, 85) solid'}}>
        { informSource ? (
          <div style={{ display: 'flex', maxHeight: 'calc(100vh - 60px)', overflow: 'auto' }}>
            <CodeMirror
              className='codemirror-source'
                value={ informSource }
                options={{
                  mode: 'text/x-inform6',
                  theme: 'material',
                  lineNumbers: true,
                  lineWrapping: true,
                  readOnly: true,
                  cursorBlinkRate: -1
                }}
              />
          </div>
        ) : (
          <div className="generator-loader-container">
            <Loader inverted active={true} />
          </div>
        )}
      </div>
    </div>
  ) : <Loader active={true} />
}

const mapStateToProps = (state) => ({
  pending: state.story.exportPending,
  error: state.story.exportError,
  story: state.story.story,
  settings: state.inform.settings
})

const mapDispatchToProps = (dispatch) => ({
  exportStory: bindActionCreators(storyActions.export, dispatch),
  clear: bindActionCreators(storyActions.clear, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateInform)