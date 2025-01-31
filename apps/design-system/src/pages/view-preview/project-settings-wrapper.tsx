import { FC, HTMLAttributes, PropsWithChildren } from 'react'
import { Route } from 'react-router-dom'

import { ProjectSettingsPage } from '@harnessio/ui/views'

import RootViewWrapper from './root-view-wrapper'

const Layout = () => {
  return (
    <div className="bg-background-1 sticky top-[55px] z-40">
      <ProjectSettingsPage />
    </div>
  )
}

export const ProjectSettingsWrapper: FC<PropsWithChildren<HTMLAttributes<HTMLElement>>> = ({ children }) => {
  return (
    <>
      <RootViewWrapper asChild>
        <Route
          path="*"
          element={
            <>
              <Layout />
              {children}
            </>
          }
        />
      </RootViewWrapper>
    </>
  )
}
