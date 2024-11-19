import { NavbarItem, NavbarItemStatic, UserMenuItem, UserMenuKeys } from './types'

export const adminMenuItem: Omit<NavbarItemStatic, 'to'> = {
  title: 'Settings',
  iconName: 'settings-1'
}

export const primaryMenuItems: NavbarItemStatic[] = [
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
  }
]

export const initialPinnedMenuItems: NavbarItem[] = [
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

export const userMenuItems: UserMenuItem[] = [
  {
    key: UserMenuKeys.ACCOUNT,
    iconName: 'user',
    title: 'Account',
    to: '/account',
    isSeparated: false
  },
  {
    key: UserMenuKeys.THEME,
    iconName: 'paint',
    title: 'Theme',
    to: '/theme',
    isSeparated: false
  },
  {
    key: UserMenuKeys.CUSTOM_NAV,
    iconName: 'navigation',
    title: 'Customize navigation',
    to: null,
    isSeparated: false
  },
  {
    key: UserMenuKeys.ADMINISTRATION,
    iconName: 'settings-1',
    title: 'Administration',
    to: '/sandbox/settings/profile/general',
    isSeparated: true
  },
  {
    key: UserMenuKeys.LOG_OUT,
    iconName: 'logOut',
    title: 'Log out',
    to: null,
    isSeparated: true
  }
]
