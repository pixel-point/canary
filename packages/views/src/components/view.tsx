import React from 'react'

const View = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="w-full max-w-[860px] min-h-full mx-auto px-5 py-5 mb-16">{children}</div>
  }
}

export default View
