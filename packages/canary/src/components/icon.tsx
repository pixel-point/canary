import * as React from "react"
import Accessibility from "../icons/svgs/accessibility.svg"

const IconNameMap: Record<string, React.ReactElement> = {
    "accessibility": Accessibility
}

export interface IconProps {
    name?: keyof typeof IconNameMap
    size?: number
}

const Icon: React.FC<IconProps> = ({ name, size = 16 }) => {
  return <span className={`h-[${size}px]`}>
    <Accessibility />
    </span>
}

export { Icon }