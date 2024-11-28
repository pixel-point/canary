import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils/cn'

export interface BaseInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  size?: 'sm' | 'md'
}

const inputVariants = cva('text-foreground-1 bg-transparent px-2.5 py-1', {
  variants: {
    variant: {
      default:
        'placeholder:text-foreground-5 focus-visible:ring-ring flex w-full rounded border text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
      extended: 'grow border-none focus-visible:outline-none'
    },
    size: {
      sm: 'h-8',
      md: 'h-9'
    },
    theme: {
      default: 'border-borders-2',
      danger: 'border-borders-danger'
    }
  }
})

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, type, variant = 'default', size = 'sm', theme = 'default', ...props }, ref) => {
    return <input className={cn(inputVariants({ variant, size, theme }), className)} type={type} ref={ref} {...props} />
  }
)
BaseInput.displayName = 'BaseInput'

export interface ExtendedInputProps extends BaseInputProps {
  left?: React.ReactNode
  leftStyle?: boolean
  leftClassName?: string
  right?: React.ReactNode
  rightStyle?: boolean
  rightClassName?: string
}

const containerClassName =
  'flex h-9 w-full rounded border border-input text-sm shadow-sm transition-colors placeholder:text-foreground-4 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
const leftRightCommonClassName = 'flex items-center text-muted-foreground'

const ExtendedInput = React.forwardRef<HTMLInputElement, ExtendedInputProps>(
  ({ className, type, left, leftStyle, leftClassName, right, rightStyle, rightClassName, ...props }, ref) => {
    return (
      <div className={cn(containerClassName, className)}>
        {left && (
          <div
            className={cn(
              leftRightCommonClassName,
              'rounded-l',
              leftStyle ? 'bg-muted border-r' : '-mr-3',
              leftClassName
            )}
          >
            {left}
          </div>
        )}
        <BaseInput className={className} type={type} {...props} ref={ref} variant="extended" />
        {right && (
          <div
            className={cn(
              leftRightCommonClassName,
              'rounded-r',
              rightStyle ? 'bg-muted border-l' : '-ml-3',
              rightClassName
            )}
          >
            {right}
          </div>
        )}
      </div>
    )
  }
)
ExtendedInput.displayName = 'ExtendedInput'

interface InputProps extends ExtendedInputProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ left, right, ...props }, ref) => {
  if (left || right) {
    return <ExtendedInput left={left} right={right} {...props} ref={ref} />
  }
  return <BaseInput {...props} ref={ref} />
})
Input.displayName = 'Input'

export { Input }
export type { InputProps }
