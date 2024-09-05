import React from 'react'

interface DockProps {
  children: React.ReactNode
}

function Root({ ...props }: DockProps) {
  const { children } = props

  return <div className="fixed bottom-0 left-auto right-auto flex items-center py-6 justify-center">{children}</div>
}

export { Root }
