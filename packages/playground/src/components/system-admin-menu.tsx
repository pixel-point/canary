import { Icon, Navbar, Sheet, SheetContent, Spacer } from '@harnessio/canary'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { systemAdminMenuData } from '../data/mockSystemAsminMenuData'

interface SystemAdminMenuProps {
  showSystemAdmin: boolean
  handleSystemAdmin: () => void
}

export const SystemAdminMenu = ({ showSystemAdmin, handleSystemAdmin }: SystemAdminMenuProps) => {
  return (
    <Sheet modal={false} open={showSystemAdmin} onOpenChange={handleSystemAdmin}>
      <SheetContent side="left" className="inset-y-0 left-[220px] z-40 h-screen w-[364px] bg-transparent p-0">
        <Navbar.Root className="w-[364px]" isSubMenu>
          <Navbar.Content>
            <Spacer size={9} />
            {systemAdminMenuData.map((group, group_idx) => (
              <Navbar.Group key={group.groupId} topBorder={group_idx > 0} title={group.title}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {group.items.map(item => (
                    <NavLink key={item.id} to={item.to || ''}>
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
