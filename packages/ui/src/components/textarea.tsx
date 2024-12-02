import * as React from 'react'

import { cn } from '@utils/cn'

import { ErrorMessageTheme, FormErrorMessage } from './form-error-message'
import { Label } from './label'
import { Text } from './text'

interface TextareaError {
  theme: ErrorMessageTheme
  message?: string
}
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  caption?: React.ReactNode
  error?: TextareaError
  optional?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, disabled, label, caption, error, optional, className, ...props }, ref) => {
    return (
      <>
        {label && (
          <Label className="mb-2.5" theme={disabled ? 'disabled-dark' : 'secondary'} optional={optional} htmlFor={id}>
            {label}
          </Label>
        )}
        <textarea
          className={cn(
            'placeholder:text-foreground-4 flex min-h-[74px] w-full rounded border bg-transparent px-3 py-1.5 text-sm shadow-sm focus-visible:outline-none focus-visible:rounded disabled:cursor-not-allowed resize-none',
            className,
            error
              ? 'border-borders-danger'
              : 'border-borders-2 focus-visible:border-borders-3 disabled:placeholder:text-foreground-9 disabled:border-borders-1'
          )}
          id={id}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {error && (
          <FormErrorMessage className="mt-1" theme={error.theme}>
            {error.message}
          </FormErrorMessage>
        )}
        {caption && (
          <Text className="text-foreground-4 mt-1 leading-snug" size={2}>
            {caption}
          </Text>
        )}
      </>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
