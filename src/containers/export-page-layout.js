import React, { useState, Fragment } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { Button, Divider, Icon, Loader, Menu } from 'semantic-ui-react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'utils/codemirror/inform6'
import 'utils/codemirror/ink'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/css/css'
import './export-page-layout.css'

const ExportPageLayout = (props) => {
  const {
    story,
    clear,
    location,
    match,
    leftPanes,
    rightPanes,
    onDownload,
    downloadButtonLabel,
  } = props

  const [secondaryMenuSelectedIndex, setSecondaryMenuSelectedIndex] = useState(0)

  const linkToUrl = (url) => {
    return match.path + (url ? `/${url}` : '')
  }

  const RightPane = () => {
    let Pane = null
    if (rightPanes && rightPanes[secondaryMenuSelectedIndex]) {
      const p = rightPanes[secondaryMenuSelectedIndex]
      if (p.component) {
        Pane = p.component
      } else {
        Pane = () => 'No pane attached'
      }
    }
    if (Pane) {
      return <Pane />
    }
    return (
      <div className="generator-loader-container">
        <Loader inverted active={true} />
      </div>
    )
  }

  return story ? (
     <div className="two-columns-view">
      <div className="divided-panel">
        <div className="options-view-container">
          {leftPanes && leftPanes.length > 1 && (
            <Fragment>
              <Menu secondary style={{ padding: '.5em .8em', margin: 0 }}>
              {leftPanes && leftPanes.map((p, idx) => (
                <Menu.Item
                  key={'main-menu-' + idx}
                  style={{ marginLeft: 0 }}
                  name={'main-menu-' + idx}
                  content={p.name}
                  active={location.pathname.endsWith(linkToUrl(p.url))}
                  as={Link}
                  to={linkToUrl(p.url)}
                />
              ))}
              </Menu>
              <Divider style={{ margin: 0, marginBottom: -1 }} />
            </Fragment>
          )}
          <div style={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            {leftPanes && leftPanes.length > 0 ? (
              <Switch>
              {leftPanes && leftPanes.map(({url, component: Pane}, idx) => (
                <Route key={'pane-' + idx} exact={!url} path={linkToUrl(url)} component={Pane} />
              ))}
              </Switch>
            ) : (
              <div>Nothing to show here...</div>
            )}
          </div>
          <Divider style={{ margin: 0 }}/>
          <div style={{ display: 'flex', padding: '.5em .8em' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, marginRight: '.8em' }}>
              <Button as={Link} to='/export'>Back</Button>
              <Button style={{ marginBottom: 0 }} onClick={clear}>Import another story</Button>
            </div>
            <Button size="huge" style={{ marginBottom: 0 }} onClick={onDownload} color="green">
              <Icon name='download' /> {downloadButtonLabel || 'Download file'}
            </Button>
          </div>
        </div>
      </div>
      <div className="divided-panel" style={{ borderLeft: '2px rgb(79, 82, 85) solid', display: 'flex', flexDirection: 'column'}}>
        {rightPanes && rightPanes.length > 1 && (
          <div style={{ width: '100%' }}>
            <Menu secondary style={{ padding: '.5em .8em', margin: 0 }}>
            {rightPanes && rightPanes.map((p, idx) => (
              <Menu.Item
                key={'secondary-menu-' + idx}
                style={{ marginLeft: 0 }}
                name={'secondary-menu-' + idx}
                content={p.name}
                active={secondaryMenuSelectedIndex === idx}
                onClick={() => setSecondaryMenuSelectedIndex(idx)}
              />
            ))}
            </Menu>
            <Divider style={{ margin: 0, marginBottom: -1 }} />
          </div>
        )}
        <div style={{ display: 'flex', maxHeight: 'calc(100vh - ' + (rightPanes && rightPanes.length > 1 ? '111' : '60') + 'px)', overflow: 'auto' }}>
          { rightPanes && rightPanes[secondaryMenuSelectedIndex] && rightPanes[secondaryMenuSelectedIndex].showSource ? (
            <CodeMirror
              className='codemirror-source'
              value={ rightPanes[secondaryMenuSelectedIndex].showSource.data }
              options={{
                mode: 'markdown',
                theme: 'material',
                lineNumbers: true,
                lineWrapping: true,
                readOnly: true,
                cursorBlinkRate: -1,
                ...rightPanes[secondaryMenuSelectedIndex].showSource.options
              }}
            />
          ) : (
            <RightPane />
          )}
        </div>
      </div>
    </div>
  ) : <Loader active={true} />
}

const mapStateToProps = (state) => ({
  story: state.story.story
})

const mapDispatchToProps = (dispatch) => ({
  clear: bindActionCreators(storyActions.clear, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ExportPageLayout)