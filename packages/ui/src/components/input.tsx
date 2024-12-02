import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils/cn'
import { ErrorMessageTheme, FormErrorMessage } from './form-error-message'
import { Label } from './label'
import { Text } from './text'

export interface BaseInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  size?: 'sm' | 'md'
}

const inputVariants = cva('text-foreground-1 bg-transparent px-2.5 py-1 disabled:cursor-not-allowed', {
  variants: {
    variant: {
      default:
        'placeholder:text-foreground-4 flex w-full rounded border text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:rounded focus-visible:outline-none',
      extended: 'grow border-none focus-visible:outline-none'
    },
    size: {
      sm: 'h-8',
      md: 'h-9'
    },
    theme: {
      default:
        'border-borders-2 focus-visible:border-borders-3 disabled:placeholder:text-foreground-9 disabled:border-borders-1',
      danger: 'border-borders-danger'
    }
  },
  defaultVariants: {
    variant: 'default',
    theme: 'default',
    size: 'sm'
  }
})

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, type, variant, size, theme, ...props }, ref) => {
    return <input className={cn(inputVariants({ variant, size, theme }), className)} type={type} ref={ref} {...props} />
  }
)
BaseInput.displayName = 'BaseInput'

interface InputError {
  theme: ErrorMessageTheme
  message?: string
}
interface InputProps extends BaseInputProps {
  label?: string
  caption?: React.ReactNode
  error?: InputError
  optional?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, caption, error, id, theme, disabled, optional, ...props }, ref) => {
    return (
      <>
        {label && (
          <Label className="mb-2.5" theme={disabled ? 'disabled-dark' : 'secondary'} optional={optional} htmlFor={id}>
            {label}
          </Label>
        )}
        <BaseInput id={id} ref={ref} theme={error ? 'danger' : theme} disabled={disabled} {...props} />
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
Input.displayName = 'Input'

export { Input }
export type { InputProps }
