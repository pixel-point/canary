import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef, ReactElement, ReactNode } from 'react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@utils/cn'

import { Checkbox } from './checkbox'
import { Label } from './label'
import { Text } from './text'

type ControlType = ReactElement<typeof RadioGroupItem> | ReactElement<typeof Checkbox>
interface RadioGroupItemProps {
  control: ControlType
  id: string
  label?: string
  description?: string | ReactNode
  className?: string
  ariaSelected?: boolean
}

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-5', className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem: FC<RadioGroupItemProps> = ({ control, id, label, description, ariaSelected, className }) => {
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

const RadioButton = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'relative border-primary hover:border-icons-3 text-icons-5 aspect-square h-4 w-4 rounded-full border shadow focus-visible:rounded-full disabled:cursor-not-allowed disabled:border-icons-4 flex items-center justify-center',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="bg-primary size-2 rounded-full" />
    </RadioGroupPrimitive.Item>
  )
})
RadioButton.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioButton, RadioGroupItem }
