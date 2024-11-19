import * as React from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { cn } from '../lib/utils'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Icon as CanaryIcon } from '../components/icon'
import { createContext, forwardRef, useCallback, useContext, useEffect, useState } from 'react'

/**
 * @TODO remove this from treeview component
 */
enum Status {
  QUEUED = 'queued',
  IN_PROGRESS = 'in_progress',
  SUCCESS = 'success',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  WAITING_ON_DEPENDENCIES = 'waiting_on_dependencies',
  UNKNOWN = 'unknown'
}

type ExecutionDetail = {
  status: Status
  /* formatted duration */
  duration?: string
}

const getStatusIcon = (status: Status): React.ReactElement => {
  switch (status) {
    case Status.IN_PROGRESS:
      return <CanaryIcon size={16} name="running" className="animate-spin text-warning" />
    case Status.SUCCESS:
      return <CanaryIcon name="success" size={16} />
    case Status.FAILED:
      return <CanaryIcon name="fail" size={16} />
    case Status.WAITING_ON_DEPENDENCIES:
    case Status.QUEUED:
      return <CanaryIcon name="pending-clock" size={16} />
    case Status.SKIPPED:
    case Status.UNKNOWN:
    default:
      return <CanaryIcon name="circle" size={16} />
  }
}

type TreeViewElement = {
  id: string
  name: string
  isSelectable?: boolean
  children?: TreeViewElement[]
} & ExecutionDetail

type TreeContextProps = {
  selectedId: string | undefined
  expendedItems: string[] | undefined
  indicator: boolean
  handleExpand: (id: string) => void
  selectItem: (id: string) => void
  setExpendedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>
  openIcon?: React.ReactNode
  closeIcon?: React.ReactNode
  direction: 'rtl' | 'ltr'
}

const TreeContext = createContext<TreeContextProps | null>(null)

const useTree = () => {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error('useTree must be used within a TreeProvider')
  }
  return context
}

type Direction = 'rtl' | 'ltr' | undefined

type TreeViewProps = {
  initialSelectedId?: string
  indicator?: boolean
  elements?: TreeViewElement[]
  initialExpendedItems?: string[]
  openIcon?: React.ReactNode
  closeIcon?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpendedItems,
      children,
      indicator = true,
      openIcon,
      closeIcon,
      dir,
      ...props
    },
    ref
  ) => {
    const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId)
    const [expendedItems, setExpendedItems] = useState<string[] | undefined>(initialExpendedItems)

    const selectItem = useCallback((id: string) => {
      setSelectedId(id)
    }, [])

    const handleExpand = useCallback((id: string) => {
      setExpendedItems(prev => {
        if (prev?.includes(id)) {
          return prev.filter(item => item !== id)
        }
        return [...(prev ?? []), id]
      })
    }, [])

    const expandSpecificTargetedElements = useCallback((elements?: TreeViewElement[], selectId?: string) => {
      if (!elements || !selectId) return
      const findParent = (currentElement: TreeViewElement, currentPath: string[] = []) => {
        const isSelectable = currentElement.isSelectable ?? true
        const newPath = [...currentPath, currentElement.id]
        if (currentElement.id === selectId) {
          if (isSelectable) {
            setExpendedItems(prev => [...(prev ?? []), ...newPath])
          } else {
            if (newPath.includes(currentElement.id)) {
              newPath.pop()
              setExpendedItems(prev => [...(prev ?? []), ...newPath])
            }
          }
          return
        }
        if (isSelectable && currentElement.children && currentElement.children.length > 0) {
          currentElement.children.forEach(child => {
            findParent(child, newPath)
          })
        }
      }
      elements.forEach(element => {
        findParent(element)
      })
    }, [])

    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId)
        setSelectedId(initialSelectedId)
      }
    }, [initialSelectedId, elements])

    const direction = dir === 'rtl' ? 'rtl' : 'ltr'

    return (
      <TreeContext.Provider
        value={{
          selectedId,
          expendedItems,
          handleExpand,
          selectItem,
          setExpendedItems,
          indicator,
          openIcon,
          closeIcon,
          direction
        }}>
        <div className={cn('size-full', className)}>
          <ScrollArea ref={ref} className="relative h-full px-2" dir={dir as Direction}>
            <AccordionPrimitive.Root
              {...props}
              type="multiple"
              defaultValue={expendedItems}
              value={expendedItems}
              className="flex flex-col gap-1"
              onValueChange={value => setExpendedItems(prev => [...(prev ?? []), value[0]])}
              dir={dir as Direction}>
              {children}
            </AccordionPrimitive.Root>
          </ScrollArea>
        </div>
      </TreeContext.Provider>
    )
  }
)

Tree.displayName = 'Tree'

const TreeIndicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { direction } = useTree()

    return (
      <div
        dir={direction}
        ref={ref}
        className={cn(
          'absolute left-1.5 h-full w-px rounded-md py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5',
          className
        )}
        {...props}
      />
    )
  }
)

TreeIndicator.displayName = 'TreeIndicator'

type FolderProps = {
  expendedItems?: string[]
  element: string
  isSelectable?: boolean
  isSelect?: boolean
} & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
  ExecutionDetail

