import { Icon, Navbar, Sheet, SheetContent, Spacer } from '@harnessio/canary'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { systemAdminMenuData } from '../data/mockSystemAsminMenuData'

interface SystemAdminMenuProps {
  showSystemAdmin: boolean,
  handleSystemAdmin: () => void
}

export const SystemAdminMenu = ({
  showSystemAdmin,
  handleSystemAdmin
}: SystemAdminMenuProps) => {
  return (
    <Sheet
      modal={false}
      open={showSystemAdmin}
      onOpenChange={handleSystemAdmin}
    >
      <SheetContent side="left" className="p-0 w-[364px] h-screen left-[220px] top-0 bottom-0 z-40 bg-transparent">
        <Navbar.Root
          className="w-[364px]"
          isSubMenu
        >
          <Navbar.Content>
            <Spacer size={9} />
            {systemAdminMenuData.map((group, group_idx) => (
              <Navbar.Group
                key={group.groupId}
                topBorder={group_idx > 0}
                title={group.title}
              >
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {group.items.map(item => (
                    <NavLink
                      key={item.id}
                      to={item.to || ''}
                    >
                      {({ isActive }) => (
                        <Navbar.Item
                          text={item.title || ''}
                          icon={<Icon name={item.iconName} size={12} />}
                          active={isActive}
                        />
                      )}
                    </NavLink>
                  ))}
                </div>
              </Navbar.Group>
            ))}
          </Navbar.Content>
        </Navbar.Root>
      </SheetContent>
    </Sheet>
  )
}
