import React, { useState } from 'react'
import { Icon, Navbar } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'
import { NavLink, Outlet } from 'react-router-dom'

function Sidebar() {
  return (
    <Navbar.Root className="w-full border-none bg-transparent px-3">
      <Navbar.Content>
        <Navbar.Group>
          <NavLink to="general" end>
            {({ isActive }) => (
              <Navbar.Item text="General" icon={<Icon name="harness" size={12} />} active={isActive} />
            )}
          </NavLink>
          <NavLink to="keys">
            {({ isActive }) => (
              <Navbar.Item text="Keys and tokens" icon={<Icon name="harness" size={12} />} active={isActive} />
            )}
          </NavLink>
        </Navbar.Group>
      </Navbar.Content>
    </Navbar.Root>
  )
}

function SandboxSettingsAccountPage() {
  const [loadState, setLoadState] = useState('sub-float')

  return (
    <>
      {loadState.includes('sub') && (
        <SandboxLayout.LeftSubPanel hasHeader>
          <Sidebar />
        </SandboxLayout.LeftSubPanel>
      )}
      <Outlet />
      <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export { SandboxSettingsAccountPage }
