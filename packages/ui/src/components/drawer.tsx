import * as React from 'react'

import { usePortal } from '@/context'
import { cn } from '@utils/cn'
import { Drawer as DrawerPrimitive } from 'vaul'

const DrawerRoot = ({
  shouldScaleBackground = true,
  nested = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) =>
  nested ? (
    <DrawerPrimitive.NestedRoot shouldScaleBackground={shouldScaleBackground} {...props} />
  ) : (
    <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
  )
DrawerRoot.displayName = 'DrawerRoot'

const LazyDrawer = ({
  children,
  open,
  onOpenChange,
  unmountOnClose = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & { unmountOnClose?: boolean }) => {
  const [hasRendered, setHasRendered] = React.useState(open || false)

  const prevOpenState = React.useRef(false)

  React.useEffect(() => {
    if (prevOpenState.current === false && open) {
      setHasRendered(true)
      prevOpenState.current = true
    }
    // if unmountOnClose=true set hasRendered with delay
    else if (unmountOnClose && prevOpenState.current === true && !open) {
      const timer = setTimeout(() => {
        setHasRendered(false)
        prevOpenState.current = false
      }, 250)

      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} {...props}>
      {hasRendered ? children : null}
    </Drawer.Root>
  )
}

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-50 dialog-backdrop', className)} {...props} />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { portalContainer } = usePortal()
  return (
    <DrawerPortal container={portalContainer}>
      <DrawerOverlay>
        <DrawerPrimitive.Content
          ref={ref}
          className={cn(
            'bg-cn-background-2 fixed flex flex-col inset-y-0 right-0 z-50 w-1/4 border-l border-cn-borders-3',
            className
          )}
          {...props}
        >
          {children}
        </DrawerPrimitive.Content>
      </DrawerOverlay>
    </DrawerPortal>
  )
})
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid gap-1.5 text-center px-6 py-5 sm:text-left border-b border-cn-borders-3', className)}
    {...props}
  />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerInner = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col grow gap-4 pt-5 overflow-auto', className)} {...props} />
)
DrawerInner.displayName = 'DrawerInner'

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto sticky bottom-0 flex flex-col gap-2 border-t border-cn-borders-3', className)}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title ref={ref} className={cn('text-xl font-semibold leading-6', className)} {...props} />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn('text-cn-foreground-3 text-sm', className)} {...props} />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

const Drawer = {
  Root: DrawerRoot,
  Lazy: LazyDrawer,
  Portal: DrawerPortal,
  Overlay: DrawerOverlay,
  Trigger: DrawerTrigger,
  Close: DrawerClose,
  Content: DrawerContent,
  Header: DrawerHeader,
  Inner: DrawerInner,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription
}

export { Drawer }
