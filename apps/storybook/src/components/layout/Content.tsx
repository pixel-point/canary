import React from 'react'

const Content = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="p-5 text-sm text-primary">{children}</div>
  }
}

export default Content
