import * as React from 'react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@utils/cn'

import { Checkbox } from './checkbox'
import { Label } from './label'
import { Text } from './text'

type ControlType = React.ReactElement<typeof RadioGroupItem> | React.ReactElement<typeof Checkbox>
interface RadioGroupItemProps {
  control: ControlType
  id: string
  label?: string
  description?: string | React.ReactNode
  className?: string
  ariaSelected?: boolean
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-5', className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = ({ control, id, label, description, ariaSelected, className }: RadioGroupItemProps) => {
  return (
    <div
      className={cn('flex items-start', className)}
      role="option"
      aria-labelledby={`${id}-label`}
      aria-selected={ariaSelected}
    >
      {control}
      <div className="flex flex-col gap-0">
        <Label htmlFor={id} className="cursor-pointer pl-4 font-medium leading-tight">
          {label}
        </Label>
        {description && (
          <Text
            className="ml-4 mt-1.5 leading-snug tracking-tight"
            as="p"
            size={2}
            color="tertiaryBackground"
            id={`${id}-description`}
            role="note"
          >
            {description}
          </Text>
        )}
      </div>
    </div>
  )
}

const RadioButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'border-icons-1 data-[state=checked]:border-icons-2 hover:border-icons-3 text-icons-5 aspect-square h-4 w-4 rounded-full border shadow focus-visible:rounded-full disabled:cursor-not-allowed disabled:border-icons-4 flex items-center justify-center',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="bg-icons-2 size-2 rounded-full" />
    </RadioGroupPrimitive.Item>
  )
})
RadioButton.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioButton, RadioGroupItem }
