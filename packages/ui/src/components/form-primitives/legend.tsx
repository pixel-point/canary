import { ReactNode } from 'react'

import { Text } from '@components/text'

interface LegendProps {
  title: ReactNode
  description?: ReactNode
  className?: string
}

/**
 * Legend component for form fieldsets
 *
 * @example
 * <Legend
 *   title="Personal Information"
 *   description="Please fill in your details below"
 * />
 */
export function Legend({ title, description, className }: LegendProps) {
  return (
    <div className={className}>
      <p className="text-18 font-medium text-foreground-1">{title}</p>
      {description && (
        <p className="text-14 mt-2" id="fieldset-description">
          {description}
        </p>
      )}
    </div>
  )
}
