import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const spacerVariants = cva('block pb-px mt-4', {
  variants: {
    size: {
      1: 'mt-1',
      2: 'mt-2',
      3: 'mt-3',
      4: 'mt-4',
      5: 'mt-5',
      6: 'mt-6',
      7: 'mt-7',
      8: 'mt-8',
      9: 'mt-9',
      10: 'mt-10',
      11: 'mt-11',
      12: 'mt-12'
    }
  }
})

export interface SpacerProps extends React.ComponentProps<'span'>, VariantProps<typeof spacerVariants> {}

const Spacer = ({ className, size, ...props }: SpacerProps) => (
  <span aria-hidden className={cn(spacerVariants({ size, className }))} {...props}></span>
)

Spacer.displayName = 'Spacer'

export { Spacer }
