import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../lib/utils'

const tabsListVariants = cva('inline-flex items-center text-muted-foreground', {
  variants: {
    variant: {
      default: 'h-9 rounded-lg bg-muted p-1 justify-center',
      underline: 'h-11 gap-4 justify-center',
      navigation: 'h-[44px] border-b border-border-background gap-6 justify-start w-full px-8',
      // TODO: Refactor - merge tabnav and branch variants
      // tabnav is used in existing components and has conflicting styles
      // Future steps:
      // 1. Analyze all tabnav usage locations
      // 2. Create a unified variant based on branch
      // 3. Update existing components
      tabnav: 'h-[36px] gap-0 justify-start w-full',
      branch: 'w-full flex border-b border-borders-4 px-3'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-md data-[state=active]:bg-background data-[state=active]:shadow data-[state=active]:text-foreground',
        underline:
          'px-0 font-normal h-11 border-b-2 border-b-transparent border-solid m-0 data-[state=active]:text-primary data-[state=active]:border-primary',
        navigation:
          'px-0 font-normal text-xs text-tertiary-background hover:text-primary ease-in-out duration-150 h-[44px] border-b border-b-transparent border-solid m-0 data-[state=active]:text-primary data-[state=active]:border-tertiary-background',
        tabnav:
          'px-4 items-center gap-2 bg-background font-normal text-sm text-tertiary-background ease-in-out duration-150 hover:text-primary h-[36px] rounded-tl-md rounded-tr-md m-0 data-[state=active]:text-primary [&svg]:data-[state=active]:text-primary tabnav-inactive data-[state=active]:tabnav-active',
        branch:
          'h-[34px] font-normal px-3.5 text-foreground-2 hover:text-foreground-1 -mb-px border-t border-x rounded-t-md border-transparent data-[state=active]:text-foreground-1 data-[state=active]:border-borders-4'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const tabsContentVariants = cva(
  'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: '',
        underline: '',
        navigation: '',
        tabnav: '',
        branch: ''
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

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsListVariants | typeof tabsTriggerVariants> {}

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ children, variant, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} {...props}>
      <TabsContext.Provider value={{ variant }}>
        {variant === 'tabnav' ? (
          <div className="relative w-full grid grid-flow-col grid-cols-[auto_1fr] items-end">
            {children}
            <div className="h-[36px] border-b border-border-background" />
            <div className="absolute right-full w-[9999px] h-[36px] border-b border-border-background" />
            <div className="absolute left-full w-[9999px] h-[36px] border-b border-border-background" />
          </div>
        ) : (
          children
        )}
      </TabsContext.Provider>
    </TabsPrimitive.Root>
  )
)

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant, ...props }, ref) => {
    const context = React.useContext(TabsContext)

    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          tabsListVariants({
            variant: context.variant ?? variant,
            className
          })
        )}
        {...props}
      />
    )
  }
)
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
  ({ className, variant, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(tabsTriggerVariants({ variant: context.variant ?? variant, className }))}
        {...props}
      />
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

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type { TabsListProps, TabsProps }
