import React from 'react'
import { Input } from './input' // Your existing Input component
import { Icon } from './icon' // Assuming this is your Icon component
import { cn } from '@/lib/utils' // Utility for conditional class names

interface SearchBoxProps {
  placeholder: string
  width?: 'full' | 'fixed'
}

function Root({ placeholder, width = 'fixed' }: SearchBoxProps) {
  return (
    <div className={cn('relative', width === 'full' ? 'w-full' : 'w-96')}>
      <Icon
        name="search"
        size={12}
        className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-tertiary-background"
      />
      <Input placeholder={placeholder} className="pl-7" />
    </div>
  )
}

export { Root }
