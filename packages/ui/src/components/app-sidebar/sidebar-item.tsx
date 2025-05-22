import { DropdownMenu, Icon, IconProps, Sidebar, Text, useSidebar } from '@/components'
import { useRouterContext, useTranslation } from '@/context'

const dropdownItemClassNames =
  'text-sidebar-foreground-6 data-[highlighted]:bg-sidebar-background-2 data-[highlighted]:text-sidebar-foreground-1'

interface NavbarItemType {
  id: number | string
  title: string
  iconName?: IconProps['name']
  description?: string
  to: string
  permanentlyPinned?: boolean
}

interface NavbarItemProps {
  item: NavbarItemType
  isRecent?: boolean
  handleChangePinnedMenuItem: (item: NavbarItemType, pin: boolean) => void
  handleRemoveRecentMenuItem: (item: NavbarItemType) => void
  handleCustomNav: () => void
}

export const SidebarItem = ({
  item,
  isRecent = false,
  handleChangePinnedMenuItem,
  handleRemoveRecentMenuItem,
  handleCustomNav
}: NavbarItemProps) => {
  const { t } = useTranslation()
  const { NavLink } = useRouterContext()
  const { collapsed } = useSidebar()

  const iconName = item.iconName && (item.iconName.replace('-gradient', '') as IconProps['name'])

  const handlePin = () => {
    handleChangePinnedMenuItem(item, isRecent)
  }

  const handleRemoveRecent = () => {
    handleRemoveRecentMenuItem(item)
  }

  const dropdownItems = isRecent ? (
    <>
      <DropdownMenu.Item className={dropdownItemClassNames} onSelect={handlePin}>
        <Text size={2} truncate color="inherit">
          {t('component:navbar.pin', 'Pin')}
        </Text>
      </DropdownMenu.Item>
      <DropdownMenu.Item className={dropdownItemClassNames} onSelect={handleRemoveRecent}>
        <Text size={2} truncate color="inherit">
          {t('component:navbar.remove', 'Remove')}
        </Text>
      </DropdownMenu.Item>
    </>
  ) : (
    <>
      <DropdownMenu.Item className={dropdownItemClassNames} onSelect={handleCustomNav}>
        <Text size={2} truncate color="inherit">
          {t('component:navbar.reorder', 'Reorder')}
        </Text>
      </DropdownMenu.Item>

      {!item.permanentlyPinned && (
        <DropdownMenu.Item className={dropdownItemClassNames} onSelect={handlePin}>
          <Text size={2} truncate color="inherit">
            {t('component:navbar.unpin', 'Unpin')}
          </Text>
        </DropdownMenu.Item>
      )}
    </>
  )

  return (
    <Sidebar.MenuItem>
      <NavLink className="block" to={item.to || ''} end>
        {({ isActive }) => (
          <Sidebar.MenuButton asChild isActive={isActive}>
            <Sidebar.MenuItemText
              text={item.title}
              icon={iconName && <Icon name={iconName} size={14} />}
              active={isActive}
            />
          </Sidebar.MenuButton>
        )}
      </NavLink>

      {!collapsed && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Sidebar.MenuAction className="right-[3px] text-sidebar-icon-3 hover:text-sidebar-icon-1" showOnHover>
              <Icon name="menu-dots" size={12} />
            </Sidebar.MenuAction>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="w-[128px] border-sidebar-border-3 bg-sidebar-background-4"
            align="end"
            sideOffset={3}
            alignOffset={4}
          >
            {dropdownItems}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Sidebar.MenuItem>
  )
}
