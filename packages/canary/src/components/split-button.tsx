import * as React from 'react'
import { type ButtonProps, Button, buttonVariants } from './button'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { CanaryOutletFactory, CanaryOutletName } from '@/lib/CanaryOutletFactory'

export interface SplitButtonProps extends Omit<ButtonProps, 'asChild'> {
  menu?: React.ReactNode
  menuAlign?: 'start' | 'end' | 'center'
  popoverContentClass?: string
}

export const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  ({ menu, menuAlign = 'end', popoverContentClass, disabled, loading, onClick, children, variant, ...others }, ref) => {
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
          <Popover>
            <PopoverTrigger asChild>
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
            </PopoverTrigger>
            <PopoverContent className={popoverContentClass} align={menuAlign}>
              {menu}
            </PopoverContent>
          </Popover>
        </div>
      </Button>
    )
  }
)
SplitButton.displayName = 'SplitButton'
