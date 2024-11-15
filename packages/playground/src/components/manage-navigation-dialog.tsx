import React, { useState, useEffect, useRef } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  Button,
  Icon,
  Text,
  ButtonGroup,
  SearchBox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  cn,
  ScrollArea
} from '@harnessio/canary'
import type { NavbarItem } from '../layouts/RootLayout'

const mockPinnedItems: NavbarItem[] = ['Repositories', 'Pipelines', 'Executions', 'Connectors'].map((title, index) => ({
  id: 10 + index,
  title,
  iconName: 'grid-dots',
  description: title
}))

const mockRecentItems: NavbarItem[] = ['Chaos Engineering', 'Environment', 'Secrets', 'Featured Flags'].map(
  (title, index) => ({
    id: 20 + index,
    title,
    iconName: 'grid-dots',
    description: title
  })
)

interface NavigationCategory {
  id: number
  title: string
  items: NavbarItem[]
}

const mockNavigationCategories: NavigationCategory[] = [
  {
    id: 200,
    title: 'System Administration',
    items: [
      'Certificates',
      'Connectors',
      'Default Settings',
      'Delegates',
      'Discovery',
      'Environments',
      'External Tickets'
    ].map((title, index) => ({
      id: index + 100,
      title,
      iconName: 'grid-dots',
      description: title
    }))
  },
  {
    id: 201,
    title: 'DevOps Modernization',
    items: mockRecentItems
  },
  {
    id: 202,
    title: 'Security',
    items: mockPinnedItems
  }
]

const filterItems = (categories: NavigationCategory[], query: string): NavigationCategory[] => {
  if (!query.trim()) return categories

  return categories
    .map(category => {
      const filteredItems = category.items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
      return {
        ...category,
        items: filteredItems
      }
    })
    .filter(category => category.items.length > 0)
}

interface SearchDropdownMenuExtendedContentProps {
  navigationCategories: NavigationCategory[]
  addToPinnedItems: (item: NavbarItem) => void
}

