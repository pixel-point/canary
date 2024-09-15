import React from 'react'
import { Icon, IconProps } from './icon'

function Root({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border flex flex-col gap-5 py-3 pb-5 px-5 pr-4 h-[233px] bg-muted/25">{children}</div>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4 items-center justify-between">{children}</div>
}

function HeaderTitle({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function HeaderLink({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function Content({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function List({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>
}

function ListItem({ children, iconName }: { children: React.ReactNode; iconName?: IconProps['name'] }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2">
      <div>{iconName && <Icon name={iconName} size={20} className="text-tertiary-background" />}</div>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export { Root, Header, HeaderTitle, HeaderLink, Content, List, ListItem }
