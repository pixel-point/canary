import { NavLink } from 'react-router-dom'
import { Icon, IconProps, Navbar as NavbarComp } from '@harnessio/canary'
import { NavbarItemControls } from '../navbar-item-controls'
import type {
  NavbarItemControlsProps,
  NavbarLinkBaseProps,
  PinnedLinkProps,
  RecentLinkProps
} from '../navbar-item-controls'

export type NavBarLinkProps = NavbarLinkBaseProps | PinnedLinkProps | RecentLinkProps

export const NavBarLink = (props: NavBarLinkProps) => {
  const { item } = props
  const iconName = item.iconName.replace('-gradient', '') as IconProps['name']

  return (
    <div className="group/item relative">
      <NavLink to={item.to || ''}>
        {({ isActive }) => (
          <NavbarComp.Item text={item.title} icon={<Icon name={iconName} size={12} />} active={isActive} />
        )}
      </NavLink>
      {'isPinned' in props || 'isRecent' in props ? (
        <NavbarItemControls {...(props as NavbarItemControlsProps)} />
      ) : null}
    </div>
  )
}
