import * as React from 'react'
import AtSign from '../icons/at-sign.svg'
import Award from '../icons/award.svg'

const IconNameMap: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
  'at-sign': AtSign,
  award: Award
}

export interface IconProps {
  name: keyof typeof IconNameMap
  size?: number
  height?: number
  width?: number
  className?: string
}

const Icon: React.FC<IconProps> = ({ name, size = 16, height, width, className }) => {
  const Component = IconNameMap[name]
  return <Component width={width || size} height={height || size} className={className} />
}

export { Icon }
