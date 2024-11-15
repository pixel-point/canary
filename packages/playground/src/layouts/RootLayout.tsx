import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MoreSubmenu } from '../components/more-submenu'
import { TypesUser } from './types'
import { ManageNavigationDialog } from '../components/manage-navigation-dialog'

export interface NavbarItem {
  id: number
  title: string
  iconName: IconProps['name']
  description: string
  to?: string
}
import { Navbar } from '../components/navbar'
import { SystemAdminMenu } from '../components/system-admin-menu'
import { IconProps } from '@harnessio/canary'

interface RootLayoutProps {
  currentUser: TypesUser | undefined
}

export const RootLayout: React.FC<RootLayoutProps> = ({ currentUser }) => {
  const [showMore, setShowMore] = useState(false)
  const [showSystemAdmin, setShowSystemAdmin] = useState(false)

  const handleMore = () => {
    setShowSystemAdmin(false)
    setShowMore(prevState => !prevState)
  }

  const handleSystemAdmin = () => {
    setShowMore(false)
    setShowSystemAdmin(prevState => !prevState)
  }

  // const handlePinItem = (item: NavbarItem) => {
  //   setPinnedItems(prevPinnedItems => {
  //     const isPinned = prevPinnedItems.some(pinned => pinned.id === item.id)
  //
  //     if (isPinned) {
  //       return prevPinnedItems.filter(pinned => pinned.id !== item.id)
  //     }
  //
  //     const itemToPin = navbarSubmenuData.flatMap(group => group.items).find(i => i.id === item.id)
  //
  //     if (itemToPin) {
  //       return [
  //         {
  //           id: itemToPin.id,
  //           title: itemToPin.title,
  //           iconName: itemToPin.iconName,
  //           description: itemToPin.description,
  //           to: itemToPin.to || ''
  //         },
  //         ...prevPinnedItems
  //       ]
  //     }
  //
  //     return prevPinnedItems
  //   })
  // }

  return (
    <>
      <div className="min-w-screen grid md:grid-cols-[220px_minmax(900px,_1fr)]">
        <Navbar
          showMore={showMore}
          showSystemAdmin={showSystemAdmin}
          handleMore={handleMore}
          handleSystemAdmin={handleSystemAdmin}
          currentUser={currentUser}
        />
        <main className="col-start-2 box-border min-h-screen overflow-x-hidden overflow-y-scroll">
          <Outlet />
        </main>
      </div>
      <MoreSubmenu showMore={showMore} handleMore={handleMore} />
      <SystemAdminMenu showSystemAdmin={showSystemAdmin} handleSystemAdmin={handleSystemAdmin} />
      {location.pathname === '/repos' && (
        <ManageNavigationDialog
          isSubmitting={false}
          submitted={false}
          pinnedItems={[]}
          updatePinnedItems={() => {}}
          onSave={() => {}}
          onClose={() => {}}
        />
      )}
    </>
  )
}
