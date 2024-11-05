import * as React from 'react'
import { cn } from '@/lib/utils'
import { ButtonProps, buttonVariants } from '@/components/button'
import { Icon } from './icon'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full px-9 max-w-full items-center justify-between', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-grow items-center justify-center gap-3', className)} {...props} />
  )
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('first:mr-auto last:ml-auto', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({ className, isActive, size, ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: 'custom',
        size: size ? size : 'sm_icon',
        borderRadius: 'full'
      }),
      'text-12 font-normal min-w-7 px-1.5 w-auto bg-pagination-bg text-secondary-foreground hover:bg-pagination-bg-hover',
      {
        'bg-pagination-bg-active shadow-[0px_2px_4px_0px_hsla(var(--pagination-shadow-active),_0.5)] cursor-default hover:bg-pagination-bg-active':
          isActive
      },
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({ disabled, className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(
      'gap-1.5 pl-2.5 text-sm font-normal bg-transparent cursor-pointer text-pagination-text',
      'hover:text-primary hover:bg-transparent',
      { 'text-secondary-muted cursor-default pointer-events-none': disabled },
      className
    )}
    {...props}>
    <Icon name="arrow-long" size={12} className="rotate-180 text-tertiary-background" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ disabled, className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      'gap-1.5 pr-2.5 text-sm font-normal bg-transparent cursor-pointer text-pagination-text',
      'hover:text-primary hover:bg-transparent',
      { 'text-secondary-muted cursor-default pointer-events-none': disabled },
      className
    )}
    {...props}>
    <span>Next</span>
    <Icon name="arrow-long" size={12} />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn(
      'flex h-7 w-7 items-center justify-center text-12 font-normal bg-pagination-bg rounded-full',
      className
    )}
    {...props}>
    ...
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
}
