import React from 'react'
import { getInitials } from '@/utils/StringUtils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '..'

interface items {
  element: React.ReactNode
  key: number
}

const Root: React.FC<{
  username?: string
  isAdmin?: boolean
  url?: string
  menuItems?: items[]
}> = ({ username, isAdmin, url, menuItems }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group relative grid grid-rows-2 grid-cols-[auto_1fr] gap-x-3 items-center justify-start cursor-pointer">
          <div className="absolute -inset-2 rounded-md group-hover:bg-primary/5 ease-in-out duration-100" />
          <div className="col-start-1 row-span-2">
            <Avatar className="rounded-md overflow-hidden">
              {url && <AvatarImage src={url} alt="user" />}
              {username && <AvatarFallback>{getInitials(username)}</AvatarFallback>}
            </Avatar>
          </div>
          <p className="col-start-2 row-start-1 text-xs text-primary font-medium">{username}</p>
          <p className="col-start-2 row-start-2 text-xs font-normal text-tertiary-background">
            {isAdmin ? 'Admin' : 'Account Member'}
          </p>
        </div>
      </DropdownMenuTrigger>
      {menuItems && (
        <DropdownMenuContent align="end" className="w-[180px] mb-2">
          {menuItems.map(itm => {
            return (
              <DropdownMenuItem asChild key={itm.key}>
                {itm.element}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

export { Root }
