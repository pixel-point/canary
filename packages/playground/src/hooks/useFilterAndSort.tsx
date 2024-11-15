import { useCallback, useState } from 'react'

import { FilterValue, SortValue, FilterSearchQueries } from '../components/filters/types'

export const useFilterAndSort = () => {
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>([])
  const [activeSorts, setActiveSorts] = useState<SortValue[]>([])
  const [searchQueries, setSearchQueries] = useState<FilterSearchQueries>({
    filters: {},
    menu: {}
  })

  // FILTERS
  /**
   * Handles adding a new filter to the active filters list
   * @param newFilter - Filter object containing:
   *   - type: string - The type of filter (e.g., 'type', 'language')
   *   - condition: string - The condition for filtering (will be overridden with default 'is')
   *   - selectedValues: string[] - Array of selected values (will be initialized as empty)
   *
   * Only adds the filter if one with the same type doesn't already exist
   */
  const handleFilterChange = (newFilter: FilterValue) => {
    setActiveFilters(prevFilters => {
      if (!prevFilters.find(f => f.type === newFilter.type)) {
        return [
          ...prevFilters,
          {
            ...newFilter,
            condition: 'is',
            selectedValues: []
          }
        ]
      }
      return prevFilters
    })
  }

  /**
   * Updates the selected values for a specific filter type
   * @param type - The type of filter to update (e.g., 'type', 'language')
   * @param selectedValues - New array of selected values for the filter
   *
   * Maps through all filters and updates only the matching one
   * while preserving other filters unchanged
   */
  const handleUpdateFilter = (type: string, selectedValues: string[]) => {
    setActiveFilters(activeFilters.map(filter => (filter.type === type ? { ...filter, selectedValues } : filter)))
  }

  /**
   * Updates the condition for a specific filter type
   * @param type - The type of filter to update (e.g., 'type', 'language')
   * @param condition - New condition value (e.g., 'is', 'is_not', 'is_empty')
   *
   * Special handling for 'is_empty' condition:
   * - When 'is_empty' is selected, clears all selected values
   * - For other conditions, preserves existing selected values
   */
  const handleUpdateCondition = (type: string, condition: string) => {
    setActiveFilters(prevFilters =>
      prevFilters.map(filter => {
        if (filter.type === type) {
          return {
            ...filter,
            condition,
            selectedValues: condition === 'is_empty' ? [] : filter.selectedValues
          }
        }
        return filter
      })
    )
  }

  /**
   * Removes a filter from the active filters list
   * @param type - The type of filter to remove (e.g., 'type', 'language')
   *
   * Filters out the specified filter type while keeping all others
   */
  const handleRemoveFilter = (type: string) => {
    setActiveFilters(prevFilters => prevFilters.filter(filter => filter.type !== type))
  }

  const handleResetFilters = () => {
    setActiveFilters([])
  }

  // SORTS
  /**
   * Handles adding a new sort to the active sorts list
   * @param newSort - Sort object containing:
   *   - type: string - The type of sort (e.g., 'updated', 'stars')
   *   - direction: string - The direction of sort (will be initialized as 'asc')
   *
   * Only adds the sort if one with the same type doesn't already exist
   */
  const handleSortChange = (newSort: SortValue) => {
    if (!activeSorts.find(sort => sort.type === newSort.type)) {
      setActiveSorts([...activeSorts, newSort])
    }
  }

  /**
   * Updates a specific sort in the active sorts list
   * @param index - The index of the sort to update
   * @param updatedSort - The new sort object to replace the existing one
   *
   * Maps through all sorts and updates only the matching one
   * while preserving other sorts unchanged
   */
  const handleUpdateSort = (index: number, updatedSort: SortValue) => {
    setActiveSorts(activeSorts.map((sort, i) => (i === index ? updatedSort : sort)))
  }

  /**
   * Removes a sort from the active sorts list
   * @param index - The index of the sort to remove
   *
   * Filters out the specified sort index while keeping all others
   */
  const handleRemoveSort = (index: number) => {
    setActiveSorts(activeSorts.filter((_, i) => i !== index))
  }

  const handleReorderSorts = useCallback((newSorts: SortValue[]) => {
    setActiveSorts(newSorts)
  }, [])

  const handleResetSorts = () => {
    setActiveSorts([])
  }

  const handleResetAll = useCallback(() => {
    setActiveFilters([])
    setActiveSorts([])
  }, [])

  // SEARCH
  const handleSearchChange = (type: string, query: string, searchType: keyof FilterSearchQueries) => {
    setSearchQueries(prev => ({
      ...prev,
      [searchType]: {
        ...prev[searchType],
        [type]: query
      }
    }))
  }

  const clearSearchQuery = (filterType: string, searchType: keyof FilterSearchQueries) => {
    setSearchQueries(prev => ({
      ...prev,
      [searchType]: {
        ...prev[searchType],
        [filterType]: ''
      }
    }))
  }

  return {
    activeFilters,
    activeSorts,
    searchQueries,
    handleFilterChange,
    handleUpdateFilter,
    handleUpdateCondition,
    handleRemoveFilter,
    handleSortChange,
    handleUpdateSort,
    handleRemoveSort,
    handleResetFilters,
    handleResetSorts,
    handleReorderSorts,
    handleResetAll,
    handleSearchChange,
    clearSearchQuery
  }
}