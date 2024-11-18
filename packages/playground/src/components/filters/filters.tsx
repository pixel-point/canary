import { FilterOption, FilterSearchQueries, FilterValue, SortOption, SortValue } from './types'
import FilterTrigger from './filter-trigger'

interface FiltersProps {
  showFilter?: boolean
  showSort?: boolean
  filterOptions: FilterOption[]
  sortOptions: SortOption[]
  activeFilters: FilterValue[]
  activeSorts: SortValue[]
  handleFilterChange: (filter: Omit<FilterValue, 'condition' | 'selectedValues'>) => void
  handleSortChange: (sort: SortValue) => void
  handleResetFilters: () => void
  handleResetSorts: () => void
  searchQueries: FilterSearchQueries
  handleSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
}

const Filters = ({
  showFilter = true,
  showSort = true,
  filterOptions,
  sortOptions,
  activeFilters,
  activeSorts,
  handleFilterChange,
  handleSortChange,
  handleResetFilters,
  handleResetSorts,
  searchQueries,
  handleSearchChange
}: FiltersProps) => {
  return (
    <div className="flex items-center gap-x-5">
      {showFilter && (
        <FilterTrigger
          type="filter"
          activeFilters={activeFilters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          searchQueries={searchQueries}
          onSearchChange={handleSearchChange}
          options={filterOptions}
        />
      )}

      {showSort && (
        <FilterTrigger
          type="sort"
          activeFilters={activeSorts}
          onChange={handleSortChange}
          onReset={handleResetSorts}
          searchQueries={searchQueries}
          onSearchChange={handleSearchChange}
          options={sortOptions}
        />
      )}
    </div>
  )
}

export default Filters
