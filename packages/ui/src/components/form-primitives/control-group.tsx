import { ElementRef, forwardRef, HTMLAttributes } from 'react'

import { cn } from '@utils/cn'

interface ControlGroupProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'button' | 'input'
}

/**
 * A container component that groups form control elements together.
 * @example
 * <ControlGroup type="button">
 *   <Button>Button</Button>
 * </ControlGroup>
 */
export const ControlGroup = forwardRef<ElementRef<'div'>, ControlGroupProps>(
  ({ children, type, className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label={type === 'button' ? 'Button control group' : 'Input control group'}
      className={cn('relative flex flex-col', className)}
      {...props}
    >
      {children}
    </div>
  )
)

ControlGroup.displayName = 'ControlGroup'
