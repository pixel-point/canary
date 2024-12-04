import { cn } from '@utils/cn'

interface FormSeparatorProps {
  dashed?: boolean
  dotted?: boolean
  className?: string
}

export function FormSeparator({ dashed, dotted, className }: FormSeparatorProps) {
  return (
    <div
      className={cn('border-b', { 'border-dashed': dashed, 'border-dotted': dotted }, className)}
      role="separator"
      aria-orientation="horizontal"
    />
  )
}
