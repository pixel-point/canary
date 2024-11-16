import { format } from 'date-fns'
import {
  CheckboxFilterOption,
  type FilterValue,
  type FilterOption,
  SortOption,
  SortValue,
  FilterSearchQueries
} from './types'

export const getSortTriggerLabel = (activeSorts: SortValue[], sortOptions: SortOption[]) => {
  if (activeSorts.length === 0) return { label: '', icon: 'circle-arrows-updown' as const }

  if (activeSorts.length === 1) {
    const currentSort = activeSorts[0]
    const label = sortOptions.find(opt => opt.value === currentSort.type)?.label

    return {
      label,
      icon: 'circle-arrow-top' as const,
      isDescending: currentSort.direction === 'desc'
    }
  }

  return {
    label: `${activeSorts.length} sorts`,
    icon: 'circle-arrows-updown' as const,
    isDescending: false
  }
}

export const getFilterDisplayValue = (filterOption: FilterOption, filter: FilterValue): string => {
  switch (filterOption.type) {
    case 'checkbox':
      return filter.selectedValues
        .map(
          value =>
            (filterOption as CheckboxFilterOption).options.find(
              (opt: { label: string; value: string }) => opt.value === value
            )?.label
        )
        .join(', ')
    case 'calendar': {
      if (filter.selectedValues.length === 0) return ''

      const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const currentYear = new Date().getFullYear()
        return date.getFullYear() === currentYear ? format(date, 'MMM d') : format(date, 'MMM d, yyyy')
      }

      if (filter.selectedValues.length === 1) {
        return formatDate(filter.selectedValues[0])
      }
      return `${formatDate(filter.selectedValues[0])} - ${formatDate(filter.selectedValues[1])}`
    }
    default:
      return ''
  }
}

export const getFilteredOptions = (
  filterOption: FilterOption,
  filter: FilterValue,
  searchQueries: FilterSearchQueries
) => {
  if (filterOption.type === 'checkbox') {
    return filterOption.options.filter(
      option =>
        !searchQueries.filters[filter.type] ||
        option.label.toLowerCase().includes(searchQueries.filters[filter.type].toLowerCase())
    )
  }
  return []
}
