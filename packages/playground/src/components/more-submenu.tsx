import { Navbar, Sheet, SheetContent, Icon, Spacer, SheetTitle } from '@harnessio/canary'
import { navbarMenuData } from '../data/mockNavbarMenuData'
import { NavLink } from 'react-router-dom'
import { MenuGroup } from './navbar/types'

interface MoreSubmenuProps {
  showMoreMenu: boolean
  handleMoreMenu: () => void
  items: MenuGroup[]
}

export function MoreSubmenu({ showMoreMenu, handleMoreMenu, items }: MoreSubmenuProps) {
  return (
    <Sheet modal={false} open={showMoreMenu}>
      <SheetContent
        className="inset-y-0 left-[220px] z-40 h-screen w-[328px] bg-transparent p-0"
        side="left"
        onClick={handleMoreMenu}
        modal={false}>
        <SheetTitle className="sr-only">More Menu</SheetTitle>
        <Navbar.Root className="w-[328px]" isSubMenu>
          <Navbar.Content>
            <Spacer size={9} />
            {items.map((group, group_idx) => (
              <Navbar.Group key={group.groupId} topBorder={group_idx > 0} title={group.title} isSubMenu>
                {group.items.map(item => (
                  <NavLink key={item.id} to={item.to || ''}>
                    {({ isActive }) => (
                      <Navbar.Item
                        text={item.title || ''}
                        description={item.description || ''}
                        submenuItem
                        icon={<Icon name={item.iconName} size={18} />}
                        active={isActive}
                      />
                    )}
                  </NavLink>
                ))}
              </Navbar.Group>
            ))}
          </Navbar.Content>
        </Navbar.Root>
      </SheetContent>
    </Sheet>
  )
}
