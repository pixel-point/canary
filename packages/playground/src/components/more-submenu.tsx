<<<<<<< HEAD
import { useState } from 'react'
import { Navbar, Sheet, SheetContent, Icon, Text, Spacer, cn, IconProps } from '@harnessio/canary'
=======
import React from 'react'
import { Navbar, Sheet, SheetContent, Icon, Spacer, SheetTitle } from '@harnessio/canary'
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
import { navbarSubmenuData } from '../data/mockNavbarSubmenuData'
import { NavLink } from 'react-router-dom'

interface MoreSubmenuProps {
  showMore: boolean
  handleMore: () => void
}

export function MoreSubmenu({ showMore, handleMore }: MoreSubmenuProps) {
  return (
<<<<<<< HEAD
    <div
      className={cn(
        'bg-background border-primary/10 text-primary/80 relative flex h-8 w-8 place-content-center place-items-center rounded-md border',
        { 'text-success': iconName === 'pin' },
        { 'text-destructive': iconName === 'unpin' }
      )}>
      <Icon name={iconName} size={16} />
    </div>
  )
}

export function MoreSubmenu({ showMore, handleMore, onPinItem, pinnedItems }: MoreSubmenuProps) {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null)

  return (
    <Sheet modal={false} open={showMore} onOpenChange={handleMore}>
      <SheetContent side="left" className="inset-y-0 left-[220px] z-40 h-screen w-[328px] p-0">
        <Navbar.Root className="w-[328px]">
=======
    <Sheet modal={false} open={showMore}>
      <SheetContent
        className="inset-y-0 left-[220px] z-40 h-screen w-[328px] bg-transparent p-0"
        side="left"
        onClick={handleMore}
        modal={false}>
        <SheetTitle className="sr-only">More Menu</SheetTitle>
        <Navbar.Root className="w-[328px]" isSubMenu>
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
          <Navbar.Content>
            <Spacer size={9} />
            {navbarSubmenuData.map((group, group_idx) => (
<<<<<<< HEAD
              <Navbar.Group topBorder={group_idx > 0} key={group.groupId}>
                <Text size={1} color="tertiaryBackground" className="opacity-60">
                  {group.title}
                </Text>
                <Spacer size={1} />
                {group.items.map(item => {
                  const isPinned = pinnedItems?.some(pinned => pinned.id === item.id)
                  const isHovered = hoveredItemId === item.id
                  const iconName = isPinned ? (isHovered ? 'unpin' : item.iconName) : isHovered ? 'pin' : item.iconName

                  return (
                    <div
                      role="button"
                      tabIndex={0}
                      key={`${group.groupId}-${item.id}`}
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                      onClick={() => onPinItem(item)}
                      className={cn(
                        'cursor-pointer',
                        { 'text-primary opacity-40': isPinned },
                        { 'text-primary opacity-100': isHovered }
                      )}>
=======
              <Navbar.Group key={group.groupId} topBorder={group_idx > 0} title={group.title} isSubMenu>
                {group.items.map(item => (
                  <NavLink key={item.id} to={item.to || ''}>
                    {({ isActive }) => (
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
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
