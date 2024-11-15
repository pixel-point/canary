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
  cn
} from '@harnessio/canary'
import { NavbarItem } from '../layouts/RootLayout'

const mockRecentItems: NavbarItem[] = [
  {
    id: 1,
    title: 'Repositories',
    iconName: 'grid-dots',
    description: 'Repositories'
  },
  {
    id: 2,
    title: 'Pipelines',
    iconName: 'grid-dots',
    description: 'Pipelines'
  },
  {
    id: 3,
    title: 'Executions',
    iconName: 'grid-dots',
    description: 'Executions'
  },
  {
    id: 4,
    title: 'Featured Flags',
    iconName: 'grid-dots',
    description: 'Featured Flags'
  }
]

interface NavigationCategory {
  id: number
  title: string
  items: NavbarItem[]
}

const mockNavigationCategories: NavigationCategory[] = [
  {
    id: 1,
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
    id: 1,
    title: 'DevOps Modernization',
    items: mockRecentItems
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
  searchQuery: string
  setSearchDialogOpen: (open: boolean) => void
  addToPinnedItems: (item: NavbarItem) => void
}

const SearchDropdownMenuExtendedContent: React.FC<SearchDropdownMenuExtendedContentProps> = ({
  navigationCategories,
  searchQuery,
  setSearchDialogOpen,
  addToPinnedItems
}) => {
  const [filteredItems, setFilteredItems] = useState<NavigationCategory[]>([])

  useEffect(() => {
    const filtered = filterItems(navigationCategories, searchQuery)
    setFilteredItems(filtered)
  }, [navigationCategories, searchQuery])

  const handleItemClick = (item: NavbarItem) => {
    addToPinnedItems(item)
    setSearchDialogOpen(false)
  }

  return (
    <PopoverContent
      className="w-[368px] !p-0 border-borders-1 overflow-hidden !rounded bg-background-2"
      align="start"
      onOpenAutoFocus={event => event.preventDefault()}
      onCloseAutoFocus={event => event.preventDefault()}>
      <div className="max-h-[55vh] h-[410px] p-1 relative overflow-y-scroll">
        <span
          className="absolute top-0 inset-x-0 w-full h-3 bg-gradient-to-b from-background-2 to-transparent pointer-events-none"
          aria-hidden
        />
        <span
          className="absolute bottom-0 inset-x-0 w-full h-3 bg-gradient-to-t from-background-2 to-transparent pointer-events-none"
          aria-hidden
        />
        {filteredItems.length > 0 ? (
          filteredItems.map((category, index) => (
            <div className={cn(index > 0 ? 'mt-0.5 border-t border-borders-4 pt-2' : 'pt-1')} key={category.id}>
              <Text className="px-2 leading-none inline-block text-foreground-7" size={1}>
                {category.title}
              </Text>
              <div className="flex mt-2.5 flex-col">
                {category.items.map(item => (
                  <Button
                    className="cursor-pointer h-9 hover:bg-background-4 py-2.5 px-2 rounded-sm"
                    variant="ghost"
                    key={item.id}
                    onClick={() => handleItemClick(item)}>
                    <div className="flex items-center w-full gap-x-2">
                      <Text className="text-foreground-2 leading-none truncate">{item.title}</Text>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Text className="px-2 py-4 block w-full text-foreground-5">No results found</Text>
        )}
      </div>
    </PopoverContent>
  )
}

interface ManageNavigationDialogProps {
  pinnedItems: NavbarItem[]
  updatePinnedItems: (items: NavbarItem[]) => void
  recentItems: NavbarItem[]
  handleClearRecent: () => void
  onSave: () => void
  onClose: () => void
  isSubmitting: boolean
  submitted: boolean
}

export const ManageNavigationDialog: React.FC<ManageNavigationDialogProps> = ({
  pinnedItems,
  updatePinnedItems,
  recentItems = mockRecentItems,
  handleClearRecent,
  onSave,
  onClose,
  isSubmitting,
  submitted
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  // Form edit submit handler
  const onSubmit = () => {
    onSave()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    setSearchDialogOpen(query.trim().length > 0)
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
      <AlertDialogContent className="max-h-[70vh] h-[574px] max-w-[410px] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Manage navigation</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="relative">
          <Popover open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
            <PopoverTrigger asChild>
              {/* TODO: can we set ref to the input? */}
              <div ref={triggerRef}>
                <SearchBox.Root
                  className="w-full mt-2"
                  placeholder="Add menu element"
                  value={searchQuery}
                  handleChange={handleSearchChange}
                  showOnFocus
                  hasSearchIcon={false}
                />
              </div>
            </PopoverTrigger>
            <SearchDropdownMenuExtendedContent
              navigationCategories={mockNavigationCategories}
              searchQuery={searchQuery}
              setSearchDialogOpen={setSearchDialogOpen}
              addToPinnedItems={addToPinnedItems}
            />
          </Popover>
        </div>
        <div className="mt-6">
          <Text className="text-foreground-7 leading-none inline-block" size={1}>
            Pinned
          </Text>
          {pinnedItems.length > 0 ? (
            <ul className="mt-3.5 flex flex-col gap-y-0.5 -mx-3">
              {pinnedItems.map(item => (
                <li className="relative" key={item.title}>
                  <Button className="w-full grow px-3 gap-x-2.5" variant="ghost">
                    <Icon name="grid-dots" size={16} />
                    <Text className="text-foreground-8 w-full text-left">{item.title}</Text>
                  </Button>
                  <Button
                    className="text-icons-4 hover:text-icons-2 absolute top-0.5 right-0.5"
                    size="sm_icon"
                    variant="custom"
                    onClick={() => removeFromPinnedItems(item)}>
                    <Icon name="x-mark" size={12} />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <Text className="text-foreground-5 block mt-3" size={1}>
              No pinned items
            </Text>
          )}
          {recentItems.length > 0 && (
            <>
              <div className="flex justify-between items-center mt-4">
                <Text className="text-foreground-7 leading-none inline-block" size={1}>
                  Recent
                </Text>
                <Button className="-mr-1.5" variant="link_accent" size="xs" onClick={handleClearRecent}>
                  Clear all
                </Button>
              </div>
              <ul className="mt-3.5 flex flex-col gap-y-0.5">
                {recentItems.map((item, index) => (
                  <li className="relative h-8 flex items-center" key={`recent-${item.title}-${index}`}>
                    <div className="w-full grow flex items-center gap-x-2">
                      <Icon className="text-icons-4" name="pending-clock-inverse" size={12} />
                      <Text className="text-foreground-8 w-full text-left">{item.title}</Text>
                    </div>
                    <Button
                      className="text-icons-4 hover:text-icons-2 absolute top-0.5 -right-2"
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
