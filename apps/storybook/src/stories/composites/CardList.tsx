import React from 'react'
import { cn } from '@harnessio/canary'

const CardList = {
  Root: function Root({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex flex-col', className)}>{children}</div>
  },

  Header: function Header({
    title,
    action,
    className = ''
  }: {
    title: string
    action?: React.ReactNode
    className?: string
  }) {
    return (
      <div className={cn('flex gap-3 items-center justify-between py-3 px-4', className)}>
        <p className="text-sm text-[#93939F] -tracking-[2%] truncate">{title}</p>
        {action && <div className="hover:brightness-110 ease-in-out duration-150 cursor-pointer">{action}</div>}
      </div>
    )
  },

  Items: function Items({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex flex-col gap-3 px-4 py-2', className)}>{children}</div>
  },

  Item: function Item({
    icon,
    title,
    description,
    className = ''
  }: {
    icon: React.ReactElement<SVGSVGElement>
    title: string
    description: string
    className?: string
  }) {
    return (
      <div className={cn('grid grid-cols-[auto_1fr] gap-3', className)}>
        <div className="flex">{icon}</div>
        <div className="flex flex-col">
          <p className="text-sm text-primary truncate hover:opacity-75 ease-in-out duration-150 cursor-pointer">
            {title}
          </p>
          <p className="text-sm font-light text-[#93939F] truncate">{description}</p>
        </div>
      </div>
    )
  }
}

export default CardList
