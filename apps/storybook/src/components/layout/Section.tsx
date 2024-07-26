import { cn } from '@harnessio/canary'
import React from 'react'

const Section = {
  Root: function Root({
    children,
    topBorder = false,
    firstSection = false,
    className = ''
  }: {
    children: React.ReactNode
    topBorder?: boolean
    firstSection?: boolean
    className?: string
  }) {
    return (
      <div
        className={cn(
          'flex flex-col gap-3',
          { 'border-t border-[#18181B] pt-7': topBorder, 'mt-16': firstSection, 'mt-7': !firstSection },
          className
        )}>
        {children}
      </div>
    )
  },

  Header: function Content({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex flex-col gap-3 mb-1', className)}>{children}</div>
  },

  Content: function Content({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex flex-col gap-3', className)}>{children}</div>
  },

  CardGrid: function CardGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={cn('grid grid-cols-3 auto-rows-[220px] gap-x-4 gap-y-6 auto-cols-[1fr]', className)}>
        {children}
      </div>
    )
  },

  Card: function Card({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
    return <div className={cn('border bg-white/5 rounded-md', className)}>{children}</div>
  }
}

export default Section
