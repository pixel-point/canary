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
 * @component
 * @example
 * ```tsx
 * <Legend
 *   title="Personal Information"
 *   description="Please fill in your details below"
 * />
 * ```
 *
 * @param {object} props - Component props
 * @param {ReactNode} props.title - The main title text or element
 * @param {ReactNode} [props.description] - Optional description text or element
 * @param {string} [props.className] - Optional CSS class name for custom styling
 * @returns {JSX.Element} A legend component with title and optional description
 */
export function Legend({ title, description, className }: LegendProps) {
  return (
    <div className={className}>
      <Text size={3} weight={'medium'} as="p" role="heading">
        {title}
      </Text>
      {description && (
        <Text size={2} as="p" id="fieldset-description">
          {description}
        </Text>
      )}
    </div>
  )
}
