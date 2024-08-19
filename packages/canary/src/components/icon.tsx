import * as React from 'react'
import ChevronDown from '../icons/chevron-down.svg'

const IconNameMap = {
  'chevron-down': ChevronDown
} satisfies Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>

export interface IconProps {
  name: keyof typeof IconNameMap
  size?: number
  height?: number
  width?: number
  className?: string
}

const Icon: React.FC<IconProps> = ({ name, size = 16, height, width, className }) => {
  const Component = IconNameMap[name]
  console.log({ Component })
  return <Component width={width || size} height={height || size} className={className} />
}

export { Icon }
