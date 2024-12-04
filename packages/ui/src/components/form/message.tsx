import { HTMLAttributes } from 'react'

import { Text } from '@/components'
import { cn } from '@utils/cn'

export enum MessageTheme {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  DEFAULT = 'default'
}

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  theme: MessageTheme
}

const themeClassMap: Record<MessageTheme, string> = {
  [MessageTheme.SUCCESS]: 'text-success',
  [MessageTheme.WARNING]: 'text-warning',
  [MessageTheme.ERROR]: 'text-foreground-danger',
  [MessageTheme.DEFAULT]: 'text-tertiary-background'
}

/**
 * Message component for displaying status or error messages with different themes.
 *
 * This component is typically used in forms to provide feedback to users, such as success, warning, or error messages.
 *
 * @component
 * @param {MessageProps} props - The properties for the Message component.
 * @param {MessageTheme} props.theme - The visual theme of the message (success, warning, error, or default).
 *                                      This also affects accessibility attributes.
 * @param {React.ReactNode} props.children - The content of the message to display.
 * @param {string} [props.className] - Additional CSS classes to apply to the message container.
 *
 * @returns {JSX.Element} The rendered Message component.
 *
 * @example
 * ```tsx
 * <Message theme={MessageTheme.ERROR}>
 *   This field is required
 * </Message>
 *
 * <Message theme={MessageTheme.SUCCESS}>
 *   Changes saved successfully
 * </Message>
 * ```
 *
 * @remarks
 * - Uses appropriate ARIA roles ('alert' for errors, 'status' for other themes).
 * - Sets aria-live appropriately ('assertive' for errors, 'polite' for other themes).
 * - Applies theme-specific text colors through Tailwind classes.
 */
export function Message({ children, theme, className }: MessageProps) {
  const textClass = themeClassMap[theme]
  const role = theme === MessageTheme.ERROR ? 'alert' : 'status'
  const ariaLive = theme === MessageTheme.ERROR ? 'assertive' : 'polite'

  return (
    <div className={cn(textClass, className)} role={role} aria-live={ariaLive}>
      <Text as="p" size={2} className="text-inherit">
        {children}
      </Text>
    </div>
  )
}
