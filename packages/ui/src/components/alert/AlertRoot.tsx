import { forwardRef, PropsWithChildren, useState } from 'react'

import { Button } from '@components/button'
import { cn } from '@utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

import { Icon, IconNameMap } from '../icon'

const alertVariants = cva('cn-alert', {
  variants: {
    theme: {
      info: 'cn-alert-info',
      danger: 'cn-alert-danger',
      warning: 'cn-alert-warning'
    }
  },
  defaultVariants: {
    theme: 'info'
  }
})

export interface AlertRootProps extends PropsWithChildren<VariantProps<typeof alertVariants>> {
  className?: string
  dismissible?: boolean
  onDismiss?: () => void
}

export const AlertRoot = forwardRef<HTMLDivElement, AlertRootProps>(
  ({ className, theme, children, dismissible, onDismiss }, ref) => {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }

    const iconMap: Record<NonNullable<VariantProps<typeof alertVariants>['theme']>, keyof typeof IconNameMap> = {
      info: 'info-circle',
      danger: 'cross-circle',
      warning: 'warning-triangle-outline'
    }

    const iconName: keyof typeof IconNameMap = iconMap[theme ?? 'info']

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ theme }), className)}>
        <Icon className="cn-alert-icon" name={iconName} size={18} />
        <div className="cn-alert-content">{children}</div>
        {dismissible && (
          <Button
            className="cn-alert-close-button"
            onClick={handleDismiss}
            type="button"
            variant="transparent"
            size="sm"
            iconOnly
          >
            <Icon name="close" size={14} />
          </Button>
        )}
      </div>
    )
  }
)

AlertRoot.displayName = 'AlertRoot'
