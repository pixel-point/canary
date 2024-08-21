import * as React from 'react'
import ChevronDown from '../icons/chevron-down.svg'
import Archive from '../icons/repositories-icon.svg'
import Harness from '../icons/harness.svg'
import Pipelines from '../icons/pipelines-icon.svg'
import Executions from '../icons/executions-icon.svg'
import FeaturedFlags from '../icons/featured-flags-icon.svg'
import Ellipsis from '../icons/more-dots-icon.svg'
import Repositories from '../icons/repositories-icon.svg'
import ChaosEngineering from '../icons/chaos-engineering-icon.svg'
import Environment from '../icons/environment-icon.svg'
import Secrets from '../icons/secrets-icon.svg'
import Connectors from '../icons/connectors-icon.svg'
import Star from '../icons/star-icon.svg'
import Pull from '../icons/pull-icon.svg'
// import Fork from '../icons/fork.svg'

const IconNameMap = {
  'chevron-down': ChevronDown,
  archive: Archive,
  harness: Harness,
  pipelines: Pipelines,
  executions: Executions,
  'featured-flags': FeaturedFlags,
  ellipsis: Ellipsis,
  repositories: Repositories,
  'chaos-engineering': ChaosEngineering,
  environment: Environment,
  secrets: Secrets,
  connectors: Connectors,
  star: Star,
  pull: Pull
  // fork: Fork
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
