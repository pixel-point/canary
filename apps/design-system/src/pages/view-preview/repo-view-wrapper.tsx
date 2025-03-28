import { FC, PropsWithChildren } from 'react'
import { Route } from 'react-router-dom'

import { useTranslationStore } from '@utils/viewUtils'

import { RepoSubheader } from '@harnessio/ui/components'

import RootViewWrapper from './root-view-wrapper'

const RepoViewWrapper: FC<PropsWithChildren<React.HTMLAttributes<HTMLElement>>> = ({ children }) => (
  <RootViewWrapper asChild>
    <Route
      path="*"
      element={
        <>
          <RepoSubheader
            className="layer-high bg-background-1 sticky top-[55px]"
            useTranslationStore={useTranslationStore}
          />
          {children}
        </>
      }
    />
  </RootViewWrapper>
)

export default RepoViewWrapper
