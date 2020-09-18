import React, { lazy, Suspense } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Layout from 'containers/layout'
import { RouteWithStory, RouteWithoutStory } from 'containers/route-with-story'
import { Dimmer, Loader } from 'semantic-ui-react'

const Home = lazy(() => import(/* webpackChunkName: "home" */'./pages/home'))
const ExportMenu = lazy(() => import(/* webpackChunkName: "export-menu" */'./pages/export-menu'))
const CreatePdf = lazy(() => import(/* webpackChunkName: "create-pdf" */'./pages/create-pdf'))
const CreateInform = lazy(() => import(/* webpackChunkName: "create-inform" */'./pages/create-inform'))

const App = () => {
  return (  
    <Layout>
      <Suspense fallback={<Dimmer active><Loader /></Dimmer>}>
        <Switch>
          <RouteWithoutStory exact path="/" component={ Home } />
          <RouteWithStory path="/export" component={ ExportMenu } />
          <RouteWithStory path="/create-pdf" component={ CreatePdf } />
          <RouteWithStory path="/create-inform" component={ CreateInform } />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default App
