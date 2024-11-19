import { Icon } from '@harnessio/canary'
import { FilterOption, SortOption, SortDirection } from '../types'
import { UseFiltersReturn } from '../use-filters'
import Sorts from './sorts'
import Filters from './filters'

interface FiltersBarProps {
  filterOptions: FilterOption[]
  sortOptions: SortOption[]
  sortDirections: SortDirection[]
  filterHandlers: Pick<
    UseFiltersReturn,
    | 'activeFilters'
    | 'activeSorts'
    | 'handleUpdateFilter'
    | 'handleRemoveFilter'
    | 'handleUpdateCondition'
    | 'handleUpdateSort'
    | 'handleRemoveSort'
    | 'handleSortChange'
    | 'handleResetSorts'
    | 'handleReorderSorts'
    | 'handleResetAll'
    | 'searchQueries'
    | 'handleSearchChange'
    | 'filterToOpen'
    | 'clearFilterToOpen'
  >
}

const FiltersBar = ({
  filterOptions,
  sortOptions,
  sortDirections,
  filterHandlers: {
    activeFilters,
    activeSorts,
    handleUpdateFilter,
    handleRemoveFilter,
    handleUpdateCondition,
    handleUpdateSort,
    handleRemoveSort,
    handleSortChange,
    handleResetSorts,
    handleReorderSorts,
    handleResetAll,
    searchQueries,
    handleSearchChange,
    filterToOpen,
    clearFilterToOpen
  }
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

      {activeFilters.length > 0 && activeSorts.length > 0 && <div className="bg-borders-1 h-7 w-px" />}

      {activeFilters.map(filter => (
        <Filters
          key={filter.type}
          filter={filter}
          filterOptions={filterOptions}
          handleUpdateFilter={handleUpdateFilter}
          handleRemoveFilter={handleRemoveFilter}
          handleUpdateCondition={handleUpdateCondition}
          handleSearchChange={handleSearchChange}
          searchQueries={searchQueries}
          filterToOpen={filterToOpen}
          onOpen={clearFilterToOpen}
        />
      ))}

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
