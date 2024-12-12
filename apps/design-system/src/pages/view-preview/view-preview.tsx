import { FC, ReactNode } from 'react'

import '@harnessio/ui/styles.css'

import { Navigate, Route, Routes } from 'react-router-dom'

import PullRequestCompareWrapper from '../../views/pull-request-compare/pull-request-compare.tsx'
import PullRequestListWrapper from '../../views/pull-request-list/pull-request-list.tsx'
import RepoListWrapper from '../../views/repo-list/repo-list.tsx'
import RepoSummaryViewWrapper from '../../views/repo-summary/repo-summary.tsx'
import RepoViewWrapper from './repo-view-wrapper.tsx'
import RootViewWrapper from './root-view-wrapper.tsx'
import ViewSwitcher from './view-switcher.tsx'

const views: Record<string, ReactNode> = {
  'repo-summary': (
    <RepoViewWrapper>
      <RepoSummaryViewWrapper />
    </RepoViewWrapper>
  ),
  'repo-list': (
    <RootViewWrapper>
      <RepoListWrapper />
    </RootViewWrapper>
  ),
  'pull-request-list': (
    <RepoViewWrapper>
      <PullRequestListWrapper />
    </RepoViewWrapper>
  ),
  'pull-request-compare': (
    <RepoViewWrapper>
      <PullRequestCompareWrapper />
    </RepoViewWrapper>
  )
}

const routeEntries = Object.entries(views)
const routeKeys = Object.keys(views)

const ViewPreview: FC = () => {
  return (
    <div className="dark-std-std">
      <Routes>
        {routeEntries.map(([route, node]) => {
          return <Route key={route} path={`${route}/*`} element={node} />
        })}
        <Route path="/" element={<Navigate to={routeKeys[0]} />} />
      </Routes>
      <ViewSwitcher routes={routeKeys} />
    </div>
  )
}

export default ViewPreview
