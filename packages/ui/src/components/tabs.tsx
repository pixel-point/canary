import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const tabsListVariants = cva('inline-flex items-center text-cn-foreground-2', {
  variants: {
    variant: {
      default: 'h-9 justify-center rounded-lg bg-cn-background-softgray p-1',
      underline: 'h-11 justify-center gap-4',
      /**
       * TODO: Technical Debt - Navigation Variant Removal
       * This variant needs to be removed after:
       * 1. Verifying all dependencies in packages/ui || packages/views
       * 2. Migrating existing usages to TabNav component
       * 3. Ensuring no breaking changes in the application
       *
       * @deprecated Use TabNav component instead
       */
      navigation: 'h-[44px] w-full justify-start gap-6 border-b border-cn-borders-3 px-5',
      tabnav:
        'before:bg-cn-borders-3 relative flex w-full before:absolute before:bottom-0 before:left-0 before:h-px before:w-full'
    },
    fontSize: {
      xs: 'text-1',
      sm: 'text-2'
    }
  },
  defaultVariants: {
    variant: 'default',
    fontSize: 'sm'
  }
})

const tabsTriggerVariants = cva(
  'group relative inline-flex items-center justify-center whitespace-nowrap px-3 py-1 font-medium transition-all focus-visible:duration-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-cn-foreground-1',
  {
    variants: {
      variant: {
        default: 'rounded-md data-[state=active]:bg-cn-background data-[state=active]:shadow',
        underline:
          'm-0 h-11 border-b-2 border-solid border-b-transparent px-0 font-normal data-[state=active]:border-cn-borders-1',
        /**
         * TODO: Technical Debt - Navigation Variant Removal
         * This variant needs to be removed after:
         * 1. Verifying all dependencies in packages/views
         * 2. Migrating existing usages to TabNav component
         * 3. Ensuring no breaking changes in the application
         *
         * @deprecated Use TabNav component instead
         */
        navigation:
          'm-0 -mb-px h-[44px] border-b-2 border-solid border-b-transparent px-0 font-normal text-cn-foreground-2 duration-150 ease-in-out hover:text-cn-foreground-1 data-[state=active]:border-cn-borders-9',
        tabnav:
          'h-9 rounded-t-md border-x border-t border-transparent px-3.5 font-normal text-cn-foreground-2 hover:text-cn-foreground-1 data-[state=active]:border-cn-borders-2 data-[state=active]:bg-cn-background-1 data-[state=active]:text-cn-foreground-1'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const tabsContentVariants = cva(
  'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cn-borders-accent focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: '',
        underline: '',
        /**
         * TODO: Technical Debt - Navigation Variant Removal
         * This variant needs to be removed after:
         * 1. Verifying all dependencies in packages/views
         * 2. Migrating existing usages to TabNav component
         * 3. Ensuring no breaking changes in the application
         *
         * @deprecated Use TabNav component instead
         */
        navigation: '',
        tabnav: ''
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const TabsContext = React.createContext<VariantProps<typeof tabsListVariants | typeof tabsTriggerVariants>>({
  variant: 'default'
})

interface TabsRootProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsListVariants | typeof tabsTriggerVariants> {}

const TabsRoot = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsRootProps>(
  ({ children, variant, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} {...props}>
      <TabsContext.Provider value={{ variant }}>{children}</TabsContext.Provider>
    </TabsPrimitive.Root>
  )
)
TabsRoot.displayName = 'TabsRoot'

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant, fontSize, ...props }, ref) => {
    const context = React.useContext(TabsContext)

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ variant: context.variant ?? variant, fontSize, className }))}
        {...props}
      />
    )
  }
)
TabsList.displayName = TabsPrimitive.List.displayName

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ className, variant, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(tabsTriggerVariants({ variant: context.variant ?? variant, className }))}
        {...props}
      >
        {children}
      </TabsPrimitive.Trigger>
    )
  }
)
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {}

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, TabsContentProps>(
  ({ className, variant, ...props }, ref) => {
    const context = React.useContext(TabsContext)

    return (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(tabsContentVariants({ variant: context.variant ?? variant, className }))}
        {...props}
      />
    )
  }
)
TabsContent.displayName = TabsPrimitive.Content.displayName

const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent
}

export { Tabs }
