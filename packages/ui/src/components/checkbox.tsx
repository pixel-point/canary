import * as React from 'react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@utils/cn'

import { Label } from './label'

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <div className={cn('flex gap-x-2.5', className)}>
      <CheckboxPrimitive.Root
        ref={ref}
        className="border-icons-1 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:border-icons-2 data-[state=checked]:text-primary-foreground peer size-4 shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
          <CheckIcon className="size-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label className="text-foreground-1 font-normal leading-tight tracking-tight" htmlFor={props.id}>
          {label}
        </Label>
      )}
    </div>
  )
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
