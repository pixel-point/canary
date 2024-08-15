import * as React from 'react'
import AtSign from '../icons/at-sign.svg'
import Award from '../icons/award.svg'

const IconNameMap = {
  'at-sign': AtSign,
  award: Award
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
  console.log({Component})
  return <Component width={width || size} height={height || size} className={className} />
}

export { Icon }
