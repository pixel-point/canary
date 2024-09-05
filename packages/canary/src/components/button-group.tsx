import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonGroupProps {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  className?: string
}

function Root({ children, direction, className }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'flex',
        { 'flex-col gap-4': direction && direction == 'vertical' },
        { 'gap-4': direction && direction == 'horizontal' },
        className
      )}>
      {children}
    </div>
  )
}

export { Root }
