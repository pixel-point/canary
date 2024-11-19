import { Icon } from '@harnessio/canary'

import type {
  FilterValue,
  FilterOption,
  FilterSearchQueries,
  SortOption,
  SortValue,
  FilterAction,
  SortDirection
} from '../types'

import Sorts from './sorts'
import Filters from './filters'

interface FiltersBarProps {
  activeFilters: FilterValue[]
  filterOptions: FilterOption[]

  activeSorts: SortValue[]
  sortOptions: SortOption[]
  sortDirections: SortDirection[]

  handleUpdateFilter: (type: string, selectedValues: string[]) => void
  handleRemoveFilter: (type: string) => void
  handleUpdateCondition: (type: string, condition: string) => void
  handleUpdateSort: (index: number, sort: SortValue) => void
  handleRemoveSort: (index: number) => void
  handleSortChange: (sort: SortValue) => void
  handleResetSorts: () => void
  handleReorderSorts: (sorts: SortValue[]) => void
  handleResetAll: () => void
  searchQueries: FilterSearchQueries
  handleSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
  filterToOpen: FilterAction | null
  clearFilterToOpen: () => void
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
  handleRemoveFilter,
  handleUpdateCondition,
  handleUpdateSort,
  handleRemoveSort,
  handleReorderSorts,
  handleResetAll,
  searchQueries,
  handleSearchChange,
  filterToOpen,
  clearFilterToOpen
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
          filterToOpen={filterToOpen}
          onOpen={clearFilterToOpen}
        />
      )}

      {activeFilters.length > 0 && activeSorts.length > 0 && <div className="h-7 w-px bg-borders-1" />}

      {activeFilters.map(filter => {
        return (
          <Filters
            filter={filter}
            filterOptions={filterOptions}
            handleUpdateFilter={handleUpdateFilter}
            handleRemoveFilter={handleRemoveFilter}
            handleUpdateCondition={handleUpdateCondition}
            handleSearchChange={handleSearchChange}
            searchQueries={searchQueries}
            filterToOpen={filterToOpen}
            onOpen={clearFilterToOpen}
            key={filter.type}
          />
        )
      })}

      {(!!activeFilters.length || !!activeSorts.length) && (
        <button
          className="ml-2.5 flex items-center gap-x-1.5 text-14 text-foreground-4 outline-none ring-offset-2 ring-offset-background transition-colors duration-200 hover:text-foreground-danger focus:ring-2"
          onClick={handleResetAll}>
          <Icon className="rotate-45" name="plus" size={12} />
          Reset
        </button>
      )}
    </div>
  )
}

export default FiltersBar
