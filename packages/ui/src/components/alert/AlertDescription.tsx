import { forwardRef, PropsWithChildren } from 'react'

import { cn } from '@utils/cn'

export interface AlertDescriptionProps extends PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  className?: string
}

export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(({ className, children }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)}>
    {children}
  </div>
))

AlertDescription.displayName = 'AlertDescription'
