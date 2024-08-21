import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@harnessio/canary'
import React from 'react'
interface FilterOption {
  label: string
  value: string
}
export interface PullRequestFilterProps<T extends FilterOption> {
  activityFilters: T[]
  dateFilters: T[]
  activityFilter: T
  dateOrderSort: T
  setActivityFilter: (filter: T) => void
  setDateOrderSort: (sort: T) => void
}

const PullRequestFilters = <T extends FilterOption>({
  activityFilters,
  dateFilters,
  activityFilter,
  dateOrderSort,
  setActivityFilter,
  setDateOrderSort
}: PullRequestFilterProps<T>) => {
  return (
    <div className={'mt-2 py-2 flex space-x-2 pt-4 justify-between border-b border-b-border'}>
      <div className="">Overview</div>
      <div className="flex">
        <Select defaultValue={activityFilter.value}>
          <SelectTrigger className="w-fit border-none px-1 text-white text-xs focus:ring-[0px]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {activityFilters.map(filter => (
              <SelectItem key={filter.value} value={filter.value} onClick={() => setActivityFilter(filter)}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select defaultValue={dateOrderSort.value}>
          <SelectTrigger className="w-fit border-none px-1 text-white text-xs focus:ring-[0px]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {dateFilters.map(filter => (
              <SelectItem key={filter.value} value={filter.value} onClick={() => setDateOrderSort(filter)}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default PullRequestFilters
