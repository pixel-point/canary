import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MoreSubmenu } from '../components/more-submenu'
import { TypesUser } from './types'
import { Navbar } from '../components/navbar'
import { SettingsMenu } from '../components/settings-menu'
import { ManageNavigation } from '../components/manage-navigation'
import { navbarMenuData } from '../data/mockNavbarMenuData'
import { MenuGroup, MenuGroupTypes, NavbarItem } from '../components/navbar/types'
import { pinnedMenuItemsData, recentMenuItemsData } from '../data/mockPinnedAndRecentMenuData'

interface RootLayoutProps {
  currentUser: TypesUser | undefined
}

export const RootLayout = ({ currentUser }: RootLayoutProps) => {
  const location = useLocation()
  const [recentMenuItems, setRecentMenuItems] = useState<NavbarItem[]>(recentMenuItemsData)
  const [pinnedMenuItems, setPinnedMenuItems] = useState<NavbarItem[]>(pinnedMenuItemsData)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showSettingMenu, setShowSettingMenu] = useState(false)
  const [showCustomNav, setShowCustomNav] = useState(false)

  /**
   * Map mock data menu by type to Settings and More
   */
  const { moreMenu, settingsMenu } = useMemo(() => {
    return navbarMenuData.reduce<{
      moreMenu: MenuGroup[]
      settingsMenu: MenuGroup[]
    }>(
      (acc, item) => {
        if (item.type === MenuGroupTypes.SETTINGS) {
          acc.settingsMenu.push(item)
        } else {
          acc.moreMenu.push(item)
        }

        return acc
      },
      {
        moreMenu: [],
        settingsMenu: []
      }
    )
  }, [])

  // TODO: add log out func
  const handleLogOut = useCallback(() => {}, [])

  const handlePinItem = useCallback((item: NavbarItem) => {
    setPinnedMenuItems(prevItems => [item, ...prevItems])
    setRecentMenuItems(prevItems => prevItems.filter(recent => recent.id !== item.id))
  }, [])

  const handleUnpinItem = useCallback((item: NavbarItem) => {
    setPinnedMenuItems(prevItems => prevItems.filter(pinned => pinned.id !== item.id))
  }, [])

  const handleRemoveRecentItem = useCallback((item: NavbarItem) => {
    setRecentMenuItems(prevItems => prevItems.filter(recent => recent.id !== item.id))
  }, [])

  /**
   * Handle save recent and pinned items
   */
  const handleSave = (recentItems: NavbarItem[], currentPinnedItems: NavbarItem[]) => {
    setRecentMenuItems(recentItems)
    setPinnedMenuItems(currentPinnedItems)
  }

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
          recentMenuItems={recentMenuItems}
          pinnedMenuItems={pinnedMenuItems}
          handlePinItem={handlePinItem}
          handleUnpinItem={handleUnpinItem}
          handleRemoveRecentItem={handleRemoveRecentItem}
        />
        <main className="col-start-2 box-border min-h-screen overflow-x-hidden overflow-y-scroll">
          <Outlet />
        </main>
      </div>
      <MoreSubmenu showMoreMenu={showMoreMenu} handleMoreMenu={handleMoreMenu} items={moreMenu} />
      <SettingsMenu showSettingMenu={showSettingMenu} handleSettingsMenu={handleSettingsMenu} items={settingsMenu} />
      <ManageNavigation
        pinnedItems={pinnedMenuItems}
        recentItems={recentMenuItems}
        navbarMenuData={navbarMenuData}
        showManageNavigation={showCustomNav}
        isSubmitting={false}
        submitted={false}
        onSave={handleSave}
        onClose={handleCustomNav}
      />
    </>
  )
}
