import { NavLink } from 'react-router-dom'
import { Icon, Navbar as NavbarComp } from '@harnessio/canary'
import { NavbarItem, NavbarItemStatic } from '../types'

export const NavBarLink = (item: NavbarItem | NavbarItemStatic) => {
  return (
    <NavLink to={item.to || ''}>
      {({ isActive }) => (
        <NavbarComp.Item text={item.title} icon={<Icon name={item.iconName} size={12} />} active={isActive} />
      )}
    </NavLink>
  )
}
