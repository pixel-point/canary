import type { FilterOption, SortOption, SortDirection } from '../types'
import { BASIC_CONDITIONS, RANGE_CONDITIONS } from './conditions'

/**
 * Available sort options for repositories
 */
export const SORT_OPTIONS: SortOption[] = [
  { label: 'Last updated', value: 'updated' },
  { label: 'Stars', value: 'stars' },
  { label: 'Forks', value: 'forks' },
  { label: 'Pull Requests', value: 'pulls' },
  { label: 'Title', value: 'title' }
]

/**
 * Available sort directions
 */
export const SORT_DIRECTIONS: SortDirection[] = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' }
]

/**
 * Default filter options configuration
 *
 * Available filters:
 * - Type: Checkbox filter for repository types (public, private, fork)
 * - Created time: Date filter for repository creation time
 */
export const FILTER_OPTIONS: FilterOption[] = [
  {
    label: 'Type',
    value: 'type',
    type: 'checkbox',
    conditions: BASIC_CONDITIONS,
    options: [
      { label: 'Public', value: 'public' },
      { label: 'Private', value: 'private' },
      { label: 'Fork', value: 'fork' }
    ]
  },
  {
    label: 'Created time',
    value: 'created_time',
    type: 'date',
    conditions: RANGE_CONDITIONS
  }
]
