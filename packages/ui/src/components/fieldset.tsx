import { cn } from '@utils/cn'

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  box?: boolean
  shaded?: boolean
}

export function Fieldset({ children, box, shaded, className, ...props }: FieldsetProps) {
  return (
    <fieldset
      className={cn(
        'flex flex-col',
        { 'rounded-md border px-5 py-3.5 pb-5': box, 'bg-primary/[0.02]': shaded },
        className
      )}
      role="group"
      aria-describedby="fieldset-description"
      {...props}
    >
      {children}
    </fieldset>
  )
}
