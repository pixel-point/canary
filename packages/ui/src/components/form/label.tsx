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
      primary: 'text-foreground-1',
      secondary: 'text-foreground-2',
      disabled: 'text-foreground-5',
      'disabled-dark': 'text-foreground-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    color: 'primary'
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

/**
 * A Label component that wraps the Radix UI LabelPrimitive.Root component.
 * It supports variant and color styling through class-variance-authority.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.htmlFor] - The id of the element this label is associated with.
 * @param {boolean} [props.optional] - If true, renders "(optional)" next to the label text.
 * @param {string} [props.color] - The color variant of the label.
 * @param {string} [props.variant] - The style variant of the label.
 * @param {React.ReactNode} props.children - The content of the label.
 * @param {string} [props.className] - Additional class names to apply to the label.
 * @returns {JSX.Element} The rendered label component.
 */
const Label = ({ htmlFor, optional, color, variant, children, className }: LabelProps) => {
  return (
    <LabelRoot htmlFor={htmlFor} variant={variant} color={color} className={className}>
      {children} {optional && <span className="align-top text-foreground-7">(optional)</span>}
    </LabelRoot>
  )
}

export { Label }
