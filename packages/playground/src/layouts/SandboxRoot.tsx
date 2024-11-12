import React, { useState } from 'react'
import { SandboxLayout } from '../index'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { MoreSubmenu } from '../components/more-submenu'
import type { TypesUser } from './types'
import { SystemAdminMenu } from '../components/system-admin-menu'

interface SandboxRootProps {
  currentUser: TypesUser | undefined
}

export const SandboxRoot: React.FC<SandboxRootProps> = ({ currentUser }) => {
  const [showMore, setShowMore] = useState(false)
  const [showSystemAdmin, setShowSystemAdmin] = useState(false)

  const handleMore = () => {
    setShowSystemAdmin(false)
    setShowMore(prevState => !prevState)
  }

  const handleSystemAdmin = () => {
    setShowMore(false)
    setShowSystemAdmin(prevState => !prevState)
  }

  return (
    <SandboxLayout.Root>
      <SandboxLayout.LeftPanel>
        <Navbar
          showMore={showMore}
          showSystemAdmin={showSystemAdmin}
          handleMore={handleMore}
          handleSystemAdmin={handleSystemAdmin}
          currentUser={currentUser}
        />
      </SandboxLayout.LeftPanel>
      <Outlet />
      <MoreSubmenu showMore={showMore} handleMore={handleMore} />
      <SystemAdminMenu showSystemAdmin={showSystemAdmin} handleSystemAdmin={handleSystemAdmin} />
    </SandboxLayout.Root>
  )
}
