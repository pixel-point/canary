import { FC, HTMLAttributes, PropsWithChildren } from 'react'
import { NavLinkProps } from 'react-router-dom'

import { useRouterContext } from '@/context'
import { cn } from '@utils/cn'

const TabNavRoot: FC<PropsWithChildren<HTMLAttributes<HTMLElement>>> = ({ className, ...props }) => {
  return (
    <nav
      {...props}
      className={cn('flex h-11 w-full items-center gap-6 border-b border-borders-5 px-6 text-foreground-4', className)}
    />
  )
}

const TabNavItem: FC<NavLinkProps> = ({ className, ...props }) => {
  const { NavLink } = useRouterContext()

  return (
    <NavLink
      role="tab"
      className={({ isActive }) =>
        cn(
          'block relative place-content-center whitespace-nowrap m-0 my-1 h-9 px-0 text-14 font-normal leading-none text-foreground-2 focus-visible:duration-0 duration-150 ease-in-out hover:text-foreground-1 disabled:pointer-events-none disabled:opacity-50 ',
          // bottom border of active tab
          'after:pointer-events-none after:absolute after:inset-[-0.25rem_0] after:block after:border-b after:border-solid after:border-b-transparent',
          { 'text-foreground-1 after:border-borders-9': isActive },
          /*
           * TODO: Active tab Radial background is hidden until it's adjusted to the light theme
           */
          // radial gradient of active tab
          // 'before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-[calc(100%+40px)] before:w-[calc(100%+60px)] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-transparent',
          // { 'before:[background-image:var(--canary-tab-background-gradient)]': isActive },
          className
        )
      }
      {...props}
    />
  )
}

export const TabNav = { Root: TabNavRoot, Item: TabNavItem }
