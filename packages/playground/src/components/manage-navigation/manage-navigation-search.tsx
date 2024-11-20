import { Button, cn, Popover, PopoverContent, PopoverTrigger, ScrollArea, SearchBox, Text } from '@harnessio/canary'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MenuGroup, NavbarItem } from '../navbar/types'
import { debounce } from '../../utils/debaunce'

const filterItems = (categories: MenuGroup[], query: string): MenuGroup[] => {
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

interface ManageNavigationSearchProps {
  navbarMenuData: MenuGroup[]
  addToPinnedItems: (item: NavbarItem) => void
}

export const ManageNavigationSearch = ({ navbarMenuData, addToPinnedItems }: ManageNavigationSearchProps) => {
  const [filteredItems, setFilteredItems] = useState<MenuGroup[]>(navbarMenuData)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const filtered = filterItems(navbarMenuData, query)
      setFilteredItems(filtered)
    }, 300),
    [navbarMenuData]
  )

  const handleSearchChange = (event: React.ChangeEvent) => {
    event.preventDefault()
    const query = (event.target as HTMLInputElement).value
    setSearchQuery(query)
    debouncedSearch(query)
  }

  const handleItemClick = (item: NavbarItem) => {
    addToPinnedItems(item)
    setSearchQuery('')
    setSearchDialogOpen(false)
  }

  const handleInputFocus = () => {
    setSearchDialogOpen(true)
    if (searchQuery === '') {
      setFilteredItems(navbarMenuData)
    }
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

  const countFilteredItems = filteredItems.reduce((acc, category) => acc + category.items.length, 0)

  return (
    <Popover open={isSearchDialogOpen} onOpenChange={setSearchDialogOpen}>
      <PopoverTrigger asChild>
        <SearchBox.Root
          className="w-full"
          inputClassName="h-9"
          ref={inputRef}
          placeholder="Add menu element"
          value={searchQuery}
          handleChange={handleSearchChange}
          hasSearchIcon={false}
          onFocus={handleInputFocus}
        />
      </PopoverTrigger>
      <PopoverContent
        className="border-borders-1 bg-background-2 w-[368px] overflow-hidden !rounded !p-0"
        ref={popoverRef}
        align="start"
        onWheel={e => e.stopPropagation()}
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}>
        <ScrollArea className={cn('relative max-h-[50vh]', countFilteredItems > 11 ? 'h-[410px]' : '')}>
          <div className="px-1 pb-2 pt-1">
            <span
              className="from-background-2 pointer-events-none absolute inset-x-0 top-0 h-3 w-full bg-gradient-to-b to-transparent"
              aria-hidden
            />
            <span
              className="from-background-2 pointer-events-none absolute inset-x-0 bottom-0 h-3 w-full bg-gradient-to-t to-transparent"
              aria-hidden
            />
            {countFilteredItems === 0 ? (
              <Text className="text-foreground-5 block w-full px-2 py-4">No results found</Text>
            ) : (
              filteredItems.map((category, index) => (
                <div
                  className={cn(index > 0 ? 'border-borders-4 mt-0.5 border-t pt-2' : 'pt-1')}
                  key={category.groupId}>
                  <Text className="text-foreground-7 inline-block px-2 leading-none" size={1}>
                    {category.title}
                  </Text>
                  <div className="mt-2.5 flex flex-col">
                    {category.items.map(item => (
                      <Button
                        className="h-9 cursor-pointer rounded-sm px-2 focus-visible:ring-offset-0"
                        variant="ghost"
                        key={item.id}
                        onClick={() => handleItemClick(item)}>
                        <div className="flex w-full items-center gap-x-2">
                          <Text className="text-foreground-8 truncate leading-tight">{item.title}</Text>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
