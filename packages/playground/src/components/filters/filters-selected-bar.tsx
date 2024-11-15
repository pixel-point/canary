import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  Input,
  Icon,
  cn,
  DropdownMenuTrigger
} from '@harnessio/canary'

import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type {
  FilterValue,
  FilterOption,
  SortDirection,
  FilterSearchQueries,
  CheckboxFilterOption,
  SortOption,
  SortValue
} from './types'

import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { DndContext, closestCenter } from '@dnd-kit/core'
import DateFilter from './filter-types/filter-data'
import CheckboxFilter from './filter-types/filter-checkbox'
import { format } from 'date-fns'

// TODO: requires optimization and refactoring
const renderFilterValues = (
  filter: FilterValue,
  filterOption: FilterOption,
  onUpdateFilter: ((type: string, selectedValues: string[]) => void) | undefined,
  filteredOptions?: CheckboxFilterOption['options']
) => {
  if (!onUpdateFilter) return null

  switch (filterOption.type) {
    case 'checkbox':
      return (
        <CheckboxFilter
          filter={filter}
          filterOption={{
            ...filterOption,
            options: filteredOptions || (filterOption as CheckboxFilterOption).options
          }}
          onUpdateFilter={onUpdateFilter}
        />
      )
    case 'date':
      return <DateFilter filter={filter} onUpdateFilter={onUpdateFilter} />
    default:
      return null
  }
}
interface FiltersSelectedBarProps {
  filterOptions: FilterOption[]
  sortOptions: SortOption[]
  sortDirections: SortDirection[]
  activeFilters: FilterValue[]
  activeSorts: SortValue[]
  onRemoveFilter?: (type: string) => void
  onUpdateFilter?: (type: string, selectedValues: string[]) => void
  onUpdateCondition?: (type: string, condition: string) => void
  onUpdateSort?: (index: number, sort: SortValue) => void
  onRemoveSort?: (index: number) => void
  onSortChange?: (sort: SortValue) => void
  onResetSorts?: () => void
  onReorderSorts?: (sorts: SortValue[]) => void
  onResetAll?: () => void
  searchQueries: FilterSearchQueries
  onSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
}

