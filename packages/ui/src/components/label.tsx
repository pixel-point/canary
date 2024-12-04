// ToDo: Need to be reviewed by the XD team

import { ComponentPropsWithoutRef, ElementRef, forwardRef, PropsWithChildren } from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const labelVariants = cva('peer-disabled:cursor-not-allowed peer-disabled:opacity-70', {
  variants: {
    variant: {
      default: 'text-sm font-normal leading-none'
    },
    color: {
      'foreground-1': 'text-foreground-1',
      'foreground-2': 'text-foreground-2',
      'foreground-5': 'text-foreground-5',
      'foreground-9': 'text-foreground-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    color: 'foreground-1'
  }
})

const LabelRoot = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  Omit<ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, 'color'> & VariantProps<typeof labelVariants>
>(({ className, variant, color, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ variant, color }), className)} {...props} />
))
LabelRoot.displayName = LabelPrimitive.Root.displayName

interface LabelProps extends VariantProps<typeof labelVariants>, PropsWithChildren {
  htmlFor?: string
  optional?: boolean
  className?: string
}

const Label = ({ htmlFor, optional, color, variant, children, className }: LabelProps) => {
  return (
    <LabelRoot htmlFor={htmlFor} variant={variant} color={color} className={className}>
      {children} {optional && <span className="text-foreground-7 align-top">(optional)</span>}
    </LabelRoot>
  )
}

export { Label }
