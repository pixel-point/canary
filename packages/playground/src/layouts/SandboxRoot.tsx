import { useCallback, useEffect, useState } from 'react'
import { SandboxLayout } from '../index'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { MoreSubmenu } from '../components/more-submenu'
import type { TypesUser } from './types'
import { SettingsMenu } from '../components/settings-menu'

interface SandboxRootProps {
  currentUser: TypesUser | undefined
}

export const SandboxRoot: React.FC<SandboxRootProps> = ({ currentUser }) => {
  const location = useLocation()
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showSettingMenu, setShowSettingMenu] = useState(false)
  const [showCustomNav, setShowCustomNav] = useState(false)

  // TODO: add log out func
  const handleLogOut = useCallback(() => {}, [])

  /**
   * Toggle show more menu
   */
  const handleMoreMenu = useCallback(() => {
    setShowSettingMenu(false)
    setShowMoreMenu(prevState => !prevState)
  }, [])

  /**
   * Toggle system settings menu
   */
  const handleSettingsMenu = useCallback(() => {
    setShowMoreMenu(false)
    setShowSettingMenu(prevState => !prevState)
  }, [])

  /**
   * Toggle custom navigation modal
   */
  const handleCustomNav = useCallback(() => {
    setShowCustomNav(prevState => !prevState)
  }, [])

  /**
   * Close all menu when location changed
   */
  useEffect(() => {
    setShowMoreMenu(false)
    setShowSettingMenu(false)
    setShowCustomNav(false)
  }, [location])

  return (
    <SandboxLayout.Root>
      <SandboxLayout.LeftPanel>
        <Navbar
          showMoreMenu={showMoreMenu}
          showSettingMenu={showSettingMenu}
          handleMoreMenu={handleMoreMenu}
          handleSettingsMenu={handleSettingsMenu}
          currentUser={currentUser}
          handleCustomNav={handleCustomNav}
          handleLogOut={handleLogOut}
        />
      </SandboxLayout.LeftPanel>
      <Outlet />
      <MoreSubmenu showMoreMenu={showMoreMenu} handleMoreMenu={handleMoreMenu} />
      <SettingsMenu showSettingMenu={showSettingMenu} handleSettingsMenu={handleSettingsMenu} />
    </SandboxLayout.Root>
  )
}
