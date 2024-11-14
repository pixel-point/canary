import React from 'react'
import { cn, useFormField } from '@harnessio/canary'

export const InputError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { error, formMessageId } = useFormField()

    if (!error?.message) {
      return null
    }

    return (
      <p ref={ref} id={formMessageId} className={cn('text-destructive text-sm font-medium', className)} {...props}>
        {error.message}
      </p>
    )
  }
)
InputError.displayName = 'InputError'
