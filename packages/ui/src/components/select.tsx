// ToDo: Need to be reviewed by the XD team

import * as React from 'react'

import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@utils/cn'

import { ErrorMessageTheme, FormErrorMessage } from './form-error-message'
import { Label } from './label'
import { Text } from './text'

interface SelectError {
  theme: ErrorMessageTheme
  message?: string
}

interface SelectProps extends React.PropsWithChildren, SelectPrimitive.SelectProps {
  label?: string
  error?: SelectError
  caption?: React.ReactNode
  disabled?: boolean
  placeholder: string
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  error,
  caption,
  disabled = false,
  placeholder,
  children,
  ...props
}) => (
  <SelectPrimitive.Root {...props}>
    {label && (
      <Label className="mb-2.5" theme={disabled ? 'disabled' : 'secondary'} htmlFor={name}>
        {label}
      </Label>
    )}
    <SelectTrigger id={name} disabled={disabled}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    {children}
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
  </SelectPrimitive.Root>
)
Select.displayName = SelectPrimitive.Root.displayName

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { iconClassName?: string }
>(({ className, children, iconClassName, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'border-borders-2 ring-offset-background placeholder:text-foreground-2 flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:rounded disabled:cursor-not-allowed disabled:border-borders-1 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className={cn('h-4 w-4', iconClassName)} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'bg-popover text-popover-foreground relative z-50 max-h-96 min-w-[8rem] max-w-[var(--radix-popper-anchor-width)] overflow-hidden rounded-md box-border shadow-md',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1 rounded-md border',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {React.Children.count(children) > 0 ? children : <div className="pl-2">Nothing to select</div>}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:outline-none',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center outline-none">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }
