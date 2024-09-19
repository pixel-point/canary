import React from 'react'
import { noop } from 'lodash-es'
import { Outlet } from 'react-router-dom'
import { TopBarWidget } from '../components/layout/top-bar-widget'
import { mockProjects } from '../data/mockProjects'
import { SandboxLayout } from '..'

const SandboxRepo: React.FC = () => {
  return (
    <>
      <SandboxLayout.Header>
        <TopBarWidget projects={mockProjects} onSelectProject={noop} />
      </SandboxLayout.Header>
      <Outlet />
    </>
  )
}

export { SandboxRepo }
