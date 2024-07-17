import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { routes } from './RouteDefinitions'
import { Studio, StudioMixed, StudioParallel, StudioDemo } from './pages/studio/Studio'

export const RouteDestinations: React.FC = React.memo(function RouteDestinations() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.toStudioParallel()} component={StudioParallel} />
        <Route exact path={routes.toStudioMixed()} component={StudioMixed} />
        <Route exact path={routes.toStudioDemo()} component={StudioDemo} />
        <Route path={routes.toStudio()} component={Studio} />
      </Switch>
    </BrowserRouter>
  )
})
