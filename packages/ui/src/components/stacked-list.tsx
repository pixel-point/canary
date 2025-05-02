import * as React from 'react'
import { ElementRef, forwardRef } from 'react'

import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '@utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

import { Icon } from './icon'

const listItemVariants = cva(
  'flex flex-1 flex-row flex-wrap items-center justify-start gap-1 border-b p-4 align-middle',
  {
    variants: {
      disabled: {
        true: '',
        false: ''
      },
      loading: {
        true: '',
        false: ''
      }
    }
  }
)

const listFieldVariants = cva('flex flex-1 flex-col items-stretch justify-center gap-[0.3125rem] text-sm', {
  variants: {
    right: {
      true: 'items-end'
    }
  }
})

interface ListItemProps extends React.ComponentProps<'div'>, VariantProps<typeof listItemVariants> {
  thumbnail?: React.ReactNode
  actions?: React.ReactNode
  asChild?: boolean
  isLast?: boolean
  isHeader?: boolean
  disableHover?: boolean
}

interface ListFieldProps extends Omit<React.ComponentProps<'div'>, 'title'>, VariantProps<typeof listFieldVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  label?: boolean
  secondary?: boolean
  primary?: boolean
}

interface ListProps extends React.ComponentProps<'div'> {
  onlyTopRounded?: boolean
  borderBackground?: boolean
  withoutBorder?: boolean
}

const List = forwardRef<ElementRef<'div'>, ListProps>(
  ({ className, children, onlyTopRounded, borderBackground, withoutBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-full bg-cn-background-2',
        'border [&>div:last-child]:border-0',
        '[&>*:first-child_>.stacked-list-item]:rounded-t-md [&>.stacked-list-item:first-child]:rounded-t-md',
        {
          '[&>*:last-child_>.stacked-list-item]:rounded-b-md [&>.stacked-list-item:last-child]:rounded-b-md':
            !onlyTopRounded
        },
        onlyTopRounded ? 'rounded-t-md' : 'rounded-md',
        withoutBorder ? 'border-none' : '',
        borderBackground ? 'border-cn-borders-2' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

List.displayName = 'StackedList'

const ListItem = forwardRef<ElementRef<'div'>, ListItemProps>(
  ({ className, children, thumbnail, actions, asChild, isLast, isHeader, disableHover = false, ...props }, ref) => {
    const Comp: any = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        className={cn(
          'stacked-list-item',
          listItemVariants({}),
          className,
          isLast ? 'border-none' : 'border-b',
          isHeader && 'bg-cn-background-2',
          !disableHover && 'hover:bg-cn-background-hover cursor-pointer duration-150 ease-in-out'
        )}
        {...props}
      >
        {thumbnail && <div className="mr-2 flex items-center">{thumbnail}</div>}
        <Slottable>{children}</Slottable>
        {actions && <div className="ml-2 flex items-center">{actions}</div>}
        <Icon name="chevron-right" className="hidden" />
      </Comp>
    )
  }
)

ListItem.displayName = 'StackedListItem'

const ListField = forwardRef<ElementRef<'div'>, ListFieldProps>(
  ({ className, title, description, label, primary, secondary, right, ...props }, ref) => (
    <div className={cn(listFieldVariants({ right }), className)} {...props} ref={ref}>
      {title && (
        <div
          className={cn(
            primary ? 'text-3 leading-snug' : secondary ? 'text-2' : 'text-sm',
            'text-cn-foreground-1 [&>em]:text-cn-foreground-1 font-normal [&>em]:font-medium [&>em]:not-italic',
            !!label && 'text-cn-foreground-2',
            className
          )}
        >
          {title}
        </div>
      )}
      {description && (
        <div
          className={cn(
            'text-cn-foreground-2 flex gap-2 text-ellipsis whitespace-nowrap',
            primary ? 'text-sm' : 'text-2',
            className
          )}
        >
          {description}
        </div>
      )}
    </div>
  )
)

ListField.displayName = 'StackedListField'

const Root = List
const Item = ListItem
const Field = ListField

export { Root, Item, Field }

export type { ListItemProps, ListFieldProps }
