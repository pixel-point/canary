import React from 'react'
import { Navbar, Sheet, SheetContent, Icon, Spacer } from '@harnessio/canary'
import { navbarSubmenuData } from '../data/mockNavbarSubmenuData'
import { NavLink } from 'react-router-dom'

interface MoreSubmenuProps {
  showMore: boolean
  handleMore: () => void
}

export function MoreSubmenu({ showMore, handleMore }: MoreSubmenuProps) {
  return (
    <Sheet
      modal={false}
      open={showMore}
      onOpenChange={handleMore}
    >
      <SheetContent side="left" className="p-0 w-[328px] h-screen left-[220px] top-0 bottom-0 z-40 bg-transparent">
        <Navbar.Root
          className="w-[328px]"
          isSubMenu
        >
          <Navbar.Content>
            <Spacer size={9} />
            {navbarSubmenuData.map((group, group_idx) => (
              <Navbar.Group
                key={group.groupId}
                topBorder={group_idx > 0}
                title={group.title}
                isSubMenu
              >
                {group.items.map(item => (
                  <NavLink
                    key={item.id}
                    to={item.to || ''}
                  >
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
