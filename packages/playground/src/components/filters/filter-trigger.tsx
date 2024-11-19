import { FilterOption, FilterValue, SortOption, SortValue, FilterSearchQueries } from './types'

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
  searchQueries: FilterSearchQueries
  onReset: () => void
}

interface FilterTriggerFilterProps extends BaseFilterTriggerProps {
  type: 'filter'
  activeFilters: FilterValue[]
  options: FilterOption[]
  onChange: (filter: Omit<FilterValue, 'condition' | 'selectedValues'>, defaultCondition?: string) => void
  onSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
}

interface FilterTriggerSortProps extends BaseFilterTriggerProps {
  type: 'sort'
  activeFilters: SortValue[]
  options: SortOption[]
  onChange: (sort: SortValue) => void
  onSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
}

type FilterTriggerProps = FilterTriggerFilterProps | FilterTriggerSortProps

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

const FilterTrigger = ({
  type,
  activeFilters,
  onChange,
  onReset,
  searchQueries,
  onSearchChange,
  options
}: FilterTriggerProps) => {
  const { label, inputPlaceholder, buttonLabel } = LABELS[type]

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
        <span className="flex items-center gap-x-1 text-14 text-foreground-2 hover:text-foreground-1">
          {label}
          {activeFilters.length > 0 && (
            <span className="flex h-[18px] min-w-[17px] items-center justify-center rounded border border-borders-5 bg-background-2 px-1 text-11 text-foreground-2">
              {activeFilters.length}
            </span>
          )}
        </span>
        <Icon className="chevron-down text-icons-4" name="chevron-fill-down" size={6} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[224px] p-0" align="end">
        <div className="relative flex items-center justify-between border-b border-borders-4 px-3 py-2.5">
          <Input
            type="text"
            placeholder={inputPlaceholder}
            value={searchQueries.menu[type] || ''}
            onChange={e => onSearchChange(type, e.target.value, 'menu')}
            onKeyDown={e => e.stopPropagation()}
            onClick={e => e.preventDefault()}
          />

          {searchQueries.menu[type] && (
            <DropdownMenuItem className="absolute right-3 hover:bg-transparent focus:bg-transparent" asChild>
              <button
                className="flex text-foreground-4 transition-colors duration-200 hover:text-foreground-1"
                onClick={e => {
                  e.preventDefault()
                  onSearchChange(type, '', 'menu')
                }}>
                <Icon className="rotate-45" name="plus" size={12} />
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
              <span className="text-14 leading-none text-foreground-2">No results</span>
            </div>
          )}
        </div>

        <div className="border-t border-borders-4 p-1">
          <DropdownMenuItem asChild>
            <button className="w-full font-medium" onClick={onReset}>
              {buttonLabel}
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterTrigger
