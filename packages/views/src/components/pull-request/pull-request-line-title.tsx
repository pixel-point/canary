import { Text } from '@harnessio/canary'
import React from 'react'

interface LineTitleProps {
  text?: string
  icon?: React.ReactElement
}

interface LineDescriptionProps {
  text?: string
}

export const LineTitle = ({ ...props }: LineTitleProps) => {
  return (
    <div className="inline-flex gap-2 items-center">
      {props.icon}
      <Text weight="medium">{props.text}</Text>
    </div>
  )
}

export const LineDescription = ({ ...props }: LineDescriptionProps) => {
  return (
    <div className="ml-6 inline-flex gap-2 items-center">
      <Text size={1} weight="normal" color={'tertiaryBackground'}>
        {props.text}
      </Text>
    </div>
  )
}
