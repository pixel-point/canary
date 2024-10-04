import React from 'react'
import { Text } from '@harnessio/canary'

interface RootProps {
  children: React.ReactNode
  className?: string
}

interface IconProps {
  children: React.ReactNode
  handleClick?: () => void
  className?: string
}

interface ContentProps {
  children: React.ReactNode
  className?: string
}

function Root({ ...props }: RootProps) {
  const { children } = props

  return (
    <div className="grid grid-flow-col grid-col-[1fr_auto] border rounded-md overflow-hidden cursor-pointer">
      {children}
    </div>
  )
}

function Content({ ...props }: ContentProps) {
  const { children } = props

  return (
    <div className="flex items-center px-2 py-0.5 bg-background hover:bg-muted/50">
      <Text size={1} className="text-tertiary-background">
        {children}
      </Text>
    </div>
  )
}

function Icon({ ...props }: IconProps) {
  const { children, handleClick } = props

  return (
    <div
      onClick={handleClick && handleClick}
      className="flex items-center border-l px-1.5 py-0.5 bg-background hover:bg-muted/50">
      {children}
    </div>
  )
}

export { Root, Content, Icon }
