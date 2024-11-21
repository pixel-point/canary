import { FilterOption, SortOption } from './types'
import { UseFiltersReturn } from './use-filters'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Input
} from '@harnessio/canary'

interface BaseFilterTriggerProps {
  type: 'filter' | 'sort'
  options: FilterOption[] | SortOption[]
  customLabel?: React.ReactNode | string
  hideCount?: boolean
  dropdownAlign?: 'start' | 'end'
}

interface FilterTriggerFilterProps extends BaseFilterTriggerProps {
  type: 'filter'
  options: FilterOption[]
  activeFilters: UseFiltersReturn['activeFilters']
  onChange: UseFiltersReturn['handleFilterChange']
  onReset?: UseFiltersReturn['handleResetFilters']
  searchQueries: UseFiltersReturn['searchQueries']
  onSearchChange: UseFiltersReturn['handleSearchChange']
}

interface FilterTriggerSortProps extends BaseFilterTriggerProps {
  type: 'sort'
  options: SortOption[]
  activeFilters: UseFiltersReturn['activeSorts']
  onChange: UseFiltersReturn['handleSortChange']
  onReset: UseFiltersReturn['handleResetSorts']
  searchQueries: UseFiltersReturn['searchQueries']
  onSearchChange: UseFiltersReturn['handleSearchChange']
}

type FilterTriggerProps = FilterTriggerFilterProps | FilterTriggerSortProps

const LABELS = {
  filter: {
    defaultLabel: 'Filter',
    inputPlaceholder: 'Filter by...',
    buttonLabel: 'Reset filters'
  },
  sort: {
    defaultLabel: 'Sort',
    inputPlaceholder: 'Sort by...',
    buttonLabel: 'Reset sort'
  }
}

const FilterTrigger = ({
  type,
  activeFilters,
  customLabel,
  hideCount,
  dropdownAlign = 'end',
  onChange,
  onReset,
  searchQueries,
  onSearchChange,
  options
}: FilterTriggerProps) => {
  const { defaultLabel, inputPlaceholder, buttonLabel } = LABELS[type]
  const displayLabel = customLabel || defaultLabel

  const isFilterOption = (option: FilterOption | SortOption): option is FilterOption => {
    return 'type' in option && (option as FilterOption).type !== undefined
  }

  const isSortOption = (option: FilterOption | SortOption): option is SortOption => {
    return !('type' in option)
  }

  const onChangeOption = (option: FilterOption | SortOption) => {
    if (type === 'filter') {
      if (isFilterOption(option)) {
        onChange(
          {
            type: option.value
          },
          option.conditions?.[0].value
        )
      }
    } else {
      if (isSortOption(option)) {
        onChange({
          type: option.value,
          direction: 'desc'
        })
      }
    }
  }

  const filteredBySearchOptions = options.filter(
    option => !searchQueries.menu[type] || option.label.toLowerCase().includes(searchQueries.menu[type].toLowerCase())
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-x-1.5">
        <span className="text-foreground-2 hover:text-foreground-1 text-14 flex items-center gap-x-1">
          {displayLabel}
          {!hideCount && activeFilters.length > 0 && (
            <span className="text-foreground-2 bg-background-2 text-11 border-borders-5 flex h-[18px] min-w-[17px] items-center justify-center rounded border px-1">
              {activeFilters.length}
            </span>
          )}
        </span>
        {!customLabel && <Icon className="chevron-down text-icons-4" name="chevron-fill-down" size={6} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[224px] p-0" align={dropdownAlign}>
        <div className="border-borders-4 relative flex items-center justify-between border-b px-3 py-2.5">
          <Input
            type="text"
            placeholder={inputPlaceholder}
            value={searchQueries.menu[type] || ''}
            onChange={e => onSearchChange(type, e.target.value, 'menu')}
            onKeyDown={e => e.stopPropagation()}
            onClick={e => e.preventDefault()}
          />

          {searchQueries.menu[type] && (
            <div className="absolute right-3">
              <button
                className="text-foreground-4 hover:text-foreground-1 flex p-1.5 transition-colors duration-200"
                onClick={e => {
                  e.preventDefault()
                  onSearchChange(type, '', 'menu')
                }}>
                <Icon className="rotate-45" name="plus" size={12} />
              </button>
            </div>
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
              <span className="text-foreground-2 text-14 leading-none">No results</span>
            </div>
          )}
        </div>

        {onReset && (
          <div className="border-borders-4 border-t p-1">
            <DropdownMenuItem asChild>
              <button className="w-full font-medium" onClick={onReset}>
                {buttonLabel}
              </button>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterTrigger
