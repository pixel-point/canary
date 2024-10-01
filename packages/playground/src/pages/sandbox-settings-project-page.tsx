import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { NavLink, Outlet } from 'react-router-dom'

function SandboxSettingsProjectPage() {
  return (
    <>
      <SandboxLayout.SubHeader>
        <Tabs variant="navigation" defaultValue="general">
          <TabsList>
            <NavLink to={`general`}>
              <TabsTrigger value="general">General</TabsTrigger>
            </NavLink>
            <NavLink to={`members`}>
              <TabsTrigger value="members">Members</TabsTrigger>
            </NavLink>
          </TabsList>
        </Tabs>
      </SandboxLayout.SubHeader>
      <Outlet />
    </>
  )
}

export { SandboxSettingsProjectPage }
