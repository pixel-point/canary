import { forwardRef, ReactNode, TextareaHTMLAttributes } from 'react'

import { cn } from '@utils/cn'

import { ControlGroup } from './control-group'
import { ErrorMessageTheme, FormErrorMessage } from './form-error-message'
import { Label } from './label'
import { Text } from './text'

interface TextareaError {
  theme: ErrorMessageTheme
  message?: string
}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  caption?: ReactNode
  error?: TextareaError
  optional?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, disabled, label, caption, error, optional, className, ...props }, ref) => {
    return (
      <ControlGroup>
        {label && (
          <Label className="mb-2.5" color={disabled ? 'foreground-9' : 'foreground-2'} optional={optional} htmlFor={id}>
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
          <FormErrorMessage className={cn(caption ? 'mt-1' : 'absolute top-full translate-y-1')} theme={error.theme}>
            {error.message}
          </FormErrorMessage>
        )}
        {caption && (
          <Text className="mt-1 leading-snug text-foreground-4" size={2}>
            {caption}
          </Text>
        )}
      </ControlGroup>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
