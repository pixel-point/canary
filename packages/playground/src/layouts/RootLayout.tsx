import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MoreSubmenu } from '../components/more-submenu'
import { TypesUser } from './types'
import { Navbar } from '../components/navbar'
import { SettingsMenu } from '../components/settings-menu'
import { ManageNavigationDialog } from '../components/manage-navigation-dialog'

interface RootLayoutProps {
  currentUser: TypesUser | undefined
}

export const RootLayout = ({ currentUser }: RootLayoutProps) => {
  const location = useLocation()
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showSettingMenu, setShowSettingMenu] = useState(false)
  const [showCustomNav, setShowCustomNav] = useState(false)

  // TODO: add log out func
  const handleLogOut = useCallback(() => {}, [])

  /**
   * Toggle show more menu
   */
  const handleMoreMenu = useCallback(() => {
    setShowSettingMenu(false)
    setShowMoreMenu(prevState => !prevState)
  }, [])

  /**
   * Toggle system settings menu
   */
  const handleSettingsMenu = useCallback(() => {
    setShowMoreMenu(false)
    setShowSettingMenu(prevState => !prevState)
  }, [])

  /**
   * Toggle custom navigation modal
   */
  const handleCustomNav = useCallback(() => {
    setShowCustomNav(prevState => !prevState)
  }, [])

  /**
   * Close all menu when location changed
   */
  useEffect(() => {
    setShowMoreMenu(false)
    setShowSettingMenu(false)
    setShowCustomNav(false)
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
          showMoreMenu={showMoreMenu}
          showSettingMenu={showSettingMenu}
          handleMoreMenu={handleMoreMenu}
          handleSettingsMenu={handleSettingsMenu}
          currentUser={currentUser}
          handleCustomNav={handleCustomNav}
          handleLogOut={handleLogOut}
        />
        <main className="col-start-2 box-border min-h-screen overflow-x-hidden overflow-y-scroll">
          <Outlet />
        </main>
      </div>
      <MoreSubmenu showMoreMenu={showMoreMenu} handleMoreMenu={handleMoreMenu} />
      <SettingsMenu showSettingMenu={showSettingMenu} handleSettingsMenu={handleSettingsMenu} />
      <ManageNavigationDialog
        isSubmitting={false}
        submitted={false}
        // pinnedItems={[]}
        // updatePinnedItems={() => {}}
        onSave={() => {}}
        showManageNavigationDialog={showCustomNav}
        onClose={handleCustomNav}
        // recentItems={[]}
        handleClearRecent={() => {}}
      />
    </>
  )
}
