import { useState } from 'react'
import { SandboxLayout } from '../index'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { MoreSubmenu } from '../components/more-submenu'
import type { TypesUser } from './types'
import { SystemAdminMenu } from '../components/system-admin-menu'

interface SandboxRootProps {
  currentUser: TypesUser | undefined
}

export const SandboxRoot: React.FC<SandboxRootProps> = ({ currentUser }) => {
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

  return (
    <SandboxLayout.Root>
      <SandboxLayout.LeftPanel>
<<<<<<< HEAD
        <Navbar.Root>
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
            <Navbar.Group>
              <NavLink to={`/spaces/${currentSpaceId}/settings`}>
                {({ isActive }) => (
                  <Navbar.Item text="Project Settings" icon={<Icon name="cog-6" size={12} />} active={isActive} />
                )}
              </NavLink>
            </Navbar.Group>
          </Navbar.Content>
          {currentUser?.admin && (
            <Navbar.Content>
              <Navbar.Group>
                <NavLink to={`/users`} className="hover:bg-primary/5 rounded-md p-2">
                  {({ isActive }) => (
                    <Navbar.Item text="User Management" icon={<Icon name="account" size={12} />} active={isActive} />
                  )}
                </NavLink>
              </Navbar.Group>
            </Navbar.Content>
          )}
          <Navbar.Footer>
            <NavbarUser.Root
              username={currentUser?.display_name || currentUser?.uid}
              isAdmin={currentUser?.admin || false}
              url={currentUser?.url || ''}
              menuItems={[
                {
                  key: 0,
                  element: <Link to="/settings/general">Settings</Link>
                },
                {
                  key: 1,
                  element: <Link to="/logout">Log out</Link>
                }
              ]}
            />
          </Navbar.Footer>
        </Navbar.Root>
=======
        <Navbar
          showMore={showMore}
          showSystemAdmin={showSystemAdmin}
          handleMore={handleMore}
          handleSystemAdmin={handleSystemAdmin}
          currentUser={currentUser}
        />
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
      </SandboxLayout.LeftPanel>
      <Outlet />
      <MoreSubmenu showMore={showMore} handleMore={handleMore} />
      <SystemAdminMenu showSystemAdmin={showSystemAdmin} handleSystemAdmin={handleSystemAdmin} />
    </SandboxLayout.Root>
  )
}
