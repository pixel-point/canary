import * as React from 'react'
import { cn } from '../lib/utils'

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

export interface ExtendedInputProps extends BaseInputProps {
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

const ExtendedInput = React.forwardRef<HTMLInputElement, ExtendedInputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    const leftClassName = leftIcon ? "pl-8" : "";
    const rightClassName  =  rightIcon ?"pr-8" : "";

    return (
      <div className="relative flex-grow">
        {leftIcon? <div className="absolute inset-y-0 left-0 flex items-center pl-2">{leftIcon}</div> : null}
        <BaseInput className={cn(className, leftClassName, rightClassName)} type={type} {...props} ref={ref}/>
        {rightIcon ? <div className="absolute inset-y-0 right-0 flex items-center pr-2">{rightIcon} </div> : null}
      </div>
    )
  }
)

export interface InputProps extends BaseInputProps, ExtendedInputProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ leftIcon, rightIcon, ...props }, ref) => {
  if (leftIcon || rightIcon) {
    return <ExtendedInput leftIcon={leftIcon} rightIcon={rightIcon} {...props} ref={ref} />
  }
  return <BaseInput {...props} ref={ref} />
})
Input.displayName = 'Input'

export { Input }
