import { Tabs, TabsList, TabsTrigger } from '@harnessio/canary'
import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import TopBarWidget from '../components/layout/top-bar-widget'

const RepoLayout: React.FC = () => {
  const { executionId } = useParams<{ executionId: string }>()

  return (
    <div>
      <TopBarWidget />
      {!executionId && (
        <Tabs variant="navigation" defaultValue="pipelines">
          <TabsList>
            <NavLink to={`pipelines`}>
              <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
            </NavLink>
            <NavLink to={`commits`}>
              <TabsTrigger value="commits">Commits</TabsTrigger>
            </NavLink>
            <NavLink to={`pull-requests`}>
              <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
            </NavLink>
            <NavLink to={`branches`}>
              <TabsTrigger value="branches">Branches</TabsTrigger>
            </NavLink>
          </TabsList>
        </Tabs>
      )}
      <main className="min-h-[calc(100vh-100px)] box-border overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default RepoLayout
