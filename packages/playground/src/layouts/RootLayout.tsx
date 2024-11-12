import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MoreSubmenu } from '../components/more-submenu'
import { TypesUser } from './types'
import { Navbar } from '../components/navbar'
import { SystemAdminMenu } from '../components/system-admin-menu'

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
      <div className="grid md:grid-cols-[220px_minmax(900px,_1fr)] min-w-screen">
        <Navbar
          showMore={showMore}
          showSystemAdmin={showSystemAdmin}
          handleMore={handleMore}
          handleSystemAdmin={handleSystemAdmin}
          currentUser={currentUser}
        />
        <main className="col-start-2 min-h-screen box-border overflow-y-scroll overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <MoreSubmenu showMore={showMore} handleMore={handleMore} />
      <SystemAdminMenu showSystemAdmin={showSystemAdmin} handleSystemAdmin={handleSystemAdmin} />
    </>
  )
}
