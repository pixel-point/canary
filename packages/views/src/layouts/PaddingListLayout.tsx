import React from 'react'
import { cn, Spacer } from '@harnessio/canary'

interface PaddingListLayoutProps {
  className?: string
  spaceTop?: boolean
  children: React.ReactNode
}

export const PaddingListLayout = ({ className, spaceTop = true, children }: PaddingListLayoutProps) => {
  return (
    <div className={cn('mx-auto max-w-full px-8 pb-16 pt-7 md:max-w-[1000px] 2xl:max-w-[1200px]', className)}>
      {spaceTop && <Spacer size={8} />}
      {children}
    </div>
  )
}
