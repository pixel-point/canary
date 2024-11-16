import { FilterOption, FilterSearchQueries, FilterValue, SortOption, SortValue } from './types'
import FilterTrigger from './filter-trigger'

interface FiltersProps {
  showFilter?: boolean
  showSort?: boolean
  filterOptions: FilterOption[]
  sortOptions: SortOption[]
  activeFilters: FilterValue[]
  activeSorts: SortValue[]
  onFilterChange: (filter: Omit<FilterValue, 'condition' | 'selectedValues'>) => void
  onSortChange: (sort: SortValue) => void
  onResetFilters: () => void
  onResetSort: () => void
  searchQueries: FilterSearchQueries
  onSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
}

const Filters = ({
  showFilter = true,
  showSort = true,
  filterOptions,
  sortOptions,
  activeFilters,
  activeSorts,
  onFilterChange,
  onSortChange,
  onResetFilters,
  onResetSort,
  searchQueries,
  onSearchChange
}: FiltersProps) => {
  return (
    <div className="flex items-center gap-x-5">
      {showFilter && (
        <FilterTrigger
          type="filter"
          activeFilters={activeFilters}
          onChange={onFilterChange}
          onReset={onResetFilters}
          searchQueries={searchQueries}
          onSearchChange={onSearchChange}
          options={filterOptions}
        />
      )}

      {showSort && (
        <FilterTrigger
          type="sort"
          activeFilters={activeSorts}
          onChange={onSortChange}
          onReset={onResetSort}
          searchQueries={searchQueries}
          onSearchChange={onSearchChange}
          options={sortOptions}
        />
      )}
    </div>
  )
}

export default Filters
