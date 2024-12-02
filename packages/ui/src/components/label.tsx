// ToDo: Need to be reviewed by the XD team

import * as React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const labelVariants = cva('peer-disabled:cursor-not-allowed peer-disabled:opacity-70', {
  variants: {
    variant: {
      default: 'text-sm font-normal leading-none'
    },
    theme: {
      primary: 'text-foreground-1',
      secondary: 'text-foreground-2',
      disabled: 'text-foreground-5',
      'disabled-dark': 'text-foreground-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    theme: 'primary'
  }
})

const LabelRoot = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, variant, theme, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ variant, theme }), className)} {...props} />
))
LabelRoot.displayName = LabelPrimitive.Root.displayName

interface LabelProps extends VariantProps<typeof labelVariants>, React.PropsWithChildren {
  htmlFor?: string
  optional?: boolean
  className?: string
}

const Label = ({ htmlFor, optional, theme, variant, children, className }: LabelProps) => {
  return (
    <LabelRoot htmlFor={htmlFor} variant={variant} theme={theme} className={className}>
      {children} {optional && <span className="text-foreground-7 align-top">(optional)</span>}
    </LabelRoot>
  )
}

export { Label }
