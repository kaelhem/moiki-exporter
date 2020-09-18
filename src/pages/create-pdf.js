import React, { useState, useEffect } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as storyActions } from 'core/reducers/story'
import { actions as pdfActions } from 'core/reducers/pdf'
import { Button, Divider, Icon, Loader, Menu } from 'semantic-ui-react'
import moment from 'moment'
import { generatePdfStream } from '../pdf/convert-to-pdfkit'
import { saveAs } from 'file-saver'
import kebabCase from 'lodash.kebabcase'
import * as PDFViews from './pdf'
import './page-options.css'

const STATUS = {
  UP_TO_DATE: 'upToDate',
  NEED_UPDATE: 'needUpdate'
}

const CreatePdf = (props) => {
  const {
    pdfSettings,
    story,
    clear,
    initPdfStory,
    pdfStory,
    shuffleStory
  } = props

  const [pdfStatus, setPdfStatus] = useState(STATUS.UP_TO_DATE)
  const [needUpdate, setNeedUpdate] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState(null)
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [iframeSrc, setIframeSrc] = useState(null)
  const [blob, setBlob] = useState(null)

  let startTime = null
  let isProcessing = false
  const convertToPdf = async (pdfData=null) => {
    if (!pdfData) {
      if (isProcessing || !pdfStory) {
        // alreaydy generating... wait.
        return
      }
      startTime = new Date()
    }
    isProcessing = true
    console.log(pdfSettings)
    setGeneratingPdf(true)
    const {stream, pageLinksMap} = await generatePdfStream(pdfStory, pdfSettings, pdfData)
    const onStreamFinished = async () => {
      stream.off('finish', onStreamFinished)
      if (!pdfData) {
        await convertToPdf({pageLinksMap})
      } else {
        setBlob(stream.toBlob('application/pdf'))
        const url = stream.toBlobURL('application/pdf')
        setIframeSrc(url)
        setGeneratingPdf(false)
        setLastUpdateTime({startTime, endTime: new Date()})
        isProcessing = false
      }
    }
    stream.on('finish', onStreamFinished)
  }

  useEffect(() => {
    let timer
    if (pdfStatus === STATUS.NEED_UPDATE) {
      timer = setTimeout(convertToPdf, 1000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfStatus, pdfSettings])

  useEffect(() => {
    setNeedUpdate(new Date())
  }, [pdfSettings])

  useEffect(() => {
    if (story) {
      if (!pdfStory) {
        initPdfStory()
      } else {
        convertToPdf()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfStory, story])

  useEffect(() => {
    if (needUpdate && lastUpdateTime) {
      if (moment(needUpdate).isBetween(lastUpdateTime.startTime, lastUpdateTime.endTime)) {
        setPdfStatus(STATUS.NEED_UPDATE)
      } else if (moment(needUpdate).isAfter(lastUpdateTime.endTime)) {
        setPdfStatus(STATUS.NEED_UPDATE)
      } else {
        setPdfStatus(STATUS.UP_TO_DATE)
      }
    }
  }, [needUpdate, lastUpdateTime])

  const downloadPdf = () => {
    saveAs(blob, kebabCase(story.meta.name) + '.pdf')
  }

  return pdfStory ? (
     <div className="two-columns-view">
      <div className="divided-panel">
        <div className="options-view-container">
          <Menu secondary style={{ padding: '.5em .8em', margin: 0 }}>
            <Menu.Item
              style={{ marginLeft: 0 }}
              name='sequences'
              active={props.location.pathname.endsWith('/create-pdf')}
              as={Link}
              to='/create-pdf'
            />
            <Menu.Item
              name='format'
              active={props.location.pathname.endsWith('/format')}
              as={Link}
              to='/create-pdf/format'
            />
            <Menu.Menu position='right'>
              <Menu.Item
                as='div'
                style={{ marginRight: 0, paddingRight: 0 }}
                content={<Button circular color="green"><Icon name="sync" /> Shuffle sequences</Button>}
                onClick={() => shuffleStory()}
              />
            </Menu.Menu>
          </Menu>
          <Divider style={{ margin: 0, marginBottom: -1 }} />
          <div style={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            <Switch>
              <Route exact path={`${props.match.path}`} component={PDFViews.Sequences} />
              <Route path={`${props.match.path}/format`} component={PDFViews.Settings} />
            </Switch>
          </div>
          <Divider style={{ margin: 0 }}/>
          <div style={{ display: 'flex', padding: '.5em .8em' }}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, marginRight: '.8em' }}>
              <Button as={Link} to='/export'>Back</Button>
              <Button style={{ marginBottom: 0 }} onClick={clear}>Import another story</Button>
            </div>
            <Button size="huge" style={{ marginBottom: 0 }} onClick={downloadPdf} color="green">
              <Icon name='download' /> Download PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="divided-panel" style={{ borderLeft: '2px rgb(79, 82, 85) solid'}}>
        { generatingPdf && (
          <div className="generator-loader-container">
            <Loader inverted active={true} />
          </div>
        )}
        <iframe title='generated PDF' style={{ boxShadow: 'none', border: 'none', width: '100%', height: '100%' }} src={iframeSrc} />
      </div>
    </div>
  ) : <Loader active={true} />
}

const mapStateToProps = (state) => ({
  pending: state.story.exportPending,
  error: state.story.exportError,
  story: state.story.story,
  pdfStory: state.pdf.simplifiedStory,
  pdfSettings: state.pdf.settings
})

const mapDispatchToProps = (dispatch) => ({
  clear: bindActionCreators(storyActions.clear, dispatch),
  initPdfStory: bindActionCreators(pdfActions.initPdf, dispatch),
  shuffleStory: bindActionCreators(pdfActions.shuffleSequences, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePdf)