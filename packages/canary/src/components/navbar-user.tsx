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
  username: string
  email?: string
  url?: string
  menuItems?: items[]
}> = ({ username, email, url, menuItems }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group relative grid cursor-pointer grid-cols-[auto_1fr] grid-rows-2 items-center justify-start gap-x-2.5">
          <div className="absolute -inset-2 rounded duration-100 ease-in-out group-hover:bg-primary/5" />
          <div className="col-start-1 row-span-2">
            <Avatar className="overflow-hidden rounded-md" size="8">
              {url && <AvatarImage src={url} alt="user" />}
              <AvatarFallback>{getInitials(username)}</AvatarFallback>
            </Avatar>
          </div>
          <p className="col-start-2 row-start-1 text-13 font-medium leading-none text-foreground-1">{username}</p>
          {!!email && (
            <p className="col-start-2 row-start-2 mt-0.5 text-13 font-normal leading-none text-foreground-4">{email}</p>
          )}
        </div>
      </DropdownMenuTrigger>
      {menuItems && (
        <DropdownMenuContent align="end" className="mb-2 w-[180px]">
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
