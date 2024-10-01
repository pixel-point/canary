import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { NavLink, Outlet } from 'react-router-dom'

function SandboxSettingsAccountPage() {
  return (
    <>
      <SandboxLayout.SubHeader>
        <Tabs variant="navigation" defaultValue="general">
          <TabsList>
            <NavLink to={`general`}>
              <TabsTrigger value="general">General</TabsTrigger>
            </NavLink>
            <NavLink to={`keys`}>
              <TabsTrigger value="keys">Keys and tokens</TabsTrigger>
            </NavLink>
          </TabsList>
        </Tabs>
      </SandboxLayout.SubHeader>
      <Outlet />
    </>
  )
}

export { SandboxSettingsAccountPage }
