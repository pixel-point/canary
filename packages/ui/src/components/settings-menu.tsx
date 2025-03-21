import { Icon, NavbarSkeleton, ScrollArea, Sheet, Spacer } from '@/components'
import { useRouterContext } from '@/context'
import { MenuGroupType } from '@components/app-sidebar/types'

interface SystemAdminMenuProps {
  showSettingMenu: boolean
  handleSettingsMenu: () => void
  items: MenuGroupType[]
}

export const SettingsMenu = ({ showSettingMenu, handleSettingsMenu, items }: SystemAdminMenuProps) => {
  const { NavLink } = useRouterContext()
  return (
    <Sheet.Root modal={false} open={showSettingMenu}>
      <Sheet.Content
        className="inset-y-0 left-[220px] z-40 h-screen w-[364px] bg-transparent p-0"
        closeClassName="text-sidebar-icon-3 hover:text-sidebar-icon-1"
        side="left"
        onClick={handleSettingsMenu}
        modal={false}
      >
        <Sheet.Title className="sr-only">System Administration menu</Sheet.Title>
        <NavbarSkeleton.Root className="w-[364px]" isSubMenu>
          <NavbarSkeleton.Content className="overflow-hidden">
            <ScrollArea scrollThumbClassName="bg-sidebar-background-8">
              <Spacer size={9} />
              {items.map((group, group_idx) => (
                <NavbarSkeleton.Group
                  key={group.groupId}
                  topBorder={group_idx > 0}
                  title={group.title}
                  titleClassName="mb-1.5"
                  isMainNav
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-[0.6875rem]">
                    {group.items.map(item => (
                      <NavLink key={item.id} to={item.to || ''}>
                        {({ isActive }) => (
                          <NavbarSkeleton.Item
                            text={item.title || ''}
                            icon={item.iconName && <Icon name={item.iconName} size={12} />}
                            active={isActive}
                            isMainNav
                          />
                        )}
                      </NavLink>
                    ))}
                  </div>
                </NavbarSkeleton.Group>
              ))}
              <Spacer size={11} />
            </ScrollArea>
          </NavbarSkeleton.Content>
        </NavbarSkeleton.Root>
      </Sheet.Content>
    </Sheet.Root>
  )
}
