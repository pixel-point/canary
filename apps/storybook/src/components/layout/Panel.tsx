import { cn } from '@harnessio/canary'
import React from 'react'

const Panel = {
  Root: function Root({ children, leftBorder }: { children: React.ReactNode; leftBorder: boolean }) {
    return (
      <div
        className={cn('w-[440px] p-5 text-sm text-primary flex place-content-center place-items-center', {
          'border-l': leftBorder
        })}>
        {children}
      </div>
    )
  }
}

export default Panel
