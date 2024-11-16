interface FilterOptionBase {
  label: string
  value: string
  type: string
  conditions?: FilterCondition[]
}

type FilterOption = CheckboxFilterOption | DateFilterOption

interface DateFilterOption extends FilterOptionBase {
  type: 'date'
}

interface CheckboxFilterOption extends FilterOptionBase {
  type: 'checkbox'
  options: Array<{
    label: string
    value: string
  }>
}

interface FilterCondition {
  label: string
  value: string
}

interface FilterValue {
  type: string
  condition: string
  selectedValues: string[]
}

interface SortOption {
  label: string
  value: string
}

interface SortDirection {
  label: string
  value: string
}

interface SortValue {
  type: string
  direction: string
}

interface FilterSearchQueries {
  filters: Record<string, string>
  menu: Record<string, string>
}

interface ConditionOption {
  label: string
  value: string
}

export type {
  FilterOption,
  DateFilterOption,
  CheckboxFilterOption,
  FilterCondition,
  FilterValue,
  SortOption,
  SortDirection,
  SortValue,
  FilterSearchQueries,
  ConditionOption
}
