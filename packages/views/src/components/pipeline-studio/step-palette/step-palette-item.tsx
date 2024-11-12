import React from 'react'

const StepsPaletteItem = {
  Root: function Root({ children, ...rest }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
    return (
      <div className="flex flex-row w-full gap-2 h-full cursor-pointer " {...rest}>
        {children}
      </div>
    )
  },
  Left: function Left({ children }: { children: React.ReactNode }) {
    return <div className="text-accent-foreground">{children}</div>
  },
  Right: function Right({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col flex-grow">{children}</div>
  },
  Header: function Header({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-row justify-between">{children}</div>
  },
  Title: function Title({ children }: { children: React.ReactNode }) {
    return <div className="font-medium">{children}</div>
  },
  Description: function Description({ children }: { children: React.ReactNode }) {
    return <div className="overflow-hidden text-muted-foreground line-clamp-2 text-sm mt-2">{children}</div>
  },
  BadgeWrapper: function BadgeWrapper({ children }: { children: React.ReactNode }) {
    return (
      <div className="bg-gradient-to-r from-[#B1CBFF] via-[#6D6B75] to-[#B1CBFF] rounded-full p-0.5 self-start">
        <div className="px-2 bg-background rounded-full text-sm">{children}</div>
      </div>
    )
  }
}

export { StepsPaletteItem }