const Folder = forwardRef<HTMLDivElement, FolderProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, element, value, isSelectable = true, isSelect, children, status, duration, ...props }) => {
    const { direction, handleExpand, expendedItems, indicator, setExpendedItems, openIcon, closeIcon } = useTree()

    return (
      <AccordionPrimitive.Item {...props} value={value} className="relative size-full overflow-hidden">
        <AccordionPrimitive.Trigger
          className={cn(`flex w-full items-center gap-1 rounded-md pb-1.5 text-sm`, className, {
            'rounded-md': isSelect && isSelectable,
            'cursor-pointer': isSelectable,
            'cursor-not-allowed opacity-50': !isSelectable
          })}
          disabled={!isSelectable}
          onClick={() => handleExpand(value)}>
          <div className="mt-1 pt-1">
            {expendedItems?.includes(value)
              ? (openIcon ?? <CanaryIcon name="chevron-down" className="size-4" height={12} />)
              : (closeIcon ?? <CanaryIcon name="chevron-right" className="size-4" height={12} />)}
          </div>
          <div className="mr-1 mt-1 flex w-full items-baseline justify-between">
            <div className="flex items-baseline">
              <div className="mr-1 flex self-center">{getStatusIcon(status)}</div>
              <span className="ml-1 text-sm font-normal">
                {element}&nbsp;<span className="text-muted-foreground">({React.Children.count(children)})</span>
              </span>
            </div>
            <span className="text-muted-foreground">{duration ?? '--'}</span>
          </div>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="relative h-full overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {element && indicator && <TreeIndicator aria-hidden="true" />}
          <AccordionPrimitive.Root
            dir={direction}
            type="multiple"
            className="flex flex-col gap-1 pl-5 rtl:mr-5"
            defaultValue={expendedItems}
            value={expendedItems}
            onValueChange={value => {
              setExpendedItems?.(prev => [...(prev ?? []), value[0]])
            }}>
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    )
  }
)

Folder.displayName = 'Folder'

const File = forwardRef<
  HTMLButtonElement,
  {
    value: string
    handleSelect?: (id: string) => void
    isSelectable?: boolean
    isSelect?: boolean
    fileIcon?: React.ReactNode
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
    ExecutionDetail
>(
  (
    {
      value,
      className,
      handleSelect,
      isSelectable = true,
      isSelect,
      // fileIcon,
      children,
      status,
      duration,
      ...props
    },
    ref
  ) => {
    const { direction, selectedId, selectItem } = useTree()
    const isSelected = isSelect ?? selectedId === value
    return (
      <AccordionPrimitive.Item value={value} className="relative w-full">
        <AccordionPrimitive.Trigger
          ref={ref}
          {...props}
          dir={direction}
          disabled={!isSelectable}
          aria-label="File"
          className={cn(
            'flex w-full cursor-pointer items-center gap-1 rounded-md px-1 py-1 text-sm duration-200 ease-in-out rtl:pl-1 rtl:pr-0',
            { ['bg-[#18181B] px-2']: isSelected },
            isSelectable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
            className
          )}
          onClick={() => {
            handleSelect?.(value)
            selectItem(value)
          }}>
          <div className="flex w-full items-baseline justify-between">
            <div className="flex items-baseline">
              <div className="mr-1 flex size-4 self-center">{getStatusIcon(status)}</div>
              <span className="ml-1 text-sm font-normal">{children}</span>
            </div>
            <span className="text-muted-foreground">{duration ?? '--'}</span>
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Item>
    )
  }
)

File.displayName = 'File'

const CollapseButton = forwardRef<
  HTMLButtonElement,
  {
    elements: TreeViewElement[]
    expandAll?: boolean
  } & React.HTMLAttributes<HTMLButtonElement>
>(
  (
    {
      // className,
      elements,
      expandAll = false,
      children,
      ...props
    },
    ref
  ) => {
    const { expendedItems, setExpendedItems } = useTree()

    const expendAllTree = useCallback((elements: TreeViewElement[]) => {
      const expandTree = (element: TreeViewElement) => {
        const isSelectable = element.isSelectable ?? true
        if (isSelectable && element.children && element.children.length > 0) {
          setExpendedItems?.(prev => [...(prev ?? []), element.id])
          element.children.forEach(expandTree)
        }
      }

      elements.forEach(expandTree)
    }, [])

    const closeAll = useCallback(() => {
      setExpendedItems?.([])
    }, [])

    useEffect(() => {
      if (expandAll) {
        expendAllTree(elements)
      }
    }, [expandAll])

    /**
     * @todo Replace this with Canary Button once the "@" issue gets resolved
     */
    return (
      <button
        // variant={'ghost'}
        className="absolute bottom-1 right-2 h-8 w-fit p-1"
        onClick={expendedItems && expendedItems.length > 0 ? closeAll : () => expendAllTree(elements)}
        ref={ref}
        {...props}>
        {children}
        <span className="sr-only">Toggle</span>
      </button>
    )
  }
)

CollapseButton.displayName = 'CollapseButton'

export { Status, Tree, Folder, File, CollapseButton, type TreeViewElement }
