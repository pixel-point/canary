import React from 'react'

const Content = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="flex p-5 text-sm h-full w-full text-primary">{children}</div>
  }
}

export default Content