const SearchDropdownMenuExtendedContent = ({
  navigationCategories,
  addToPinnedItems
}: SearchDropdownMenuExtendedContentProps) => {
  const [filteredItems, setFilteredItems] = useState<NavigationCategory[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = filterItems(navigationCategories, searchQuery)
    setFilteredItems(filtered)
  }, [navigationCategories, searchQuery])

  const handleSearchChange = (event: React.ChangeEvent) => {
    event.preventDefault()
    const query = (event.target as HTMLInputElement).value
    setSearchQuery(query)
    setSearchDialogOpen(query.trim().length > 0)
  }

  const handleItemClick = (item: NavbarItem) => {
    addToPinnedItems(item)
    setSearchDialogOpen(false)
  }

  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'tab') {
        const isShift = e.shiftKey
        const activeElement = document.activeElement

        if (popoverRef.current) {
          const focusableElements = popoverRef.current.querySelectorAll<HTMLElement>('button:not([disabled])')
          const firstFocusableElement = focusableElements[0]

          if (!isShift && activeElement === inputRef.current) {
            e.preventDefault()
            firstFocusableElement && firstFocusableElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleTabKey)

    return () => {
      window.removeEventListener('keydown', handleTabKey)
    }
  }, [])

  const isEmptySearch = filteredItems.length === 0

  return (
    <Popover open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
      <PopoverTrigger asChild>
        <SearchBox.Root
          className="w-full"
          ref={inputRef}
          placeholder="Add menu element"
          value={searchQuery}
          handleChange={handleSearchChange}
          showOnFocus
          hasSearchIcon={false}
        />
      </PopoverTrigger>
      <PopoverContent
        className="border-borders-1 bg-background-2 w-[368px] overflow-hidden !rounded !p-0"
        ref={popoverRef}
        align="start"
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}>
        <ScrollArea className={cn('relative p-1', isEmptySearch ? 'h-fit' : 'h-[410px] max-h-[50vh]')}>
          <span
            className="from-background-2 pointer-events-none absolute inset-x-0 top-0 h-3 w-full bg-gradient-to-b to-transparent"
            aria-hidden
          />
          <span
            className="from-background-2 pointer-events-none absolute inset-x-0 bottom-0 h-3 w-full bg-gradient-to-t to-transparent"
            aria-hidden
          />
          {isEmptySearch ? (
            <Text className="text-foreground-5 block w-full px-2 py-4">No results found</Text>
          ) : (
            filteredItems.map((category, index) => (
              <div className={cn(index > 0 ? 'border-borders-4 mt-0.5 border-t pt-2' : 'pt-1')} key={category.id}>
                <Text className="text-foreground-7 inline-block px-2 leading-none" size={1}>
                  {category.title}
                </Text>
                <div className="mt-2.5 flex flex-col">
                  {category.items.map(item => (
                    <Button
                      className="hover:bg-background-4 h-9 cursor-pointer rounded-sm px-2"
                      variant="ghost"
                      key={item.id}
                      onClick={() => handleItemClick(item)}>
                      <div className="flex w-full items-center gap-x-2">
                        <Text className="text-foreground-2 truncate leading-tight">{item.title}</Text>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

interface ManageNavigationDialogProps {
  // pinnedItems: NavbarItem[]
  // updatePinnedItems: (items: NavbarItem[]) => void
  recentItems: NavbarItem[]
  handleClearRecent: () => void
  onSave: () => void
  onClose: () => void
  isSubmitting: boolean
  submitted: boolean
}

export const ManageNavigationDialog = ({
  // pinnedItems,
  // updatePinnedItems,
  recentItems = mockRecentItems,
  handleClearRecent,
  onSave,
  onClose,
  isSubmitting,
  submitted
}: ManageNavigationDialogProps) => {
  const [pinnedItems, setPinnedItems] = useState<NavbarItem[]>(mockPinnedItems)

  // Form edit submit handler
  const onSubmit = () => {
    onSave()
  }

  const updatePinnedItems = (items: NavbarItem[]) => {
    setPinnedItems(items)
  }

  const addToPinnedItems = (item: NavbarItem) => {
    const isAlreadyPinned = pinnedItems.some(pinnedItem => pinnedItem.id === item.id)

    if (!isAlreadyPinned) {
      updatePinnedItems([...pinnedItems, item])
    }
  }

  const removeFromPinnedItems = (item: NavbarItem) => {
    updatePinnedItems(pinnedItems.filter(pinnedItem => pinnedItem.title !== item.title))
  }

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent className="h-[574px] max-h-[70vh] max-w-[410px] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-4">Manage navigation</AlertDialogTitle>
          <SearchDropdownMenuExtendedContent
            navigationCategories={mockNavigationCategories}
            addToPinnedItems={addToPinnedItems}
          />
        </AlertDialogHeader>
        <ScrollArea className="-mx-5 -mb-5 mt-2" type="always">
          <div className="px-5">
            <Text className="text-foreground-7 inline-block leading-none" size={1}>
              Pinned
            </Text>
            {pinnedItems.length > 0 ? (
              <ul className="-mx-3 mt-3.5 flex flex-col gap-y-0.5">
                {pinnedItems.map(item => (
                  <li className="relative" key={item.title}>
                    <Button className="w-full grow gap-x-2.5 px-3" variant="ghost">
                      <Icon name="grid-dots" size={16} />
                      <Text className="text-foreground-8 w-full text-left">{item.title}</Text>
                    </Button>
                    <Button
                      className="text-icons-4 hover:text-icons-2 absolute right-0.5 top-0.5"
                      size="sm_icon"
                      variant="custom"
                      onClick={() => removeFromPinnedItems(item)}>
                      <Icon name="x-mark" size={12} />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <Text className="text-foreground-5 mt-3 block" size={1}>
                No pinned items
              </Text>
            )}
            {recentItems.length > 0 && (
              <>
                <div className="mt-4 flex items-center justify-between">
                  <Text className="text-foreground-7 inline-block leading-none" size={1}>
                    Recent
                  </Text>
                  <Button className="-mr-1.5" variant="link_accent" size="xs" onClick={handleClearRecent}>
                    Clear all
                  </Button>
                </div>
                <ul className="mt-3.5 flex flex-col gap-y-0.5 pb-5">
                  {recentItems.map((item, index) => (
                    <li className="relative flex h-8 items-center" key={`recent-${item.title}-${index}`}>
                      <div className="flex w-full grow items-center gap-x-2">
                        <Icon className="text-icons-4" name="pending-clock-inverse" size={12} />
                        <Text className="text-foreground-8 w-full text-left">{item.title}</Text>
                      </div>
                      <Button
                        className="text-icons-4 hover:text-icons-2 absolute -right-2 top-0.5"
                        size="sm_icon"
                        variant="custom"
                        onClick={() => addToPinnedItems(item)}>
                        <Icon name="pin" size={10} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <ButtonGroup.Root>
            {!submitted ? (
              <>
                <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="button" theme="primary" onClick={onSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                type="button"
                size="sm"
                theme="success"
                className="pointer-events-none flex gap-2"
                disabled={submitted}>
                Saved
                <Icon name="tick" size={14} />
              </Button>
            )}
          </ButtonGroup.Root>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
