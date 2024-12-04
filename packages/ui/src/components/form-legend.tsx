import { ReactNode } from 'react'

import { Text } from '@components/text'

interface FormLegendProps {
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function FormLegend({ title, description, className }: FormLegendProps) {
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
