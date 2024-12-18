import { Fragment, useMemo } from 'react'
import { Link } from 'react-router-dom'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Text
} from '@/components'
import { TypesUser } from '@/types'
import { cn } from '@utils/cn'
import { getInitials } from '@utils/stringUtils'
import { TFunction } from 'i18next'

import { getUserMenuItems } from '../data'
import { UserMenuKeys } from '../types'

interface UserBlockProps {
  username: string
  email?: string
  url?: string
  isButton?: boolean
  className?: string
}

const UserBlock = ({ username, email, url, isButton = false, className }: UserBlockProps) => {
  const Tag = isButton ? 'button' : 'div'

  return (
    <Tag
      className={cn(
        'relative grid w-full grid-cols-[auto_1fr] grid-rows-2 items-center justify-start gap-x-2.5 text-left',
        className
      )}
    >
      {isButton && (
        <div className="absolute -inset-2 rounded duration-100 ease-in-out group-hover:bg-background-4 group-data-[state=open]:bg-background-4" />
      )}
      <div className="col-start-1 row-span-2">
        <Avatar className="overflow-hidden rounded-md" size="8">
          {!!url && <AvatarImage src={url} alt="user" />}
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
      </div>
      <p className="col-start-2 row-start-1 truncate text-13 font-medium leading-tight text-foreground-1">{username}</p>
      {!!email && (
        <p className="col-start-2 row-start-2 truncate text-13 font-normal leading-tight text-foreground-4">{email}</p>
      )}
    </Tag>
  )
}

interface NavbarUserProps {
  currentUser: TypesUser | undefined
  handleCustomNav: () => void
  handleLogOut: () => void
  t: TFunction
}

export const NavbarUser = ({ currentUser, handleCustomNav, handleLogOut, t }: NavbarUserProps) => {
  const username = currentUser?.display_name || currentUser?.uid || ''
  const userMenuItems = getUserMenuItems(t)

  const menuItems = useMemo(() => {
    return userMenuItems.map(({ key, iconName, title, to, isSeparated }) => {
      const className = 'relative grid grid-cols-[auto_1fr] items-center gap-2.5'

      const handleClick = () => {
        switch (key) {
          case UserMenuKeys.CUSTOM_NAV:
            return handleCustomNav()
          case UserMenuKeys.LOG_OUT:
            return handleLogOut()
          default:
            return
        }
      }

      const elementChild = (
        <>
          <Icon className={cn('text-icons-4 ml-[3px] transition-colors')} size={12} name={iconName} />
          <Text size={2} truncate>
            {title}
          </Text>
        </>
      )

      const element = to ? (
        <Link className={className} to={to}>
          {elementChild}
        </Link>
      ) : (
        <button className={cn(className, 'w-full text-left')} onClick={handleClick}>
          {elementChild}
        </button>
      )

      return {
        key,
        element,
        isSeparated
      }
    })
  }, [handleCustomNav, handleLogOut, userMenuItems])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <UserBlock username={username} email={currentUser?.email} url={currentUser?.url} isButton />
        </div>
      </DropdownMenuTrigger>

      {menuItems && (
        <DropdownMenuContent
          className="ml-3 w-[230px] !rounded-lg bg-background-1"
          align="start"
          sideOffset={-40}
          alignOffset={187}
        >
          <UserBlock className="p-2" username={username} email={currentUser?.email} url={currentUser?.url} />
          <DropdownMenuSeparator />
          {menuItems.map(itm => {
            return (
              <Fragment key={itm.key}>
                {!!itm?.isSeparated && <DropdownMenuSeparator />}
                <DropdownMenuItem className="[&_svg]:data-[highlighted]:text-icons-2" asChild>
                  {itm.element}
                </DropdownMenuItem>
              </Fragment>
            )
          })}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
