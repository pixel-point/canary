import { cn } from '@utils/cn'

interface ControlGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'button' | 'input'
}

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
