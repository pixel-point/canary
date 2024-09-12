import React from 'react'
import { Text } from './text'

function Root({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col w-full pt-9 border-t">{children}</div>
}

function Header({ name, action }: { name: string; action?: React.ReactNode }) {
  return (
    <div className="flex w-full gap-4 items-center justify-between pb-5">
      <Text as="p" size={4} color="primary" weight="medium">
        {name}
      </Text>
      {action && <>{action}</>}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 w-full">{children}</div>
}

export { Root, Header, Content }
