import { getInitials } from '../utils/stringUtils'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'

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
          <div className="group-hover:bg-primary/5 absolute -inset-2 rounded duration-100 ease-in-out" />
          <div className="col-start-1 row-span-2">
            <Avatar className="overflow-hidden rounded-md" size="8">
              {url && <AvatarImage src={url} alt="user" />}
              <AvatarFallback>{getInitials(username)}</AvatarFallback>
            </Avatar>
          </div>
          <p className="text-13 text-foreground-1 col-start-2 row-start-1 font-medium leading-none">{username}</p>
          {!!email && (
            <p className="text-13 text-foreground-4 col-start-2 row-start-2 mt-0.5 font-normal leading-none">{email}</p>
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
