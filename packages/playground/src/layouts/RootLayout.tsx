import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MoreSubmenu } from '../components/more-submenu'
import type { TypesUser } from './types'
import { Navbar } from '../components/navbar'
import { SettingsMenu } from '../components/settings-menu'

interface RootLayoutProps {
  currentUser: TypesUser | undefined
}

export const RootLayout: React.FC<RootLayoutProps> = ({ currentUser }) => {
  const location = useLocation()
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

  useEffect(() => {
    setShowMore(false)
    setShowSystemAdmin(false)
  }, [location])

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
      <SettingsMenu showSystemAdmin={showSystemAdmin} handleSystemAdmin={handleSystemAdmin} />
    </>
  )
}
