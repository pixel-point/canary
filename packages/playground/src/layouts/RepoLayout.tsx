// RepoLayout.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
  Topbar
} from '@harnessio/canary'
import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

const RepoLayout: React.FC = () => {
  const { repoId } = useParams<{ repoId: string }>()

  return (
    <div>
      <Topbar.Root>
        <Topbar.Left>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Repository {repoId}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
              <BreadcrumbPage>
                <BreadcrumbLink href="/components">pipeline.yml</BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </Topbar.Left>
        <Topbar.Right>
          <></>
        </Topbar.Right>
      </Topbar.Root>
      {/* <header style={{ background: '#222', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <NavLink to={`/repos/${repoId}`} style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })} end>
            Index
          </NavLink>
          <NavLink to="pipelines" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
            Pipelines
          </NavLink>
          <NavLink to="commits" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
            Commits
          </NavLink>
          <NavLink to="pull-requests" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
            Pull requests
          </NavLink>
          <NavLink to="branches" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
            Branches
          </NavLink>
        </div>
      </header> */}
      <Tabs variant="navigation" defaultValue="index">
        <TabsList>
          <NavLink to={`/repos/${repoId}`}>
            <TabsTrigger value="index">Index</TabsTrigger>
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
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default RepoLayout
