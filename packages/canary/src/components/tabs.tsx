import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/utils'

const tabsListVariants = cva('inline-flex items-center text-muted-foreground', {
  variants: {
    variant: {
      default: 'h-9 justify-center rounded-lg bg-muted p-1',
      underline: 'h-11 justify-center gap-4',
      navigation: 'h-[44px] w-full justify-start gap-6 border-b border-border-background px-8',
      // TODO: Refactor - merge tabnav and branch variants
      // tabnav is used in existing components and has conflicting styles
      // Future steps:
      // 1. Analyze all tabnav usage locations
      // 2. Create a unified variant based on branch
      // 3. Update existing components
      tabnav: 'h-[36px] w-full justify-start gap-0',
      branch: 'flex w-full border-b border-borders-4 px-3'
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
          'rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        underline:
          'm-0 h-11 border-b-2 border-solid border-b-transparent px-0 font-normal data-[state=active]:border-primary data-[state=active]:text-primary',
        navigation:
          'm-0 h-[44px] border-b border-solid border-b-transparent px-0 text-xs font-normal text-tertiary-background duration-150 ease-in-out hover:text-primary data-[state=active]:border-tertiary-background data-[state=active]:text-primary',
        tabnav:
          'm-0 h-[36px] items-center gap-2 rounded-t-md bg-background px-4 text-sm font-normal text-tertiary-background duration-150 ease-in-out tabnav-inactive hover:text-primary data-[state=active]:text-primary data-[state=active]:tabnav-active [&svg]:data-[state=active]:text-primary',
        branch:
          '-mb-px h-[34px] rounded-t-md border-x border-t border-transparent px-3.5 font-normal text-foreground-2 hover:text-foreground-1 data-[state=active]:border-borders-4 data-[state=active]:text-foreground-1'
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
          <div className="relative grid w-full grid-flow-col grid-cols-[auto_1fr] items-end">
            {children}
            <div className="border-border-background h-[36px] border-b" />
            <div className="border-border-background absolute right-full h-[36px] w-[9999px] border-b" />
            <div className="border-border-background absolute left-full h-[36px] w-[9999px] border-b" />
          </div>
        ) : (
          children
        )}
      </TabsContext.Provider>
    </TabsPrimitive.Root>
  )
)
Tabs.displayName = 'Tabs'
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
