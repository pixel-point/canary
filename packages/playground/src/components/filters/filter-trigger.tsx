import React from 'react'
import { FilterOption, FilterValue, SortOption, SortValue } from './types'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Input
} from '@harnessio/canary'
import { FilterSearchQueries } from './types'

interface BaseProps {
  searchQueries: FilterSearchQueries
  onSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
  options: FilterOption[] | SortOption[]
}

interface FilterTriggerProps<T extends FilterValue | SortValue> extends BaseProps {
  type: 'filter' | 'sort'
  activeFilters: T[]
  onChange: (value: T) => void
  onReset: () => void
  options: FilterOption[] | SortOption[]
}

const LABELS = {
  filter: {
    label: 'Filter',
    inputPlaceholder: 'Filter by...',
    buttonLabel: 'Reset filters'
  },
  sort: {
    label: 'Sort',
    inputPlaceholder: 'Sort by...',
    buttonLabel: 'Reset sort'
  }
}

const FilterTrigger = <T extends FilterValue | SortValue>({
  type,
  activeFilters,
  onChange,
  onReset,
  searchQueries,
  onSearchChange,
  options
}: FilterTriggerProps<T>) => {
  const { label, inputPlaceholder, buttonLabel } = LABELS[type]

  const onChangeOption = (option: FilterOption | SortOption) => {
    const value =
      type === 'filter'
        ? ({ type: option.value, selectedValues: [], condition: 'is' } as FilterValue)
        : ({ type: option.value, direction: 'desc' } as SortValue)

    onChange(value as T)
  }

  const filteredBySearchOptions = options.filter(
    option => !searchQueries.menu[type] || option.label.toLowerCase().includes(searchQueries.menu[type].toLowerCase())
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-x-1.5">
        <span className="text-foreground-2 hover:text-foreground-1 text-14 flex items-center gap-x-1">
          {label}
          {activeFilters.length > 0 && (
            <span className="text-foreground-2 bg-background-2 border-borders-5 flex h-[18px] items-center rounded border px-1">
              {activeFilters.length}
            </span>
          )}
        </span>
        <Icon name="chevron-down" size={6} className="chevron-down" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[224px] p-0" align="end">
        <div className="border-borders-2 relative flex items-center justify-between border-b px-3 py-2.5">
          <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent" asChild>
            <Input
              type="text"
              placeholder={inputPlaceholder}
              value={searchQueries.menu[type] || ''}
              onChange={e => onSearchChange(type, e.target.value, 'menu')}
              onKeyDown={e => e.stopPropagation()}
              onClick={e => e.preventDefault()}
            />
          </DropdownMenuItem>

          {searchQueries.menu[type] && (
            <DropdownMenuItem className="absolute right-3 hover:bg-transparent focus:bg-transparent" asChild>
              <button
                className="text-foreground-4 hover:text-foreground-1 flex transition-colors duration-200"
                onClick={e => {
                  e.preventDefault()
                  onSearchChange(type, '', 'menu')
                }}>
                <Icon className="rotate-45 transform" name="plus" size={12} />
              </button>
            </DropdownMenuItem>
          )}
        </div>

        <div className="p-1">
          {filteredBySearchOptions.map(option => (
            <DropdownMenuItem key={option.value} onSelect={() => onChangeOption(option)}>
              {option.label}
            </DropdownMenuItem>
          ))}

          {filteredBySearchOptions.length === 0 && (
            <div className="flex items-center justify-center p-4">
              <span className="text-foreground-2 text-1 leading-none">No results</span>
            </div>
          )}
        </div>

        <div className="border-borders-2 border-t p-1">
          <DropdownMenuItem asChild>
            <button className="w-full" onClick={onReset}>
              {buttonLabel}
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterTrigger
