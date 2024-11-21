import { Outlet } from 'react-router-dom'

import { noop } from 'lodash-es'

import { SandboxLayout } from '..'
import { TopBarWidget } from '../components/layout/top-bar-widget'
import { mockProjects } from '../data/mockProjects'

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
