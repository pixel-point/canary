import { IconProps } from '@harnessio/canary'

export enum MenuGroupTypes {
  GENERAL = 'general',
  SETTINGS = 'settings'
}

export interface MenuGroupType {
  groupId: number | string
  title: string
  type: MenuGroupTypes
  items: NavbarItemType[]
}

export interface NavbarItemType {
  id: number | string
  title: string
  iconName: IconProps['name']
  description?: string
  to: string
}

export enum UserMenuKeys {
  ACCOUNT = 'account',
  THEME = 'theme',
  CUSTOM_NAV = 'customNavigation',
  ADMINISTRATION = 'administration',
  LOG_OUT = 'logOut'
}

export interface UserMenuItemType {
  key: UserMenuKeys
  iconName: IconProps['name']
  title: string
  to: string | null
  isSeparated: boolean
}
