import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@harnessio/canary'
import { NavLink, Outlet, useParams } from 'react-router-dom'

const RepoLayout: React.FC = () => {
  const { executionId } = useParams<{ executionId: string }>()

  return (
    <div>
      {/* 
        add back once projects api is integrated
        <TopBarWidget projects={mockProjects} />
      */}
      {!executionId && (
        <Tabs variant="navigation" defaultValue="summary">
          <TabsList>
            <NavLink to={`summary`}>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </NavLink>
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
