import { forwardRef, PropsWithChildren } from 'react'

import { cn } from '@utils/cn'

export interface AlertTitleProps extends PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  className?: string
}

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(({ className, children }, ref) => (
  <h5 ref={ref} className={cn('cn-alert-title', className)}>
    {children}
  </h5>
))

AlertTitle.displayName = 'AlertTitle'
