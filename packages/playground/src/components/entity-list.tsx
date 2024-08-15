import { cn } from '@harnessio/canary'
import React from 'react'

const EntityList = {
  Root: function Root({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex flex-col gap-4 font-light text-sm mt-2', className)}>{children}</div>
  },

  Header: function Header({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex', className)}>{children}</div>
  },

  Actions: function Actions({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={cn('grid w-full grid-flow-col grid-cols-1 auto-cols-auto items-center gap-0', className)}>
        {children}
      </div>
    )
  },

  ActionItem: function ActionItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex', className)}>{children}</div>
  },

  Content: function Content({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex', className)}>{children}</div>
  },

  Footer: function Footer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex mt-12', className)}>{children}</div>
  }
}

export default EntityList
