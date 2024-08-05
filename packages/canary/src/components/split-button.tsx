import * as React from 'react'
import { type ButtonProps, Button, buttonVariants } from './button'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu'
import { CanaryOutletFactory, CanaryOutletName } from '@/lib/CanaryOutletFactory'

export interface SplitButtonProps extends Omit<ButtonProps, 'asChild'> {
  menu?: React.ReactNode
  dropdownAlign?: 'start' | 'end' | 'center'
  dropdownMenuContentClass?: string
}

export const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  (
    { menu, dropdownAlign = 'end', dropdownMenuContentClass, disabled, loading, onClick, children, variant, ...others },
    ref
  ) => {
    if (loading) {
      return <Button disabled={true} loading={loading} children={children} variant={variant} {...others} ref={ref} />
    }

    return (
      <Button
        className="px-0 py-0 hover:bg-current pointer-events-none overflow-hidden"
        asChild
        variant={variant}
        {...others}
        ref={ref}>
        <div>
          <Button
            loading={loading}
            disabled={disabled}
            variant={variant}
            children={children}
            onClick={onClick}
            {...others}
            className="rounded-none border-none pointer-events-auto"
          />
          <Button
            disabled={disabled}
            asChild
            className={cn(buttonVariants({ variant }), 'shadow-none rounded-none p-0 m-0 border-none h-full')}>
            <span>|</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={variant}
                disabled={disabled}
                {...others}
                className="shadow-none rounded-none border-none pointer-events-auto px-2">
                {CanaryOutletFactory.getOutlet(CanaryOutletName.SPLIT_ICON, {
                  variant,
                  loading,
                  disabled,
                  children
                })}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={dropdownMenuContentClass} align={dropdownAlign}>
              {menu}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Button>
    )
  }
)
SplitButton.displayName = 'SplitButton'
