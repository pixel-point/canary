import { cn } from '@harnessio/canary'
import React from 'react'

function Root({ children }: { children: React.ReactNode }) {
  return <div className="h-screen">{children}</div>
}

function LeftPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 bottom-0 z-50 w-[220px] border-r border-border-background overflow-y-auto',
        className
      )}>
      {children}
    </div>
  )
}

function LeftSubPanel({
  children,
  hasHeader,
  hasSubHeader,
  className
}: {
  children: React.ReactNode
  hasHeader?: boolean
  hasSubHeader?: boolean
  className?: string
}) {
  const paddingTopClass =
    hasHeader && hasSubHeader ? 'top-[100px]' : hasHeader ? 'top-[55px]' : hasSubHeader ? 'top-[45px]' : ''

  return (
    <div
      className={cn(
        'fixed left-[220px] top-0 bottom-0 z-50 w-[220px] border-r border-border-background overflow-y-auto',
        paddingTopClass,
        className
      )}>
      {children}
    </div>
  )
}

function Header({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('h-auto fixed top-0 left-[220px] right-0 z-50 bg-background', className)}>{children}</div>
}

function SubHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('h-auto fixed top-[55px] left-[220px] right-0 z-40 bg-background', className)}>{children}</div>
  )
}

function Content({
  children,
  fullWidth,
  className,
  hasHeader,
  hasSubHeader,
  hasLeftPanel,
  hasLeftSubPanel
}: {
  children: React.ReactNode
  fullWidth?: boolean
  className?: string
  hasHeader?: boolean
  hasSubHeader?: boolean
  hasLeftPanel?: boolean
  hasLeftSubPanel?: boolean
}) {
  const paddingTopClass =
    hasHeader && hasSubHeader ? 'pt-[100px]' : hasHeader ? 'pt-[55px]' : hasSubHeader ? 'pt-[45px]' : ''

  const paddingLeftClass =
    hasLeftPanel && hasLeftSubPanel ? 'pl-[440px]' : hasLeftPanel || hasLeftSubPanel ? 'pl-[220px]' : ''

  if (fullWidth) {
    return (
      <div className={cn('min-h-full', paddingLeftClass)}>
        <div className={cn('min-h-full w-full px-8 pb-16', paddingTopClass, className)}>{children}</div>
      </div>
    )
  }

  return (
    <div className={cn('min-h-full', paddingLeftClass)}>
      <div className={cn('min-h-full mx-auto max-w-[1200px] w-full px-8 pb-16', paddingTopClass, className)}>
        {children}
      </div>
    </div>
  )
}

export { Root, LeftPanel, LeftSubPanel, Header, SubHeader, Content }
