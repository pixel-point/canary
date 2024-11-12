<<<<<<< HEAD
import { Navbar, Icon, NavbarProjectChooser, NavbarUser, IconProps } from '@harnessio/canary'
import { useState } from 'react'
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom'
=======
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
import { MoreSubmenu } from '../components/more-submenu'
import type { TypesUser } from './types'
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
<<<<<<< HEAD
      <div className="min-w-screen bg-background grid md:grid-cols-[220px_minmax(900px,_1fr)]">
        {showNavbar && (
          <Navbar.Root className="fixed inset-y-0 left-0 z-50 max-md:hidden">
            <Navbar.Header>
              <NavbarProjectChooser.Root
                avatarLink={
                  <Link to="/">
                    <Icon name="harness" size={18} className="text-primary" />
                  </Link>
                }
                productLink={
                  <Link to="/">
                    <Icon name="harness-logo-text" width={65} height={15} className="text-primary" />
                  </Link>
                }
              />
            </Navbar.Header>
            <Navbar.Content>
              <Navbar.Group>
                {primaryMenuItems.map((item, idx) => (
                  <NavLink key={idx} to={item.to || ''}>
                    {({ isActive }) => <Navbar.Item key={idx} text={item.text} icon={item.icon} active={isActive} />}
                  </NavLink>
                ))}
                <div role="button" tabIndex={0} onClick={() => (!showMore ? handleMore() : null)}>
                  <Navbar.Item text="More" icon={<Icon name="ellipsis" size={12} />} />
                </div>
              </Navbar.Group>
              <Navbar.AccordionGroup title="Pinned">
                {pinnedItems.map(item => (
                  <NavLink key={item.id} to={item.to || ''}>
                    {({ isActive }) => (
                      <Navbar.Item
                        key={item.id}
                        text={item.title}
                        icon={<Icon name={item.iconName} size={12} />}
                        active={isActive}
                      />
                    )}
                  </NavLink>
                ))}
              </Navbar.AccordionGroup>
              {/* Sandboxed new layout examples */}
              <Navbar.AccordionGroup title="Layout Sandbox">
                <NavLink to="/sandbox/landing">
                  <Navbar.Item text="Landing" icon={<Icon name="harness" size={12} />} />
                </NavLink>
                <NavLink to="/sandbox/repos">
                  <Navbar.Item text="Repo List" icon={<Icon name="repositories" size={12} />} />
                </NavLink>
                <NavLink to="/sandbox/repos/drone/summary">
                  <Navbar.Item
                    text="Repo&nbsp;&nbsp;/&nbsp;&nbsp;Summary"
                    icon={<Icon name="repositories" size={12} />}
                  />
                </NavLink>
                <NavLink to="/sandbox/repos/drone/code">
                  <Navbar.Item text="Repo&nbsp;&nbsp;/&nbsp;&nbsp;Code" icon={<Icon name="repositories" size={12} />} />
                </NavLink>
                <NavLink to="/sandbox/executions">
                  <Navbar.Item text="Executions" icon={<Icon name="cog-6" size={12} />} />
                </NavLink>
                <NavLink to="/sandbox/repos/create">
                  <Navbar.Item text="Create repository" icon={<Icon name="repositories" size={12} />} />
                </NavLink>
                <NavLink to="/sandbox/repos/drone/pull-requests/compare">
                  <Navbar.Item text="Create pull request" icon={<Icon name="pr-open" size={12} />} />
                </NavLink>
                <NavLink to="/sandbox/settings/account">
                  <Navbar.Item text="Account settings" icon={<Icon name="cog-6" size={12} />} />
                </NavLink>
                <NavLink to="/sandbox/settings/project">
                  <Navbar.Item text="Project settings" icon={<Icon name="cog-6" size={12} />} />
                </NavLink>
              </Navbar.AccordionGroup>
            </Navbar.Content>
            <Navbar.Footer>
              <NavbarUser.Root
                username={currentUser?.display_name || currentUser?.uid}
                isAdmin={currentUser?.admin || false}
                url={currentUser?.url || ''}
                menuItems={[
                  {
                    key: 0,
                    element: <Link to="/sandbox/settings/profile/general">Settings</Link>
                  },
                  {
                    key: 1,
                    element: <Link to="/logout">Log out</Link>
                  }
                ]}
              />
            </Navbar.Footer>
          </Navbar.Root>
        )}
=======
      <div className="min-w-screen grid md:grid-cols-[220px_minmax(900px,_1fr)]">
        <Navbar
          showMore={showMore}
          showSystemAdmin={showSystemAdmin}
          handleMore={handleMore}
          handleSystemAdmin={handleSystemAdmin}
          currentUser={currentUser}
        />
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
        <main className="col-start-2 box-border min-h-screen overflow-x-hidden overflow-y-scroll">
          <Outlet />
        </main>
      </div>
      <MoreSubmenu showMore={showMore} handleMore={handleMore} />
      <SystemAdminMenu showSystemAdmin={showSystemAdmin} handleSystemAdmin={handleSystemAdmin} />
    </>
  )
}
