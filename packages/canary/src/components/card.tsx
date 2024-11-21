import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva('bg-card text-card-foreground rounded-lg border shadow', {
  variants: {
    variant: {
      default: '',
      plain: 'border-none bg-transparent shadow-none'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  width?: 'auto' | 'full' | 'screen' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string
}

const widthClasses = {
  auto: 'w-auto',
  full: 'w-full',
  screen: 'w-screen',
  xs: 'w-24',
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-72',
  xl: 'w-80',
  '2xl': 'w-96'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ variant, className, width = 'auto', ...props }, ref) => {
  const widthClass = widthClasses[width as keyof typeof widthClasses] || width

  return <div ref={ref} className={cn(cardVariants({ variant }), widthClass, className)} {...props} />
})

Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props}>
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
