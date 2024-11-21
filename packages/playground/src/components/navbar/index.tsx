import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar as NavbarComp, Icon, NavbarProjectChooser } from '@harnessio/canary'
import type { TypesUser } from '../../layouts/types'
import { adminMenuItem } from './data'
import { NavbarItem } from './navbar-item'
import { NavbarItemType } from './types'
import { NavbarAi } from './navbar-ai'
import { NavbarUser } from './navbar-user'

const hideNavbarPaths = ['/signin', '/signup']

interface NavbarProps {
  recentMenuItems: NavbarItemType[]
  pinnedMenuItems: NavbarItemType[]
  showMoreMenu: boolean
  showSettingMenu: boolean
  handleMoreMenu: () => void
  handleSettingsMenu: () => void
  currentUser: TypesUser | undefined
  handleCustomNav: () => void
  handleLogOut: () => void
  handleChangePinnedMenuItem: (item: NavbarItemType) => void
  handleRemoveRecentMenuItem: (item: NavbarItemType) => void
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
  handleLogOut,
  handleChangePinnedMenuItem,
  handleRemoveRecentMenuItem
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
              <NavbarItem
                key={idx}
                item={item}
                handleChangePinnedMenuItem={handleChangePinnedMenuItem}
                handleRemoveRecentMenuItem={handleRemoveRecentMenuItem}
                handleCustomNav={handleCustomNav}
              />
            ))}
            <button onClick={handleMoreMenu}>
              <NavbarComp.Item text="More" icon={<Icon name="ellipsis" size={12} />} active={showMoreMenu} />
            </button>
          </NavbarComp.Group>

          {!!recentMenuItems.length && (
            <NavbarComp.Group title="Recent" topBorder>
              {recentMenuItems.map(item => (
                <NavbarItem
                  key={item.id}
                  item={item}
                  isRecent
                  handleChangePinnedMenuItem={handleChangePinnedMenuItem}
                  handleRemoveRecentMenuItem={handleRemoveRecentMenuItem}
                  handleCustomNav={handleCustomNav}
                />
              ))}
            </NavbarComp.Group>
          )}

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
