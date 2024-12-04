import { HTMLAttributes } from 'react'

import { cn } from '@utils/cn'

interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  box?: boolean
  shaded?: boolean
}

/**
 * A form fieldset component that groups related form elements.
 * @component
 * @param {FieldsetProps} props - The component props
 * @param {ReactNode} props.children - The content to be rendered inside the fieldset
 * @param {boolean} [props.box] - When true, adds border and padding to create a box around the fieldset
 * @param {boolean} [props.shaded] - When true, adds a subtle background color to the fieldset
 * @param {string} [props.className] - Additional CSS classes to apply to the fieldset
 * @returns {JSX.Element} A styled fieldset element
 */
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
