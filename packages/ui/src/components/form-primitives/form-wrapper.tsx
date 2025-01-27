import { FormHTMLAttributes } from 'react'

import { cn } from '@utils/cn'

interface FormWrapperProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string
  children?: React.ReactNode
  formRef?: (form: HTMLFormElement) => void
}

/**
 * A wrapper component that provides consistent spacing and layout for HTML form elements.
 * Extends the native HTML form element with consistent styling.
 *
 * @example
 * <FormWrapper className="my-custom-class" onSubmit={handleSubmit}>
 *   <Input type="text" />
 *   <Textarea type="email" />
 * </FormWrapper>
 */
export function FormWrapper({ className, children, formRef, ...props }: FormWrapperProps) {
  return (
    <form className={cn('flex flex-col gap-y-8', className)} ref={formRef} {...props}>
      {children}
    </form>
  )
}
