import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { NavLink, Outlet } from 'react-router-dom'

function SandboxRepoSinglePage() {
  return (
    <>
      <SandboxLayout.SubHeader>
        <Tabs variant="navigation" defaultValue="summary">
          <TabsList>
            <NavLink to={`summary`}>
              <TabsTrigger value="/summary">Summary</TabsTrigger>
            </NavLink>
            <NavLink to={`code`}>
              <TabsTrigger value="code">Files</TabsTrigger>
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
            <NavLink to={`webhooks`}>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </NavLink>
            <NavLink to={`branches`}>
              <TabsTrigger value="branches">Branches</TabsTrigger>
            </NavLink>
          </TabsList>
        </Tabs>
      </SandboxLayout.SubHeader>
      <Outlet />
    </>
  )
}

export { SandboxRepoSinglePage }
