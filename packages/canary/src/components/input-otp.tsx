import * as React from 'react'
import { DashIcon } from '@radix-ui/react-icons'
import { OTPInput, OTPInputContext } from 'input-otp'

import { cn } from '@/lib/utils'

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn('flex items-center gap-2 has-[:disabled]:opacity-50', containerClassName)}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  )
)
InputOTP.displayName = 'InputOTP'

const InputOTPGroup = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center', className)} {...props} />
)
InputOTPGroup.displayName = 'InputOTPGroup'

interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<'div'> {
  index: number
  size?: 'lg' | 'default'
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, size = 'default', className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)

    if (!inputOTPContext?.slots?.[index]) {
      console.error(`No slot data available for index ${index}`)
      return null
    }

    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    return (
      <div
        ref={ref}
        className={cn(
          'h-9 w-9 text-sm relative flex items-center justify-center border-y border-r border-input shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
          { 'h-12 w-10 text-xl border-l border-r border-t border-b mx-1 p-2 rounded-md': size === 'lg' },
          isActive && 'z-10 ring-1 ring-ring',
          className
        )}
        {...props}>
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = 'InputOTPSlot'

const InputOTPSeparator = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <DashIcon />
    </div>
  )
)
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
