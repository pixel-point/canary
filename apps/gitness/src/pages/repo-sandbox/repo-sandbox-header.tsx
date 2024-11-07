import React from 'react'
import { Outlet } from 'react-router-dom'
import { SandboxLayout } from '@harnessio/playground'
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs'

const SandboxRepoHeader: React.FC = () => {
  return (
    <>
      <SandboxLayout.Header>
        <Breadcrumbs />
      </SandboxLayout.Header>
      <Outlet />
    </>
  )
}

export { SandboxRepoHeader }
