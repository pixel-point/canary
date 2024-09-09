// RootLayout.tsx
import { Navbar, Icon, NavbarProjectChooser, NavbarUser } from '@harnessio/canary'
import React from 'react'
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom'

export const RootLayout: React.FC = () => {
  const location = useLocation()
  const hideNavbarPaths = ['/signin', '/signup']
  const showNavbar = !hideNavbarPaths.includes(location.pathname)

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

  return (
    <div className="bg-background grid md:grid-cols-[220px_minmax(900px,_1fr)] min-w-screen">
      {showNavbar && (
        <Navbar.Root className="max-md:hidden">
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
              <Navbar.Item text="More" icon={<Icon name="ellipsis" size={12} />} />
            </Navbar.Group>
            <Navbar.AccordionGroup title="Pinned">
              {pinnedMenuItems.map((item, idx) => (
                <NavLink key={idx} to={item.to || ''}>
                  {({ isActive }) => <Navbar.Item key={idx} text={item.text} icon={item.icon} active={isActive} />}
                </NavLink>
              ))}
            </Navbar.AccordionGroup>
          </Navbar.Content>
          <Navbar.Footer>
            <NavbarUser.Root />
          </Navbar.Footer>
        </Navbar.Root>
      )}
      <main className="min-h-screen box-border overflow-y-scroll overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}
