import { useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { Button } from '../components/button'
import { Icon, IconProps } from '../components/icon'
import { Navbar as NavbarComp, NavbarProjectChooser, NavbarUser } from '../components/index'
import { Text } from '../components/text'
import { TypesUser } from './layouts/types'

const NavBarLink = (item: NavbarItem | NavbarItemStatic) => {
  return (
    <NavLink to={item.to || ''}>
      {({ isActive }) => (
        <NavbarComp.Item text={item.title} icon={<Icon name={item.iconName} size={12} />} active={isActive} />
      )}
    </NavLink>
  )
}

const hideNavbarPaths = ['/signin', '/signup']

interface NavbarItem {
  id: number
  title: string
  iconName: IconProps['name']
  description: string
  to?: string
}

type NavbarItemStatic = Pick<NavbarItem, 'title' | 'iconName' | 'to'>

const adminMenuItem: Omit<NavbarItemStatic, 'to'> = {
  title: 'Settings',
  iconName: 'settings-1'
}

const primaryMenuItems: NavbarItemStatic[] = [
  {
    title: 'Repositories',
    iconName: 'repositories',
    to: '/repos'
  },
  {
    title: 'Pipelines',
    iconName: 'pipelines',
    to: '/pipelines'
  },
  {
    title: 'Executions',
    iconName: 'execution',
    to: '/executions'
  },
  {
    title: 'Featured Flags',
    iconName: 'featured-flags',
    to: '/feature-flags'
  }
]

const initialPinnedMenuItems: NavbarItem[] = [
  {
    id: 4,
    title: 'Chaos Engineering',
    iconName: 'chaos-engineering',
    description: 'Manage chaos experiments',
    to: '/chaos-engineering'
  },
  {
    id: 12,
    title: 'Environment',
    iconName: 'environment',
    description: 'Manage your environments',
    to: '/environment'
  },
  {
    id: 13,
    title: 'Secrets',
    iconName: 'key',
    description: 'Store your secrets securely',
    to: '/secrets'
  },
  {
    id: 14,
    title: 'Connectors',
    iconName: 'connectors',
    description: 'Manage your connectors',
    to: '/connectors'
  }
]

interface NavbarProps {
  showMore: boolean
  showSystemAdmin: boolean
  handleMore: () => void
  handleSystemAdmin: () => void
  currentUser: TypesUser | undefined
}

export const Navbar = ({ showMore, showSystemAdmin, handleMore, handleSystemAdmin, currentUser }: NavbarProps) => {
  const location = useLocation()
  const [pinnedItems] = useState<NavbarItem[]>(initialPinnedMenuItems)

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

      <NavbarComp.Content>
        <NavbarComp.Group>
          {primaryMenuItems.map((item, idx) => (
            <NavBarLink key={idx} {...item} />
          ))}
          <button onClick={handleMore}>
            <NavbarComp.Item text="More" icon={<Icon name="ellipsis" size={12} />} active={showMore} />
          </button>
        </NavbarComp.Group>
        <NavbarComp.Group title="Recent" topBorder>
          {pinnedItems.map(item => (
            <NavBarLink key={item.id} {...item} />
          ))}
        </NavbarComp.Group>
        <NavbarComp.Group topBorder>
          <button onClick={handleSystemAdmin}>
            <NavbarComp.Item
              text={adminMenuItem.title}
              icon={<Icon name={adminMenuItem.iconName} size={12} />}
              active={showSystemAdmin}
            />
          </button>
        </NavbarComp.Group>

        <div className="mx-auto mb-11 mt-auto flex max-w-[160px] flex-col items-center gap-2.5 text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="relative mb-2">
              <div className="absolute bottom-2 left-2 z-[-1] size-[42px]">
                <Icon
                  className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-plus-lighter blur-[15px]"
                  name="harness-gradient-ellipse"
                  size={102}
                />
              </div>
              <Icon name="harness-gradient" size={44} />
            </div>
            <Text className="leading-none" size={1} weight="medium">
              AI Assistant
            </Text>
            <Text className="text-foreground-5 leading-[1.0625rem]" size={0}>
              Create, analyze or debug your pipelines faster.
            </Text>
          </div>
          <Button
            className="bg-background-7 text-12 font-medium"
            borderRadius="full"
            size="sm"
            padding="sm"
            variant="gradient-border"
            gradientType="ai-button"
          >
            <Icon className="mr-1.5" name="sparks" size={12} />
            Make with AI
          </Button>
        </div>
      </NavbarComp.Content>

      <NavbarComp.Footer>
        <NavbarUser.Root
          username={currentUser?.display_name || currentUser?.uid || ''}
          email={currentUser?.email}
          url={currentUser?.url}
          menuItems={[
            {
              key: 0,
              element: <Link to="/sandbox/settings/profile/general">Settings</Link>
            },
            {
              key: 1,
              element: <Link to="/logout">Log out</Link>
            }
          ]}
        />
      </NavbarComp.Footer>
    </NavbarComp.Root>
  )
}
