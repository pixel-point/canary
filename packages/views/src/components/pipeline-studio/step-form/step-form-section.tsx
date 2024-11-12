import React from 'react'

const StepFormSection = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col overflow-scroll flex-grow">{children}</div>
  },

  Header: function Header({ children }: { children: React.ReactNode }) {
    return <div className="p-4">{children}</div>
  },

  Title: function Title({ children }: { children: React.ReactNode }) {
    return <div className="text-lg text-accent-foreground my-3">{children}</div>
  },

  Description: function Title({ children }: { children: React.ReactNode }) {
    return <div className="text-muted-foreground mt-3">{children}</div>
  },

  Form: function Title({ children }: { children: React.ReactNode }) {
    return <div className="px-4 mb-4">{children}</div>
  }
}

export { StepFormSection }
