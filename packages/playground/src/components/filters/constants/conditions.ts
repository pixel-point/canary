import type { FilterCondition } from '../types'

export const BASIC_CONDITIONS: FilterCondition[] = [
  { label: 'is', value: 'is' },
  { label: 'is not', value: 'is_not' },
  { label: 'is empty', value: 'is_empty' },
  { label: 'is not empty', value: 'is_not_empty' }
]

export const RANGE_CONDITIONS: FilterCondition[] = [
  { label: 'is', value: 'is' },
  { label: 'is before', value: 'is_before' },
  { label: 'is after', value: 'is_after' },
  { label: 'is between', value: 'is_between' },
  { label: 'is empty', value: 'is_empty' },
  { label: 'is not empty', value: 'is_not_empty' }
]
