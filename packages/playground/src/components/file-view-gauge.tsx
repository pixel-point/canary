import React from 'react'
import { Progress, Text } from '@harnessio/canary'

interface RootProps {
  children: React.ReactNode
  className?: string
}

interface BarProps {
  total: number
  filled: number
  className?: string
}

function Root({ ...props }: RootProps) {
  const { children } = props

  return <div className="flex flex-col gap-1 justify-center w-[110px]">{children}</div>
}

function Content({ ...props }: RootProps) {
  const { children } = props

  return (
    <div className="flex leading-snug justify-center">
      <Text truncate size={1} className="text-primary/70">
        {children}
      </Text>
    </div>
  )
}
function Bar({ total, filled }: BarProps) {
  const percentageFilled = (filled / total) * 100

  return <Progress value={percentageFilled} size="sm" color="accent" rounded="sm" />
}

export { Root, Content, Bar }
