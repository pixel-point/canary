import React from 'react'

const HorizontalList = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="flex gap-2 items-center">{children}</div>
  },

  Item: function Item({ children }: { children: React.ReactNode }) {
    return <div className="cursor-pointer">{children}</div>
  }
}

export default HorizontalList
