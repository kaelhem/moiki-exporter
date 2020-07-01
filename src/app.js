import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from 'containers/layout'
import { Dimmer, Loader } from 'semantic-ui-react'

const Home = lazy(() => import(/* webpackChunkName: "home" */'./pages/home'))
const ExportMenu = lazy(() => import(/* webpackChunkName: "export-menu" */'./pages/export-menu'))
const CreatePdf = lazy(() => import(/* webpackChunkName: "create-pdf" */'./pages/create-pdf'))

const App = () => {
  return (  
    <Layout>
      <Suspense fallback={<Dimmer active><Loader /></Dimmer>}>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/export" component={ ExportMenu } />
          <Route path="/create-pdf" component={ CreatePdf } />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default App
