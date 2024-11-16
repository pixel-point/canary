import { Icon } from '@harnessio/canary'

import type { FilterValue, FilterOption, SortDirection, FilterSearchQueries, SortOption, SortValue } from '../types'

import Sorts from './sorts'
import Filters from './filters'

interface FiltersBarProps {
  activeFilters: FilterValue[]
  filterOptions: FilterOption[]

  activeSorts: SortValue[]
  sortOptions: SortOption[]
  sortDirections: SortDirection[]

  handleUpdateFilter: (type: string, selectedValues: string[]) => void
  handleUpdateCondition: (type: string, condition: string) => void
  handleUpdateSort: (index: number, sort: SortValue) => void
  handleRemoveSort: (index: number) => void
  handleSortChange: (sort: SortValue) => void
  handleResetSorts: () => void
  handleReorderSorts: (sorts: SortValue[]) => void
  handleResetAll: () => void
  searchQueries: FilterSearchQueries
  handleSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
}

const FiltersBar = ({
  activeFilters,
  filterOptions,
  activeSorts,
  sortOptions,
  sortDirections,
  handleResetSorts,
  handleSortChange,
  handleUpdateFilter,
  handleUpdateCondition,
  handleUpdateSort,
  handleRemoveSort,
  handleReorderSorts,
  handleResetAll,
  searchQueries,
  handleSearchChange
}: FiltersBarProps) => {
  if (activeFilters.length === 0 && activeSorts.length === 0) return null

  return (
    <div className="flex items-center gap-x-2">
      {!!activeSorts.length && (
        <Sorts
          activeSorts={activeSorts}
          handleSortChange={handleSortChange}
          handleUpdateSort={handleUpdateSort}
          handleRemoveSort={handleRemoveSort}
          handleResetSorts={handleResetSorts}
          sortOptions={sortOptions}
          sortDirections={sortDirections}
          searchQueries={searchQueries}
          handleSearchChange={handleSearchChange}
          handleReorderSorts={handleReorderSorts}
        />
      )}

      {activeFilters.length > 0 && activeSorts.length > 0 && <div className="bg-borders-1 h-7 w-px" />}

      {activeFilters.map(filter => {
        return (
          <Filters
            filter={filter}
            filterOptions={filterOptions}
            handleUpdateFilter={handleUpdateFilter}
            handleUpdateCondition={handleUpdateCondition}
            handleSearchChange={handleSearchChange}
            searchQueries={searchQueries}
            key={filter.type}
          />
        )
      })}

      {(!!activeFilters.length || !!activeSorts.length) && (
        <button
          className="text-14 text-foreground-4 hover:text-foreground-danger ring-offset-background ml-2.5 flex items-center gap-x-1.5 outline-none ring-offset-2 transition-colors duration-200 focus:ring-2"
          onClick={handleResetAll}>
          <Icon className="rotate-45" name="plus" size={12} />
          Reset
        </button>
      )}
    </div>
  )
}

export default FiltersBar
