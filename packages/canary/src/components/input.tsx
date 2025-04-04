import * as React from 'react'

import { cn } from '@/lib/utils'

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isExtended?: boolean
}

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, isExtended, ...props }, ref) => {
  const commonClassName = 'bg-transparent px-3 py-1'
  const specificClassNames = isExtended
    ? 'border-none grow focus-visible:outline-none'
    : 'flex h-9 w-full rounded-md border border-input text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

  return <input type={type} className={cn(commonClassName, specificClassNames, className)} ref={ref} {...props} />
})
BaseInput.displayName = 'BaseInput'

export interface ExtendedInputProps extends BaseInputProps {
  left?: React.ReactNode
  leftStyle?: boolean
  leftClassName?: string
  right?: React.ReactNode
  rightStyle?: boolean
  rightClassName?: string
}

const ExtendedInput = React.forwardRef<HTMLInputElement, ExtendedInputProps>(
  ({ className, type, left, leftStyle, leftClassName, right, rightStyle, rightClassName, ...props }, ref) => {
    const containerClassName =
      'flex h-9 w-full rounded-md border border-input text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

    const leftRightCommonClassName = 'flex items-center text-muted-foreground'

    return (
      <div className={cn(containerClassName, className)}>
        {left && (
          <div
            className={cn(
              leftRightCommonClassName,
              'rounded-l-md',
              leftStyle ? 'bg-muted border-r' : '-mr-3',
              leftClassName
            )}
          >
            {left}
          </div>
        )}
        <BaseInput className={className} type={type} {...props} ref={ref} isExtended={true} />
        {right && (
          <div
            className={cn(
              leftRightCommonClassName,
              'rounded-r-md',
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

interface InputProps extends Omit<BaseInputProps, 'isExtended'>, ExtendedInputProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ left, right, ...props }, ref) => {
  if (left || right) {
    return <ExtendedInput left={left} right={right} {...props} ref={ref} />
  }
  return <BaseInput {...props} ref={ref} />
})
Input.displayName = 'Input'

/**
 * @deprecated
 */
export { Input }

/**
 * @deprecated
 */
export type { InputProps }
