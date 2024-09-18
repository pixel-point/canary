import React from 'react'
import { Navbar, Sheet, SheetContent, Icon, Text, Spacer } from '@harnessio/canary'
import { navbarSubmenuData } from '../data/mockNavbarSubmenuData'

interface MoreSubmenuProps {
  showMore: boolean
  handleMore: () => void
}

export function MoreSubmenu({ ...props }: MoreSubmenuProps) {
  const { showMore, handleMore } = props

  return (
    <Sheet modal={false} open={showMore} onOpenChange={handleMore}>
      <SheetContent side="left" className="p-0 w-[328px] h-screen left-[220px] top-0 bottom-0 z-40">
        <Navbar.Root className="w-[328px]">
          <Navbar.Content>
            <Spacer size={8} />
            {navbarSubmenuData.map((group, group_idx) => {
              return (
                <Navbar.Group topBorder={group_idx > 0} key={group.groupId}>
                  <Text size={1} color="tertiaryBackground" className="opacity-60">
                    {group.title}
                  </Text>
                  <Spacer size={1} />
                  <>
                    {group.items.map(item => {
                      return (
                        <div key={group.groupId + '-' + item.id}>
                          <Navbar.Item
                            text={item.title || ''}
                            description={item.description || ''}
                            submenuItem
                            icon={<Icon name={item.iconName} size={32} />}></Navbar.Item>
                        </div>
                      )
                    })}
                  </>
                </Navbar.Group>
              )
            })}
          </Navbar.Content>
        </Navbar.Root>
      </SheetContent>
    </Sheet>
  )
}
