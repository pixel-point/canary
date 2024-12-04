import { PropsWithChildren } from 'react'

import { Text } from '@/components'
import { cn } from '@utils/cn'

interface CaptionProps extends PropsWithChildren {
  className?: string
}

/**
 * Caption component that renders supplementary text below form inputs.
 * Used to provide additional context or hints for form fields.
 *
 * @param {CaptionProps} props - The properties for the Caption component.
 * @param {React.ReactNode} props.children - The content to be displayed as the caption text.
 * @param {string} [props.className] - Optional additional class names for styling.
 * @returns {JSX.Element} The rendered Caption component.
 */
export function Caption({ children, className }: CaptionProps) {
  return (
    <Text className={cn('text-foreground-4 mt-1 leading-snug', className)} size={2}>
      {children}
    </Text>
  )
}
