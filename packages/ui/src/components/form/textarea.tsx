import { forwardRef, ReactNode, TextareaHTMLAttributes } from 'react'

import { Caption, ControlGroup, Label, Message, MessageTheme } from '@/components'
import { cn } from '@utils/cn'

/**
 * Interface for the error object used in the Textarea component.
 */
interface TextareaError {
  /** Theme for the error message. */
  theme: MessageTheme
  /** Optional error message to display. */
  message?: string
}

/**
 * Props for the Textarea component.
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label for the textarea. */
  label?: string
  /** Caption text displayed below the textarea. */
  caption?: ReactNode
  /** Error object containing theme and optional message. */
  error?: TextareaError
  /** Indicates if the textarea is optional. */
  optional?: boolean
}

/**
 * A forward-ref Textarea component with support for labels, captions, and error messages.
 *
 * @param {TextareaProps} props - The props for the Textarea component.
 * @param {React.Ref<HTMLTextAreaElement>} ref - The ref to be forwarded to the textarea element.
 * @returns {JSX.Element} The rendered Textarea component.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, disabled, label, caption, error, optional, className, ...props }, ref) => {
    return (
      <ControlGroup>
        {label && (
          <Label className="mb-2.5" color={disabled ? 'disabled-dark' : 'secondary'} optional={optional} htmlFor={id}>
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
          <Message className={cn(caption ? 'mt-1' : 'absolute top-full translate-y-1')} theme={error.theme}>
            {error.message}
          </Message>
        )}
        {caption && <Caption>{caption}</Caption>}
      </ControlGroup>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
