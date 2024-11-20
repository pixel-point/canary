import { IconProps } from '@harnessio/canary'

export enum MenuGroupTypes {
  GENERAL = 'general',
  SETTINGS = 'settings'
}

export interface MenuGroup {
  groupId: number | string
  title: string
  type: MenuGroupTypes
  items: NavbarItem[]
}

export interface NavbarItem {
  id: number | string
  title: string
  iconName: IconProps['name']
  description?: string
  to: string
}

export type NavbarItemStatic = Pick<NavbarItem, 'title' | 'iconName' | 'to'>

export enum UserMenuKeys {
  ACCOUNT = 'account',
  THEME = 'theme',
  CUSTOM_NAV = 'customNavigation',
  ADMINISTRATION = 'administration',
  LOG_OUT = 'logOut'
}

export interface UserMenuItem {
  key: UserMenuKeys
  iconName: IconProps['name']
  title: string
  to: string | null
  isSeparated: boolean
}
