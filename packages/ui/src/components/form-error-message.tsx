import { cn } from '@utils/cn'

import { Text } from './text'

export enum ErrorMessageTheme {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  DEFAULT = 'default'
}

interface FormErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: ErrorMessageTheme
}

const themeClassMap: Record<ErrorMessageTheme, string> = {
  [ErrorMessageTheme.SUCCESS]: 'text-success',
  [ErrorMessageTheme.WARNING]: 'text-warning',
  [ErrorMessageTheme.ERROR]: 'text-foreground-danger',
  [ErrorMessageTheme.DEFAULT]: 'text-tertiary-background'
}

export function FormErrorMessage({ children, theme, className }: FormErrorMessageProps) {
  const textClass = themeClassMap[theme]
  const role = theme === ErrorMessageTheme.ERROR ? 'alert' : 'status'
  const ariaLive = theme === ErrorMessageTheme.ERROR ? 'assertive' : 'polite'

  return (
    <div className={cn(textClass, className)} role={role} aria-live={ariaLive}>
      <Text as="p" size={0} className="font-light leading-none text-inherit">
        {children}
      </Text>
    </div>
  )
}
