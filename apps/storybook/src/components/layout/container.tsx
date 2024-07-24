import React from 'react'

const Container = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-[auto_auto_1fr] w-screen h-screen bg-background">{children}</div>
  },

  Sidebar: React.memo(function Sidebar({ children }: { children: React.ReactNode }) {
    return <div className="flex h-screen col-start-1">{children}</div>
  }),

  SecondarySidebar: React.memo(function SecondarySidebar({ children }: { children: React.ReactNode }) {
    return <div className="flex h-screen col-start-2">{children}</div>
  }),

  Main: function Main({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-rows-[auto_1fr_auto] col-start-3 w-full h-full">{children}</div>
  },

  Topbar: function Topbar({ children }: { children: React.ReactNode }) {
    return <div className="flex">{children}</div>
  },

  Content: function Content({ children }: { children: React.ReactNode }) {
    return <div className="flex w-full row-start-2 h-full overflow-y-auto">{children}</div>
  },

  CenteredContent: function CenteredContent({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex row-start-2 place-content-center items-center w-full h-full overflow-y-auto">{children}</div>
    )
  },

  Bottombar: function Content({ children }: { children: React.ReactNode }) {
    return <div className="flex">{children}</div>
  }
}

export default Container
