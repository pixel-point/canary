import * as React from 'react'
import type { PropsWithChildren } from 'react'
import type { TagProps } from '@harnessio/svg-icon'
import { TAG } from '@harnessio/svg-icon'

export interface IconProps {
  size?: string
  color?: string
  strokeWidth?: string
  title?: boolean | string
}

interface NamedIconProps extends IconProps {
  name: string
}

export const Icon = React.memo(function NamedIcon(props: NamedIconProps) {
  const ctx = React.useContext(IconContext)
  const { name, size, color, strokeWidth, title } = props
  const Tag = TAG as React.ElementType<TagProps>
  const label = name.split('/')[0]

  return (
    <Tag
      name={name}
      size={size || ctx.size}
      color={color || ctx.color}
      stroke-width={strokeWidth || ctx.strokeWidth}
      {...(title || ctx.title ? { title: typeof title === 'string' ? title || label : label } : {})}
    />
  )
})

const IconContext = React.createContext<IconProps>({})

export const IconContextProvider: React.FC<PropsWithChildren<IconProps>> = ({ children, ...props }) => (
  <IconContext.Provider value={props || {}} children={children} />
)
