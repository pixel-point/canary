import { useCallback, useEffect, useState } from 'react'

import { FilterValue, SortValue, FilterSearchQueries, FilterAction } from './types'

interface SavedFilters {
  activeFilters: FilterValue[]
  activeSorts: SortValue[]
}

export interface UseFiltersReturn {
  // State values
  activeFilters: FilterValue[]
  activeSorts: SortValue[]
  searchQueries: FilterSearchQueries
  filterToOpen: FilterAction | null

  // Filter methods
  handleFilterChange: (newFilter: Omit<FilterValue, 'condition' | 'selectedValues'>, defaultCondition?: string) => void
  handleUpdateFilter: (type: string, selectedValues: string[]) => void
  handleUpdateCondition: (type: string, condition: string) => void
  handleRemoveFilter: (type: string) => void
  handleResetFilters: () => void

  // Sort methods
  handleSortChange: (newSort: SortValue) => void
  handleUpdateSort: (index: number, updatedSort: SortValue) => void
  handleRemoveSort: (index: number) => void
  handleReorderSorts: (newSorts: SortValue[]) => void
  handleResetSorts: () => void

  // Common methods
  handleResetAll: () => void

  // Search methods
  handleSearchChange: (type: string, query: string, searchType: keyof FilterSearchQueries) => void
  clearSearchQuery: (type: string, searchType: keyof FilterSearchQueries) => void

  // Filter opening control
  clearFilterToOpen: () => void

  // Save and clear saved filters
  handleSaveFilters: () => void
  handleClearSavedFilters: () => void
  hasUnsavedChanges: boolean
}

const STORAGE_KEY = 'filters'

const useFilters = ({ pageSlug }: { pageSlug: string }): UseFiltersReturn => {
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>([])
  const [activeSorts, setActiveSorts] = useState<SortValue[]>([])
  const [savedState, setSavedState] = useState<SavedFilters | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [searchQueries, setSearchQueries] = useState<FilterSearchQueries>({
    filters: {} as Record<string, string>,
    menu: {} as Record<string, string>
  })
  const [filterToOpen, setFilterToOpen] = useState<FilterAction | null>(null)

  /**
   * Load saved filters from localStorage when component mounts or pageSlug changes
   * This effect handles the initial state setup for filters on the current page
   */
  useEffect(() => {
    const savedFiltersString = localStorage.getItem(STORAGE_KEY)
    if (savedFiltersString) {
      try {
        // Parse saved filters for all pages
        const savedFilters = JSON.parse(savedFiltersString) as Record<string, SavedFilters>

        // If there are saved filters for current page
        if (savedFilters[pageSlug]) {
          // Restore saved state
          setActiveFilters(savedFilters[pageSlug].activeFilters)
          setActiveSorts(savedFilters[pageSlug].activeSorts)
          setSavedState(savedFilters[pageSlug])
          setHasUnsavedChanges(false)
        } else {
          // No saved filters for this page - reset to initial state
          setSavedState(null)
          setHasUnsavedChanges(false)
        }
      } catch (error) {
        console.error('Error loading saved filters:', error)
      }
    }
  }, [pageSlug])

  /**
   * Track changes in filters and sorts to determine if there are unsaved changes
   * This effect controls the visibility of the Save button
   */
  useEffect(() => {
    // If no saved state exists, show Save button if there are any active filters/sorts
    if (!savedState) {
      setHasUnsavedChanges(activeFilters.length > 0 || activeSorts.length > 0)
      return
    }

    // Normalize current state - convert empty arrays to [] for consistent comparison
    const currentState = {
      activeFilters: activeFilters.length ? activeFilters : [],
      activeSorts: activeSorts.length ? activeSorts : []
    }

    // Normalize saved state similarly
    const savedStateNormalized = {
      activeFilters: savedState.activeFilters.length ? savedState.activeFilters : [],
      activeSorts: savedState.activeSorts.length ? savedState.activeSorts : []
    }

    // Show Save button only if:
    // 1. Current state is different from saved state AND
    // 2. There are actually some filters/sorts active
    const isChanged =
      JSON.stringify(currentState) !== JSON.stringify(savedStateNormalized) &&
      (currentState.activeFilters.length > 0 || currentState.activeSorts.length > 0)

    setHasUnsavedChanges(isChanged)
  }, [activeFilters, activeSorts, savedState])

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
  const handleFilterChange = (
    newFilter: Omit<FilterValue, 'condition' | 'selectedValues'>,
    defaultCondition = 'is'
  ) => {
    setActiveFilters(prevFilters => {
      // Indicate which filter should be opened
      setFilterToOpen({ type: newFilter.type, kind: 'filter' })

      if (!prevFilters.find(f => f.type === newFilter.type)) {
        return [
          ...prevFilters,
          {
            ...newFilter,
            condition: defaultCondition,
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
    // Indicate which filter should be opened
    setFilterToOpen({ type: newSort.type, kind: 'sort' })

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

  const handleReorderSorts = (newSorts: SortValue[]) => {
    setActiveSorts(newSorts)
  }

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

  const clearSearchQuery = (type: string, searchType: keyof FilterSearchQueries) => {
    setSearchQueries(prev => ({
      ...prev,
      [searchType]: {
        ...prev[searchType],
        [type]: ''
      }
    }))
  }

  // Clear the filter to open
  const clearFilterToOpen = () => {
    setFilterToOpen(null)
  }

  /**
   * Save current filters and sorts to localStorage for the current page
   * This preserves filter state between page reloads
   */
  const handleSaveFilters = useCallback(() => {
    try {
      // Get existing saved filters for all pages
      const savedFiltersString = localStorage.getItem(STORAGE_KEY)
      const savedFilters = savedFiltersString ? JSON.parse(savedFiltersString) : {}

      // Create new state to save
      const newSavedState = {
        activeFilters,
        activeSorts
      }

      // Update saved filters for current page
      savedFilters[pageSlug] = newSavedState
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFilters))

      // Update local state to reflect saved changes
      setSavedState(newSavedState)
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Error saving filters:', error)
    }
  }, [pageSlug, activeFilters, activeSorts])

  /**
   * Clear saved filters for the current page only
   * This removes saved state from localStorage and resets all filters
   */
  const handleClearSavedFilters = useCallback(() => {
    try {
      const savedFiltersString = localStorage.getItem(STORAGE_KEY)
      if (savedFiltersString) {
        const savedFilters = JSON.parse(savedFiltersString)
        // Remove saved filters for current page if they exist
        if (savedFilters[pageSlug]) {
          delete savedFilters[pageSlug]
          localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFilters))
        }
      }
      // Reset local state
      setSavedState(null)
      setHasUnsavedChanges(false)
      handleResetAll()
    } catch (error) {
      console.error('Error clearing saved filters:', error)
      handleResetAll()
    }
  }, [pageSlug, handleResetAll])

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
    clearSearchQuery,
    filterToOpen,
    clearFilterToOpen,
    handleSaveFilters,
    handleClearSavedFilters,
    hasUnsavedChanges
  }
}

export default useFilters