const FiltersSelectedBar = ({
  filterOptions,
  sortOptions,
  sortDirections,
  activeFilters,
  activeSorts,
  onUpdateFilter,
  onUpdateCondition,
  onUpdateSort,
  onRemoveSort,
  onSortChange,
  onResetSorts,
  onReorderSorts,
  onResetAll,
  searchQueries,
  onSearchChange
}: FiltersSelectedBarProps) => {
  const { handleDragEnd, getItemId } = useDragAndDrop({
    items: activeSorts,
    onReorder: onReorderSorts
  })

  if (activeFilters.length === 0 && activeSorts.length === 0) return null

  const getSortTriggerLabel = () => {
    if (activeSorts.length === 0) return { label: '', icon: 'circle-arrows-updown' as const }

    if (activeSorts.length === 1) {
      const currentSort = activeSorts[0]
      const label = sortOptions.find(opt => opt.value === currentSort.type)?.label

      return {
        label,
        icon: 'circle-arrow-top' as const,
        isDescending: currentSort.direction === 'desc'
      }
    }

    return {
      label: `${activeSorts.length} sorts`,
      icon: 'circle-arrows-updown' as const,
      isDescending: false
    }
  }

  const filteredBySearchSortOptions = sortOptions.filter(
    option =>
      !searchQueries.menu['sort'] || option.label.toLowerCase().includes(searchQueries.menu['sort'].toLowerCase())
  )

  const getFilteredOptions = (filterOption: FilterOption, filter: FilterValue) => {
    if (filterOption.type === 'checkbox') {
      return filterOption.options.filter(
        option =>
          !searchQueries.filters[filter.type] ||
          option.label.toLowerCase().includes(searchQueries.filters[filter.type].toLowerCase())
      )
    }
    return []
  }

  const getFilterDisplayValue = (filterOption: FilterOption, filter: FilterValue): string => {
    switch (filterOption.type) {
      case 'checkbox':
        return filter.selectedValues
          .map(value => (filterOption as CheckboxFilterOption).options.find(opt => opt.value === value)?.label)
          .join(', ')
      case 'date':
        if (filter.selectedValues.length === 0) return ''
        if (filter.selectedValues.length === 1) {
          return format(new Date(filter.selectedValues[0]), 'PPP')
        }
        return `${format(new Date(filter.selectedValues[0]), 'PPP')} - ${format(new Date(filter.selectedValues[1]), 'PPP')}`
      default:
        return ''
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      {!!activeSorts.length && (
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-background-3 hover:bg-background-8 flex h-8 items-center gap-x-3 rounded px-2.5 transition-colors duration-200">
            <div className="flex items-center gap-x-1">
              <Icon
                className={cn('text-icons-1', getSortTriggerLabel().isDescending && 'rotate-180')}
                name={getSortTriggerLabel().icon}
                size={10}
              />
              <span className="text-13 text-foreground-1">{getSortTriggerLabel().label}</span>
            </div>
            <Icon name="chevron-down" size={10} className="chevron-down" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-[310px] px-3 py-2.5" align="start">
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
              <SortableContext
                items={activeSorts.map((_, index) => getItemId(index))}
                strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-y-2.5">
                  {activeSorts.map((sort, index) => (
                    <SortableItem
                      key={getItemId(index)}
                      id={getItemId(index)}
                      sort={sort}
                      index={index}
                      onUpdateSort={onUpdateSort}
                      onRemoveSort={onRemoveSort}
                      sortOptions={sortOptions}
                      sortDirections={sortDirections}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="mt-3 flex flex-col gap-y-2.5">
              {sortOptions.some(option => !activeSorts.some(sort => sort.type === option.value)) && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-14 text-foreground-4 hover:text-foreground-1 flex w-full items-center gap-x-1.5 transition-colors duration-200">
                    <Icon name="plus" size={12} />
                    Add sort
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[224px] p-0" align="start">
                    <div className="border-borders-4 relative flex items-center justify-between border-b px-3 py-2.5">
                      <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent" asChild>
                        <Input
                          type="text"
                          placeholder="Sort by..."
                          value={searchQueries.menu['sort'] || ''}
                          onChange={e => onSearchChange('sort', e.target.value, 'menu')}
                          onKeyDown={e => e.stopPropagation()}
                          onClick={e => e.preventDefault()}
                        />
                      </DropdownMenuItem>

                      {searchQueries.menu['sort'] && (
                        <DropdownMenuItem
                          className="absolute right-3 hover:bg-transparent focus:bg-transparent"
                          asChild>
                          <button
                            className="text-foreground-4 hover:text-foreground-1 flex transition-colors duration-200"
                            onClick={e => {
                              e.preventDefault()
                              onSearchChange('sort', '', 'menu')
                            }}>
                            <Icon className="rotate-45" name="plus" size={12} />
                          </button>
                        </DropdownMenuItem>
                      )}
                    </div>
                    <div className="p-1">
                      {filteredBySearchSortOptions
                        .filter(
                          option =>
                            !activeSorts.some(sort => sort.type === option.value) &&
                            option.label.toLowerCase().includes(searchQueries.menu['sort']?.toLowerCase() || '')
                        )
                        .map(option => (
                          <DropdownMenuItem
                            onSelect={() => onSortChange?.({ type: option.value, direction: 'desc' })}
                            key={option.value}>
                            {option.label}
                          </DropdownMenuItem>
                        ))}

                      {filteredBySearchSortOptions.length === 0 && (
                        <div className="flex items-center justify-center p-4">
                          <span className="text-foreground-2 text-1 leading-none">No results</span>
                        </div>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <DropdownMenuItem
                className="focus:text-foreground-danger p-0 focus:bg-transparent focus:outline-none"
                asChild>
                <button
                  className="text-14 text-foreground-4 hover:text-foreground-danger flex items-center gap-x-1.5 transition-colors duration-200"
                  onClick={onResetSorts}>
                  <Icon name="trash" size={12} />
                  Delete sort
                </button>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {activeFilters.length > 0 && activeSorts.length > 0 && <div className="bg-borders-1 h-7 w-px" />}

      {activeFilters.map(filter => {
        const filterOption = filterOptions.find(opt => opt.value === filter.type)
        if (!filterOption) return null

        return (
          <DropdownMenu key={filter.type}>
            <DropdownMenuTrigger className="bg-background-3 hover:bg-background-8 flex h-8 items-center gap-x-3 rounded pl-2.5 pr-2 transition-colors duration-200">
              <div className="text-13">
                <span className="text-foreground-1">
                  {filterOption.label}
                  {!!filter.selectedValues.length && ': '}
                </span>
                <span className="text-foreground-4">{getFilterDisplayValue(filterOption, filter)}</span>
              </div>
              <Icon className="chevron-down text-icons-1" name="chevron-down" size={10} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[276px] p-0" align="start">
              <div className="flex items-center justify-between px-3 pt-2.5">
                <div className="flex items-center gap-x-2">
                  <span className="text-foreground-4 text-14">{filterOption.label}</span>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-background-3 text-foreground-2 text-14 flex h-[18px] items-center gap-x-1 rounded pl-1.5 pr-1">
                      {filterOption.conditions?.find(c => c.value === filter.condition)?.label}
                      <Icon className="chevron-down text-icons-1" name="chevron-down" size={10} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {filterOption.conditions?.map(condition => (
                        <DropdownMenuItem
                          onSelect={() => onUpdateCondition?.(filter.type, condition.value)}
                          key={condition.value}>
                          {condition.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {filter.condition !== 'is_empty' && filterOption.type === 'checkbox' && (
                <div className="border-borders-1 border-b px-3 py-2.5">
                  <div
                    className={cn(
                      'border-border-2 focus-within:border-borders-3 flex min-h-8 justify-between gap-x-1 rounded border px-2.5 py-[3px] outline-none transition-colors duration-200 focus-within:border',
                      {
                        'px-1': !!filter.selectedValues.length
                      }
                    )}>
                    <div className="flex flex-1 flex-wrap items-center gap-1">
                      {!!filter.selectedValues.length &&
                        filter.selectedValues.map(value => {
                          const label = filterOption.options?.find(opt => opt.value === value)?.label
                          return (
                            <div className="bg-background-8 flex h-6 items-center gap-x-1.5 rounded px-2" key={value}>
                              <span className="text-14 text-foreground-8">{label}</span>
                              <button
                                className="text-icons-1 hover:text-foreground-1 transition-colors duration-200"
                                onClick={() => {
                                  const newValues = filter.selectedValues.filter(v => v !== value)
                                  onUpdateFilter?.(filter.type, newValues)
                                }}>
                                <Icon className="rotate-45" name="plus" size={10} />
                              </button>
                            </div>
                          )
                        })}

                      <DropdownMenuItem className="p-0 focus:bg-transparent" asChild>
                        <Input
                          className="h-6 flex-1 border-none outline-none hover:border-none focus:border-none focus-visible:ring-0"
                          type="text"
                          placeholder={filter.selectedValues.length > 0 ? '' : 'Select one or more options...'}
                          value={searchQueries.filters[filter.type] || ''}
                          onChange={e => onSearchChange(filter.type, e.target.value, 'filters')}
                          onClick={e => {
                            e.preventDefault()
                          }}
                          onKeyDown={e => e.stopPropagation()}
                        />
                      </DropdownMenuItem>
                    </div>
                    {(!!filter.selectedValues.length || searchQueries.filters[filter.type]) && (
                      <button
                        className="text-foreground-4 hover:text-foreground-1 flex p-1.5 transition-colors duration-200"
                        onClick={() => {
                          onUpdateFilter?.(filter.type, [])
                          onSearchChange(filter.type, '', 'filters')
                        }}>
                        <Icon className="rotate-45" name="plus" size={12} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="px-2 py-1">
                {filter.condition !== 'is_empty' &&
                  onUpdateFilter &&
                  renderFilterValues(
                    filter,
                    filterOption,
                    onUpdateFilter,
                    filterOption.type === 'checkbox' ? getFilteredOptions(filterOption, filter) : undefined
                  )}

                {filterOption.type === 'checkbox' && getFilteredOptions(filterOption, filter).length === 0 && (
                  <div className="flex items-center justify-center p-4">
                    <span className="text-foreground-2 text-1 leading-none">No results</span>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      })}

      {(!!activeFilters.length || !!activeSorts.length) && (
        <button
          className="text-14 text-foreground-4 hover:text-foreground-danger ring-offset-background ml-2.5 flex items-center gap-x-1.5 outline-none ring-offset-2 transition-colors duration-200 focus:ring-2"
          onClick={onResetAll}>
          <Icon className="rotate-45" name="plus" size={12} />
          Reset
        </button>
      )}
    </div>
  )
}

interface SortableItemProps {
  id: string
  sort: SortValue
  index: number
  onUpdateSort?: (index: number, sort: SortValue) => void
  onRemoveSort?: (index: number) => void
  sortOptions: SortOption[]
  sortDirections: SortDirection[]
}

const SortableItem = ({
  id,
  sort,
  index,
  onUpdateSort,
  onRemoveSort,
  sortOptions,
  sortDirections
}: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} className={cn('relative', isDragging && 'z-10')}>
      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <div
            className="hover:bg-background-3 cursor-grab rounded p-1 active:cursor-grabbing"
            {...attributes}
            {...listeners}>
            <Icon className="text-icons-1" name="grid-dots" size={12} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="border-borders-1 text-foreground-8 text-14 flex h-6 items-center gap-x-1.5 rounded border pl-2.5 pr-1.5">
              {sortOptions.find(opt => opt.value === sort.type)?.label}
              <Icon className="chevron-down text-icons-1" name="chevron-down" size={10} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {sortOptions.map(option => (
                <DropdownMenuItem
                  onSelect={() => onUpdateSort?.(index, { ...sort, type: option.value })}
                  key={option.value}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="border-borders-1 text-foreground-8 text-14 flex h-6 items-center gap-x-1.5 rounded border pl-2.5 pr-1.5">
              {sortDirections.find(dir => dir.value === sort.direction)?.label}
              <Icon className="chevron-down text-icons-1" name="chevron-down" size={10} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {sortDirections.map(direction => (
                <DropdownMenuItem
                  onSelect={() => onUpdateSort?.(index, { ...sort, direction: direction.value })}
                  key={direction.value}>
                  {direction.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenuItem className="p-0" asChild>
          <button
            className="text-foreground-4 hover:text-foreground-1 p-1 transition-colors duration-200 focus:bg-transparent"
            onClick={e => {
              e.preventDefault()
              onRemoveSort?.(index)
            }}>
            <Icon className="rotate-45" name="plus" size={12} />
          </button>
        </DropdownMenuItem>
      </div>
    </div>
  )
}

export default FiltersSelectedBar
