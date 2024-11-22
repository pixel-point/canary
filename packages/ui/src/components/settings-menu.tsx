import { NavLink } from 'react-router-dom'

import { Navbar } from '.'
import { settingsMenuData } from '../data/systemAdminSubmenuData'
import { Icon } from './icon'
import { Sheet, SheetContent, SheetTitle } from './sheet'
import { Spacer } from './spacer'

interface SystemAdminMenuProps {
  showSystemAdmin: boolean
  handleSystemAdmin: () => void
}

export const SettingsMenu = ({ showSystemAdmin, handleSystemAdmin }: SystemAdminMenuProps) => {
  return (
    <Sheet modal={false} open={showSystemAdmin}>
      <SheetContent
        className="inset-y-0 left-[220px] z-40 h-screen w-[364px] bg-transparent p-0"
        side="left"
        onClick={handleSystemAdmin}
        modal={false}
      >
        <SheetTitle className="sr-only">System Administration menu</SheetTitle>
        <Navbar.Root className="w-[364px]" isSubMenu>
          <Navbar.Content>
            <Spacer size={9} />
            {settingsMenuData.map((group, group_idx) => (
              <Navbar.Group key={group.groupId} topBorder={group_idx > 0} title={group.title} titleClassName="mb-1.5">
                <div className="grid grid-cols-2 gap-x-6 gap-y-[0.6875rem]">
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
