import React from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import { SandboxLayout } from '../index'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Text
} from '@harnessio/canary'

const SandboxSettings: React.FC = () => {
  // Determine if the current route matches 'account' or 'project'
  const isAccountRoute = useMatch('/sandbox/settings/account/*')
  const isProjectRoute = useMatch('/sandbox/settings/project/*')

  // Set the breadcrumb label based on the route
  const breadcrumbLabel = isAccountRoute ? 'Account' : isProjectRoute ? 'Project' : ''

  return (
    <SandboxLayout.Root>
      <SandboxLayout.Header>
        <div className="h-full flex items-center px-8 border-b border-border-background">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/sandbox/settings">
                  <Text size={2} color={isAccountRoute || isProjectRoute ? 'tertiaryBackground' : 'primary'}>
                    Settings
                  </Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {(isAccountRoute || isProjectRoute) && (
                <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
              )}
              {breadcrumbLabel && (
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    <Text size={2} color="primary">
                      {breadcrumbLabel}
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </SandboxLayout.Header>
      <Outlet />
    </SandboxLayout.Root>
  )
}

export { SandboxSettings }
