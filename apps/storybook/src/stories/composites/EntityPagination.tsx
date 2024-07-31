import React from 'react'
import { cn } from '@harnessio/canary'

const EntityPagination = {
  Root: function Root({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex flex-col', className)}>{children}</div>
  },

  Item: function Item({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
  }
}

export default EntityPagination
