import { FC, useEffect, useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { NavbarItemType, Toaster, useSidebar } from '@harnessio/ui/components'
import { useTranslation } from '@harnessio/ui/context'
import { MainContentLayout } from '@harnessio/ui/views'

import { useNav } from '../../components/stores/recent-pinned-nav-links.store'
import { getNavbarMenuData } from '../../data/navbar-menu-data'
import { getPinnedMenuItemsData } from '../../data/pinned-items'
import { useRoutes } from '../../framework/context/NavigationContext'
import { useLocationChange } from '../../framework/hooks/useLocationChange'
import { useRepoImportEvents } from '../../framework/hooks/useRepoImportEvent'
import { useSelectedSpaceId } from '../../framework/hooks/useSelectedSpaceId'
import { PathParams } from '../../RouteDefinitions'
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs'
import { useGetBreadcrumbs } from '../breadcrumbs/useGetBreadcrumbs'
import { AppSideBar } from './side-bar'

interface NavLinkStorageInterface {
  state: {
    recent: NavbarItemType[]
    pinned: NavbarItemType[]
  }
}

export const AppShell: FC = () => {
  const { isMobile } = useSidebar()
  const routes = useRoutes()
  const { spaceId } = useParams<PathParams>()
  const { pinnedMenu, setRecent, setNavLinks } = useNav()
  const { t } = useTranslation()
  const selectedSpaceId = useSelectedSpaceId(spaceId)
  const spaceIdPathParam = spaceId ?? selectedSpaceId ?? ''

  const { breadcrumbs } = useGetBreadcrumbs()

  const pinnedMenuItemsData = useMemo(
    () => getPinnedMenuItemsData({ t, routes, spaceId: spaceIdPathParam }),
    [t, routes, spaceIdPathParam]
  )

  useLocationChange({ t, onRouteChange: setRecent, getNavbarMenuData })

  useEffect(() => {
    const linksFromStorage = localStorage.getItem('nav-items')
    let parsedLinksFromStorage: NavLinkStorageInterface | undefined

    if (linksFromStorage) {
      parsedLinksFromStorage = JSON.parse(linksFromStorage)
    }

    /**
     * Logic for setting initial pinned links
     *
     * setting initial pinned link only if no pinned links are stored in local storage.
     * Pinned links cannot be empty as we will have some links permanantly.
     */
    if (parsedLinksFromStorage && !parsedLinksFromStorage?.state?.pinned?.length) {
      const pinnedItems = pinnedMenu.filter(
        item => !pinnedMenuItemsData.some(staticPinned => staticPinned.id === item.id)
      )
      setNavLinks({ pinnedMenu: [...pinnedMenuItemsData, ...pinnedItems] })
    }
  }, [spaceIdPathParam])

  useRepoImportEvents()

  return (
    <>
      <AppSideBar>
        <Breadcrumbs breadcrumbs={breadcrumbs} isMobile={isMobile} withMobileSidebarToggle />
        <MainContentLayout useSidebar={useSidebar} withBreadcrumbs={breadcrumbs.length > 0}>
          <Outlet />
        </MainContentLayout>
      </AppSideBar>
      <Toaster />
    </>
  )
}
