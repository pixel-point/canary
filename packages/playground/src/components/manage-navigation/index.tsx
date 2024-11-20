import { useState } from 'react'
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
  ScrollArea
} from '@harnessio/canary'
import useDragAndDrop from '../../hooks/use-drag-and-drop'
import { SortableContext } from '@dnd-kit/sortable'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { ManageNavigationSearch } from './manage-navigation-search'
import { NavbarItem } from '../navbar/types'
import { DraggableItem } from './draggable-item'

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

export interface NavigationCategory {
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

interface ManageNavigationProps {
  pinnedItems: NavbarItem[]
  showManageNavigation: boolean
  recentItems: NavbarItem[]
  handleClearRecent: () => void
  onSave: () => void
  onClose: () => void
  isSubmitting: boolean
  submitted: boolean
}

const filterRecentItems = (pinnedItems: NavbarItem[], recentItems: NavbarItem[]) => {
  return recentItems.filter(item => !pinnedItems.some(pinnedItem => pinnedItem.id === item.id))
}

export const ManageNavigation = ({
  pinnedItems = mockPinnedItems,
  showManageNavigation,
  recentItems = mockRecentItems,
  handleClearRecent,
  onSave,
  onClose,
  isSubmitting,
  submitted
}: ManageNavigationProps) => {
  const [currentPinnedItems, setCurrentPinnedItems] = useState<NavbarItem[]>(pinnedItems)
  const [currentFilteredRecentItems, setCurrentFilteredRecentItems] = useState<NavbarItem[]>(
    filterRecentItems(pinnedItems, recentItems)
  )

  const { handleDragEnd, getItemId } = useDragAndDrop({
    items: currentPinnedItems,
    onReorder: setCurrentPinnedItems
  })

  const handleCancel = () => {
    setCurrentPinnedItems(pinnedItems)
    setCurrentFilteredRecentItems(filterRecentItems(pinnedItems, recentItems))
    onClose()
  }

  const onSubmit = () => {
    onSave()
    onClose()
  }

  const updatePinnedItems = (items: NavbarItem[]) => {
    setCurrentPinnedItems(items)
    setCurrentFilteredRecentItems(filterRecentItems(items, recentItems))
  }

  const addToPinnedItems = (item: NavbarItem) => {
    const isAlreadyPinned = pinnedItems.some(pinnedItem => pinnedItem.id === item.id)

    if (!isAlreadyPinned) {
      updatePinnedItems([...currentPinnedItems, item])
    }
  }

  const removeFromPinnedItems = (item: NavbarItem) => {
    updatePinnedItems(currentPinnedItems.filter(pinnedItem => pinnedItem.id !== item.id))
  }

  return (
    <AlertDialog open={showManageNavigation} onOpenChange={onClose}>
      <AlertDialogContent className="h-[574px] max-h-[70vh] max-w-[410px] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-4">Manage navigation</AlertDialogTitle>
          <ManageNavigationSearch navigationCategories={mockNavigationCategories} addToPinnedItems={addToPinnedItems} />
        </AlertDialogHeader>
        <ScrollArea className="-mx-5 -mb-5 mt-1">
          <div className="px-5">
            <Text className="text-foreground-7 inline-block leading-none" size={1}>
              Pinned
            </Text>
            {!currentPinnedItems.length ? (
              <Text className="text-foreground-5 mt-3 block" size={1}>
                No pinned items
              </Text>
            ) : (
              <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                <SortableContext items={pinnedItems.map((_, index) => getItemId(index))}>
                  <ul className="-mx-3 mt-3.5 flex flex-col gap-y-0.5">
                    {currentPinnedItems.map((item, index) => (
                      <DraggableItem id={getItemId(index)} tag="li" key={item.title}>
                        {({ attributes, listeners }) => (
                          <>
                            <Button
                              className="w-full grow cursor-grab gap-x-2.5 rounded p-1 px-3 active:cursor-grabbing"
                              variant="ghost"
                              {...attributes}
                              {...listeners}>
                              <Icon className="w-3" name="grid-dots" size={16} />
                              <Text className="w-full text-left text-[inherit]">{item.title}</Text>
                            </Button>
                            <Button
                              className="text-icons-4 hover:text-icons-2 absolute right-0.5 top-0.5 z-20"
                              size="sm_icon"
                              variant="custom"
                              onClick={() => removeFromPinnedItems(item)}>
                              <Icon name="x-mark" size={12} />
                            </Button>
                          </>
                        )}
                      </DraggableItem>
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            )}
            {currentFilteredRecentItems.length > 0 && (
              <>
                <div className="mt-4 flex items-center justify-between">
                  <Text className="text-foreground-7 inline-block leading-none" size={1}>
                    Recent
                  </Text>
                  <Button className="-mr-1.5" variant="link_accent" size="xs" onClick={handleClearRecent}>
                    Clear all
                  </Button>
                </div>
                <ul className="mt-3 flex flex-col gap-y-0.5 pb-5">
                  {currentFilteredRecentItems.map((item, index) => (
                    <li className="relative flex h-8 items-center" key={`recent-${item.id}-${index}`}>
                      <div className="flex w-full grow items-center gap-x-2.5">
                        <Icon className="text-icons-4 w-3" name="clock-icon" size={12} />
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
                <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
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
