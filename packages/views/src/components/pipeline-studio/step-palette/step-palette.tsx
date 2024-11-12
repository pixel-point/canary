import React from 'react'

const StepsPalette = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col h-full overflow-hidden">{children}</div>
  },

  Header: function Header({ children }: { children: React.ReactNode }) {
    return <div className={`border-b p-4`}>{children}</div>
  },

  Title: function Title({ children }: { children: React.ReactNode }) {
    return <div className="text-lg text-accent-foreground mb-3">{children}</div>
  }
}

export { StepsPalette }
