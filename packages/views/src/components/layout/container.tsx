import React from 'react'
import { cn } from '@harnessio/canary'

const Container = {
  Root: function Root({
    children,
    wScreen = true,
    hScreen = true,
    wFull = false,
    hFull = false,
    className = ''
  }: {
    children: React.ReactNode
    wScreen?: boolean
    hScreen?: boolean
    wFull?: boolean
    hFull?: boolean
    className?: string
  }) {
    return (
      <div
        className={cn(
          'grid grid-cols-[auto_1fr] bg-grey-6',
          {
            'w-screen': wScreen,
            'h-screen': hScreen,
            'w-full': wFull,
            'h-full': hFull
          },
          className
        )}>
        {children}
      </div>
    )
  },

  Sidebar: React.memo(function Header({ children }: { children: React.ReactNode }) {
    return <div className="flex h-screen">{children}</div>
  }),

  Main: function Main({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-rows-[auto_1fr_auto] col-start-2 w-full h-full">{children}</div>
  },

  Topbar: function Topbar({ children }: { children: React.ReactNode }) {
    return <div className="flex border-b">{children}</div>
  },

  Content: function Content({ children }: { children: React.ReactNode }) {
    return <div className="flex w-full h-full overflow-y-auto">{children}</div>
  },

  CenteredContent: function CenteredContent({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex row-start-2 place-content-center items-center w-full h-full overflow-y-auto">{children}</div>
    )
  },

  Bottombar: function Bottombar({ children }: { children: React.ReactNode }) {
    return <div className="flex border-t">{children}</div>
  },

  Horizontal: function Horizontal({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-row items-center gap-3">{children}</div>
  },

  Vertical: function Vertical({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col">{children}</div>
  }
}

export { Container }
