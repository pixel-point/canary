// RootLayout.tsx
import { Navbar, Icon, NavbarProjectChooser, NavbarUser } from '@harnessio/canary'
import React, { useState } from 'react'
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom'
import { MoreSubmenu } from '../components/more-submenu'

export const RootLayout: React.FC = () => {
  const location = useLocation()
  const hideNavbarPaths = ['/signin', '/signup']
  const showNavbar = !hideNavbarPaths.includes(location.pathname)
  const [showMore, setShowMore] = useState<boolean>(false)

  const primaryMenuItems = [
    {
      text: 'Repositories',
      icon: <Icon name="repositories" size={12} />,
      to: '/repos'
    },
    {
      text: 'Pipelines',
      icon: <Icon name="pipelines" size={12} />,
      to: '/pipelines'
    },
    {
      text: 'Executions',
      icon: <Icon name="executions" size={12} />,
      to: '/executions'
    },
    {
      text: 'Featured Flags',
      icon: <Icon name="featured-flags" size={12} />,
      to: '/feature-flags'
    }
  ]

  const pinnedMenuItems = [
    {
      text: 'Chaos Engineering',
      icon: <Icon name="chaos-engineering" size={12} />,
      to: '/chaos-engineering'
    },
    {
      text: 'Environment',
      icon: <Icon name="environment" size={12} />,
      to: 'environment'
    },
    {
      text: 'Secrets',
      icon: <Icon name="secrets" size={12} />,
      to: 'secrets'
    },
    {
      text: 'Connectors',
      icon: <Icon name="connectors" size={12} />,
      to: 'connectors'
    }
  ]

  function handleMore() {
    setShowMore(!showMore)
  }

  return (
    <>
      <div className="bg-background grid md:grid-cols-[220px_minmax(900px,_1fr)] min-w-screen">
        {showNavbar && (
          <Navbar.Root className="max-md:hidden fixed top-0 left-0 bottom-0 z-50">
            <Navbar.Header>
              <NavbarProjectChooser.Root
                avatarLink={
                  <Link to="/">
                    <Icon name="harness" size={20} className="text-primary" />
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
                <div onClick={() => (!showMore ? handleMore() : null)}>
                  <Navbar.Item text="More" icon={<Icon name="ellipsis" size={12} />} />
                </div>
              </Navbar.Group>
              <Navbar.AccordionGroup title="Pinned">
                {pinnedMenuItems.map((item, idx) => (
                  <NavLink key={idx} to={item.to || ''}>
                    {({ isActive }) => <Navbar.Item key={idx} text={item.text} icon={item.icon} active={isActive} />}
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
              </Navbar.AccordionGroup>
            </Navbar.Content>
            <Navbar.Footer>
              <NavbarUser.Root />
            </Navbar.Footer>
          </Navbar.Root>
        )}
        <main className="col-start-2 min-h-screen box-border overflow-y-scroll overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <MoreSubmenu showMore={showMore} handleMore={handleMore} />
    </>
  )
}
