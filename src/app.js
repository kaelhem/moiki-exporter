import React, { lazy, Suspense } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Layout from 'containers/layout'
import { RouteWithStory, RouteWithoutStory } from 'containers/route-with-story'
import { Dimmer, Loader } from 'semantic-ui-react'

const Home = lazy(() => import(/* webpackChunkName: "home" */'./pages/home'))
const ExportMenu = lazy(() => import(/* webpackChunkName: "export-menu" */'./pages/export-menu'))
const CreatePdf = lazy(() => import(/* webpackChunkName: "create-pdf" */'./pages/create-pdf'))
const CreateInform = lazy(() => import(/* webpackChunkName: "create-inform" */'./pages/create-inform'))
const CreateInk = lazy(() => import(/* webpackChunkName: "create-ink" */'./pages/create-ink'))

//const CreateTwine = lazy(() => import(/* webpackChunkName: "create-twine" */'./pages/create-twine'))
//const CreateJdrBot = lazy(() => import(/* webpackChunkName: "create-jdrbot" */'./pages/create-jdrbot'))

const App = () => {
  return (  
    <Layout>
      <Suspense fallback={<Dimmer active><Loader /></Dimmer>}>
        <Switch>
          <RouteWithoutStory exact path="/" component={ Home } />
          <RouteWithStory path="/export" component={ ExportMenu } />
          <RouteWithStory path="/create-pdf" component={ CreatePdf } />
          <RouteWithStory path="/create-inform" component={ CreateInform } />
          <RouteWithStory path="/create-ink" component={ CreateInk } />
          {/*
          <RouteWithStory path="/create-twine" component={ CreateTwine } />
          <RouteWithStory path="/create-jdrbot" component={ CreateJdrBot } />
          */}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default App
