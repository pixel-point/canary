import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar as NavbarComp, Icon, NavbarProjectChooser } from '@harnessio/canary'
import type { TypesUser } from '../../layouts/types'
import { adminMenuItem } from './data'
import { NavBarLink } from './navbar-link'
import { NavbarItem } from './types'
import { NavbarAi } from './navbar-ai'
import { NavbarUser } from './navbar-user'

const hideNavbarPaths = ['/signin', '/signup']

interface NavbarProps {
  recentMenuItems: NavbarItem[]
  pinnedMenuItems: NavbarItem[]
  showMoreMenu: boolean
  showSettingMenu: boolean
  handleMoreMenu: () => void
  handleSettingsMenu: () => void
  currentUser: TypesUser | undefined
  handleCustomNav: () => void
  handleLogOut: () => void
}

export const Navbar = ({
  recentMenuItems,
  pinnedMenuItems,
  showMoreMenu,
  showSettingMenu,
  handleMoreMenu,
  handleSettingsMenu,
  currentUser,
  handleCustomNav,
  handleLogOut
}: NavbarProps) => {
  const location = useLocation()

  const showNavbar = useMemo(() => {
    return !hideNavbarPaths.includes(location.pathname)
  }, [location.pathname])

  if (!showNavbar) return null

  return (
    <NavbarComp.Root className="fixed inset-y-0 left-0 z-50 max-md:hidden">
      <NavbarComp.Header>
        <NavbarProjectChooser.Root
          logo={
            <Link className="flex items-center gap-1.5" to="/">
              <Icon name="harness" size={18} className="text-foreground-1" />
              <Icon name="harness-logo-text" width={65} height={15} className="text-foreground-1 mb-0.5" />
            </Link>
          }
        />
      </NavbarComp.Header>

      <NavbarComp.Content className="overflow-hidden">
        <div className="mb-[1.375rem] overflow-y-scroll">
          <NavbarComp.Group>
            {pinnedMenuItems.map((item, idx) => (
              <NavBarLink key={idx} {...item} />
            ))}
            <button onClick={handleMoreMenu}>
              <NavbarComp.Item text="More" icon={<Icon name="ellipsis" size={12} />} active={showMoreMenu} />
            </button>
          </NavbarComp.Group>

          <NavbarComp.Group title="Recent" topBorder>
            {recentMenuItems.map(item => (
              <NavBarLink key={item.id} {...item} />
            ))}
          </NavbarComp.Group>

          <NavbarComp.Group topBorder>
            <button onClick={handleSettingsMenu}>
              <NavbarComp.Item
                text={adminMenuItem.title}
                icon={<Icon name={adminMenuItem.iconName} size={12} />}
                active={showSettingMenu}
              />
            </button>
          </NavbarComp.Group>
        </div>

        <NavbarAi />
      </NavbarComp.Content>

      <NavbarComp.Footer>
        <NavbarUser currentUser={currentUser} handleCustomNav={handleCustomNav} handleLogOut={handleLogOut} />
      </NavbarComp.Footer>
    </NavbarComp.Root>
  )
}
