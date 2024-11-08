import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

enum BadgesHoverStates {
  ENABLED = 'enabled',
  DISABLED_DEFAULT = 'disabled-default',
  DISABLED_SECONDARY = 'disabled-secondary',
  DISABLED_DESTRUCTIVE = 'disabled-destructive',
  DISABLED_OUTLINE = 'disabled-outline',
  DISABLED_DESTRUCTIVE_THEME = 'disabled-destructive-theme',
  DISABLED_WARNING_THEME = 'disabled-warning-theme',
  DISABLED_SUCCESS_THEME = 'disabled-success-theme',
  DISABLED_EMPHASIS_THEME = 'disabled-emphasis-theme',
  DISABLED_MUTED_THEME = 'disabled-muted-theme'
}

const badgeVariants = cva(
  'inline-flex items-center rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground'
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs font-semibold',
        lg: 'px-3 py-1 text-xs font-normal',
        sm: 'h-5 px-1 text-12 leading-none',
        xs: 'px-1.5 py-0 text-11 font-light'
      },
      borderRadius: {
        default: '',
        full: 'rounded-full'
      },
      hover: {
        [BadgesHoverStates.ENABLED]: '',
        // variant
        [BadgesHoverStates.DISABLED_DEFAULT]: 'hover:shadow-none hover:bg-primary',
        [BadgesHoverStates.DISABLED_SECONDARY]: 'hover:shadow-none hover:bg-secondary',
        [BadgesHoverStates.DISABLED_DESTRUCTIVE]: 'hover:shadow-none hover:bg-destructive',
        [BadgesHoverStates.DISABLED_OUTLINE]: '',
        // theme
        [BadgesHoverStates.DISABLED_DESTRUCTIVE_THEME]: 'hover:shadow-none hover:bg-[hsla(var(--error),0.1)]',
        [BadgesHoverStates.DISABLED_WARNING_THEME]: 'hover:shadow-none hover:bg-[hsla(var(--warning),0.1)]',
        [BadgesHoverStates.DISABLED_SUCCESS_THEME]: 'hover:shadow-none hover:bg-[hsla(var(--success),0.1)]',
        [BadgesHoverStates.DISABLED_EMPHASIS_THEME]: 'hover:shadow-none hover:bg-[hsla(var(--emphasis),0.1)]',
        [BadgesHoverStates.DISABLED_MUTED_THEME]: 'hover:shadow-none hover:bg-tertiary-background/10'
      },
      theme: {
        default: '',
        destructive: 'text-error border-[hsla(var(--error),0.3)] bg-[hsla(var(--error),0.1)]',
        warning: 'text-warning border-[hsla(var(--warning),0.3)] bg-[hsla(var(--warning),0.1)]',
        success: 'text-success border-[hsla(var(--success),0.3)] bg-[hsla(var(--success),0.1)]',
        emphasis: 'text-emphasis border-[hsla(var(--emphasis),0.3)] bg-[hsla(var(--emphasis),0.1)]',
        muted: 'text-tertiary-background border-tertiary-background/20 bg-tertiary-background/10'
      }
    },
    compoundVariants: [
      {
        size: 'sm',
        borderRadius: 'full',
        className: 'px-2'
      }
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hover: BadgesHoverStates.ENABLED,
      theme: 'default'
    }
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  disableHover?: boolean
  color?: 'destructive' | 'success' | 'warning' | 'muted' | 'default'
}

function Badge({
  className,
  variant = 'default',
  size,
  borderRadius = 'default',
  theme = 'default',
  disableHover,
  ...props
}: BadgeProps) {
  const hover = (
    disableHover ? (theme !== 'default' ? `disabled-${theme}-theme` : `disabled-${variant}`) : BadgesHoverStates.ENABLED
  ) as BadgesHoverStates

  return (
    <div
      className={cn(
        badgeVariants({
          variant,
          size,
          borderRadius,
          theme,
          hover
        }),
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
