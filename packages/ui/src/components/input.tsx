import * as React from 'react'

import { cn } from '../utils/cn'
import { Text } from './'

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isExtended?: boolean
  error?: string
  wrapperClassName?: string
}

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, type, isExtended, error, wrapperClassName, ...props }, ref) => {
    const commonClassName =
      'remove-autocomplete-styles bg-transparent placeholder:text-foreground-5 text-foreground-1 px-3 py-1'
    const specificClassNames = isExtended
      ? 'border-none grow focus-visible:outline-none'
      : cn(
          'flex h-9 w-full rounded border text-sm shadow-sm transition-colors file:border-0 focus-visible:outline-none file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-4 disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-borders-danger' : 'border-borders-2 focus-visible:border-borders-3'
        )

    return (
      <div className={cn('relative flex flex-col', wrapperClassName)}>
        <input className={cn(commonClassName, specificClassNames, className)} type={type} ref={ref} {...props} />
        {error && (
          <Text
            className="text-foreground-danger absolute top-full leading-none translate-y-1 tracking-tight"
            weight="light"
            size={0}
          >
            {error}
          </Text>
        )}
      </div>
    )
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
  'remove-autocomplete-styles flex h-9 w-full rounded border border-input text-sm shadow-sm transition-colors placeholder:text-foreground-4 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
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
        <BaseInput className={className} type={type} {...props} ref={ref} isExtended={true} />
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

interface InputProps extends Omit<BaseInputProps, 'isExtended'>, ExtendedInputProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ left, right, ...props }, ref) => {
  if (left || right) {
    return <ExtendedInput left={left} right={right} {...props} ref={ref} />
  }
  return <BaseInput {...props} ref={ref} />
})
Input.displayName = 'Input'

export { Input }
export type { InputProps }
