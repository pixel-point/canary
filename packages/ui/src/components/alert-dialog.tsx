import * as React from 'react'

import { buttonVariants } from '@/components/button'
import { usePortal } from '@/context'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@utils/cn'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

interface AlertDialogOverlayProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  onClick?: () => void
}

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ className, onClick, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn('bg-background-7/50 fixed inset-0 z-50', className)}
    {...props}
    ref={ref}
    onClick={onClick}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  onOverlayClick?: () => void
}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className = 'max-w-lg', children, onOverlayClick, ...props }, ref) => {
  const { portalContainer } = usePortal()
  const mainContent: React.ReactNode[] = []
  let footer: React.ReactNode = null

  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === AlertDialogFooter) {
      footer = child
    } else {
      mainContent.push(child)
    }
  })

  return (
    <AlertDialogPortal container={portalContainer}>
      <AlertDialogOverlay onClick={onOverlayClick} />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          'bg-background-1 shadow-1 fixed left-[50%] top-[50%] z-50 flex w-full translate-x-[-50%] translate-y-[-50%] flex-col overflow-hidden rounded-10 border duration-200',
          className
        )}
        {...props}
      >
        <div
          className={cn('flex flex-col gap-y-4 overflow-y-auto p-5', footer ? 'max-h-[calc(100%-65px)]' : 'max-h-full')}
        >
          {mainContent}
        </div>
        {footer}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  )
})
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'bg-background-2 border-borders-1 relative mt-auto flex h-fit flex-col-reverse gap-x-4 border-t px-5 py-4 sm:flex-row sm:justify-end',
      'before:from-background-1 before:pointer-events-none before:absolute before:inset-x-0 before:-top-px before:h-3 before:-translate-y-full before:bg-gradient-to-t before:to-transparent',
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-foreground-1 text-xl font-semibold tracking-tight', className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & {
    variant?: 'secondary' | 'quaternary'
    size?: 'sm'
  }
>(({ className, variant = 'quaternary', size = 'sm', ...props }, ref) => {
  const variants = {
    variant: {
      secondary: 'text-foreground-2',
      quaternary: 'text-foreground-4'
    },
    size: {
      sm: 'text-sm'
    }
  }

  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn(className, variants.variant[variant], variants.size[size])}
      {...props}
    />
  )
})
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
}
