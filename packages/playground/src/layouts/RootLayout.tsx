// RootLayout.tsx
import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'

const RootLayout: React.FC = () => {
  const location = useLocation()
  const hideNavbarPaths = ['/signin', '/signup']

  const showNavbar = !hideNavbarPaths.includes(location.pathname)

  return (
    <div className="bg-background flex">
      {showNavbar && (
        <nav className="h-screen p-5 md:min-w-56">
          <ul>
            <li>
              <NavLink to="/repos" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Repositories
              </NavLink>
            </li>
            <li>
              <NavLink to="/pipelines" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Pipelines
              </NavLink>
            </li>
            <li>
              <NavLink to="/executions" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Executions
              </NavLink>
            </li>
            <hr style={{ marginTop: '20px', marginBottom: '20px' }} />
            <li>
              <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink to="/sign up" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Sign up
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <main className="h-screen w-4/5 pt-0" style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
export default RootLayout
