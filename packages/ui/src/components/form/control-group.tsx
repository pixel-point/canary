import { HTMLAttributes } from 'react'

import { cn } from '@utils/cn'

interface ControlGroupProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'button' | 'input'
}

/**
 * A container component that groups form control elements together.
 *
 * @param props.type - Specifies the type of control group ('button' or 'input').
 *                     Affects spacing and ARIA labels.
 * @param props.children - The form control elements to be grouped (Label, Input/Button,
 *                        ErrorMessage, Caption, etc.).
 * @param props.className - Additional CSS classes to apply to the control group.
 */
export function ControlGroup({ children, type, className, ...props }: ControlGroupProps) {
  return (
    <div
      className={cn('relative flex flex-col', { 'mt-2': type === 'button' }, className)}
      role="group"
      aria-label={type === 'button' ? 'Button control group' : 'Input control group'}
      {...props}
    >
      {children}
    </div>
  )
}
