// ToDo: Need to be reviewed by the XD team

import { Children, ComponentPropsWithoutRef, ElementRef, FC, forwardRef, PropsWithChildren, ReactNode } from 'react'

import { Caption, Label, Message, MessageTheme } from '@/components'
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@utils/cn'

interface SelectError {
  theme: MessageTheme
  message?: string
}

/**
 * Props for the Select component
 * @interface SelectProps
 * @extends {PropsWithChildren}
 * @extends {SelectPrimitive.SelectProps}
 */
interface SelectProps extends PropsWithChildren, SelectPrimitive.SelectProps {
  /** Label text displayed above the select */
  label?: string
  /** Error state configuration */
  error?: SelectError
  /** Optional caption text displayed below the select */
  caption?: ReactNode
  /** Whether the select is disabled */
  disabled?: boolean
  /** Placeholder text shown when no option is selected */
  placeholder: string
}

/**
 * A customizable select component that supports labels, error states, and captions
 * @param {SelectProps} props - The component props
 * @returns {JSX.Element} The Select component
 */
const Select: FC<SelectProps> = ({
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
      <Label className="mb-2.5" color={disabled ? 'disabled-dark' : 'secondary'} htmlFor={name}>
        {label}
      </Label>
    )}
    <SelectTrigger id={name} disabled={disabled}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    {children}
    {error && (
      <Message className={cn(caption ? 'mt-1' : 'absolute top-full translate-y-1')} theme={error.theme}>
        {error.message}
      </Message>
    )}
    {caption && <Caption>{caption}</Caption>}
  </SelectPrimitive.Root>
)
Select.displayName = SelectPrimitive.Root.displayName

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

/**
 * The trigger button for the select dropdown
 * @param {ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { iconClassName?: string }} props - The component props
 * @returns {JSX.Element} The SelectTrigger component
 */
const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { iconClassName?: string }
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

/**
 * The content container for the select dropdown
 * @param {ComponentPropsWithoutRef<typeof SelectPrimitive.Content>} props - The component props
 * @returns {JSX.Element} The SelectContent component
 */
const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
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
        {Children.count(children) > 0 ? children : <div className="pl-2">Nothing to select</div>}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * A label component for grouping select items
 * @param {ComponentPropsWithoutRef<typeof SelectPrimitive.Label>} props - The component props
 * @returns {JSX.Element} The SelectLabel component
 */
const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * An individual selectable item within the dropdown
 * @param {ComponentPropsWithoutRef<typeof SelectPrimitive.Item>} props - The component props
 * @returns {JSX.Element} The SelectItem component
 */
const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
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

/**
 * A visual separator between select items
 * @param {ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>} props - The component props
 * @returns {JSX.Element} The SelectSeparator component
 */
const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }
