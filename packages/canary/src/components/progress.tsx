import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const progressVariants = cva('', {
  variants: {
    variant: {
      default: 'relative w-full overflow-hidden bg-primary/20'
    },
    size: {
      default: 'h-2',
      sm: 'h-[3px]'
    },
    rounded: {
      default: 'rounded-full ',
      sm: 'rounded-[1px]'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    rounded: 'default'
  }
})

const indicatorColorVariants = cva('', {
  variants: {
    color: {
      default: 'bg-primary',
      accent: 'bg-primary-accent'
    }
  },
  defaultVariants: {
    color: 'default'
  }
})

type ProgressVariants = VariantProps<typeof progressVariants>
type IndicatorColorVariants = VariantProps<typeof indicatorColorVariants>

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
  ProgressVariants &
  IndicatorColorVariants & {
    value?: number
  }

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant, size, rounded, color, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ variant, size, rounded }), className)}
      {...props}>
      <ProgressPrimitive.Indicator
        className={cn('h-full w-full flex-1 transition-all', indicatorColorVariants({ color }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
)

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
