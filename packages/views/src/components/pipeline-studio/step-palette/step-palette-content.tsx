import React from 'react'

const StepsPaletteContent = {
  Root: function Content({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col overflow-scroll">{children}</div>
  },

  Section: function Section({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col pt-4 mx-4">{children}</div>
  },

  SectionHeader: function SectionHeader({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-row justify-between mb-3 text-accent-foreground">{children}</div>
  },

  SectionItem: function SectionHeader({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col mb-3 border p-2 rounded-md bg-gradient-to-br from-[#FFFFFF15] to-[#FFFFFF00] hover:bg-shade-10">
        {children}
      </div>
    )
  }
}

export { StepsPaletteContent }
