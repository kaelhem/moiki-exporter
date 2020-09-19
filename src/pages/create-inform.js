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

  const [selectedFile, setSelectedFile] = useState(0)
  const [files, setFiles] = useState(null)

  useEffect(() => {
    const files = story ? convertToInform(story, 'inform6', settings) : null
    setFiles(files)
  }, [story, settings])

  const withEncoding = (data) => {
    return settings.encoding === 'utf8' ? data : windows1252.encode(data)
  }

  return story ? (
     <div className="two-columns-view">
      <div className="divided-panel">
        <div className="options-view-container">
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
              <Icon name='download' /> Download files
            </Button>
          </div>
        </div>
      </div>
      <div className="divided-panel" style={{ borderLeft: '2px rgb(79, 82, 85) solid'}}>
        { files && files.length > 0 ? (
          <div style={{ width: '100%' }}>
            <Menu secondary style={{ padding: '.5em .8em', margin: 0 }}>
              { files && files.map((f, idx) => (
                <Menu.Item
                  key={'file_' + idx}
                  style={{ marginLeft: 0 }}
                  name={f.filename}
                  content={f.filename}
                  active={selectedFile === idx}
                  onClick={() => setSelectedFile(idx)}
                />
              ))}
            </Menu>
            <Divider style={{ margin: 0, marginBottom: -1 }} />
            <div style={{ display: 'flex', maxHeight: 'calc(100vh - 111px)', overflow: 'auto' }}>
              <CodeMirror
                className='codemirror-source'
                  value={ withEncoding(files[selectedFile].data) }
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