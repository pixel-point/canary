import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@utils/cn'

import { Icon } from './icon'
import { Label } from './label'

interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
}

const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <div className={cn('flex gap-x-2.5', className)}>
      <CheckboxPrimitive.Root
        ref={ref}
        className="border-icons-1 hover:border-icons-3 disabled:border-icons-4 data-[state=checked]:border-icons-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer size-4 shrink-0 rounded-sm border shadow disabled:cursor-not-allowed"
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
          <Icon className="h-1.5 w-2" name="checkbox" width={8} height={6} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label className="leading-tight" theme="foreground-1" htmlFor={props.id}>
          {label}
        </Label>
      )}
    </div>
  )
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
