import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  Input,
  Icon,
  cn,
  DropdownMenuTrigger
} from '@harnessio/canary'

import type { FilterValue, FilterOption, FilterSearchQueries, CheckboxFilterOption, FilterAction } from '../types'

import Calendar from './filter-variants/calendar'
import Checkbox from './filter-variants/checkbox'
import Text from './filter-variants/text'
import Number from './filter-variants/number'
import { getFilterDisplayValue, getFilteredOptions } from '../utils'
import { useEffect, useState } from 'react'

const renderFilterValues = (
  filter: FilterValue,
  filterOption: FilterOption,
  onUpdateFilter: ((type: string, selectedValues: string[]) => void) | undefined,
  filteredOptions?: CheckboxFilterOption['options']
) => {
  if (!onUpdateFilter) return null

  switch (filterOption.type) {
    case 'checkbox':
      return (
        <Checkbox
          filter={filter}
          filterOption={{
            ...filterOption,
            options: filteredOptions || (filterOption as CheckboxFilterOption).options
          }}
          onUpdateFilter={onUpdateFilter}
        />
      )
    case 'calendar':
      return <Calendar filter={filter} onUpdateFilter={onUpdateFilter} />
    case 'text':
      return <Text filter={filter} onUpdateFilter={onUpdateFilter} />
    case 'number':
      return <Number filter={filter} onUpdateFilter={onUpdateFilter} />
    default:
      return null
  }
}

interface FiltersProps {
  filter: FilterValue
  filterOptions: FilterOption[]
  handleUpdateFilter: ((type: string, selectedValues: string[]) => void) | undefined
  handleRemoveFilter: ((type: string) => void) | undefined
  handleUpdateCondition: ((type: string, condition: string) => void) | undefined
  handleSearchChange: ((type: string, value: string, searchType: 'filters') => void) | undefined
  searchQueries: FilterSearchQueries
  filterToOpen: FilterAction | null
  onOpen?: () => void
}

const Filters = ({
  filter,
  filterOptions,
  handleUpdateFilter,
  handleUpdateCondition,
  handleRemoveFilter,
  handleSearchChange,
  searchQueries,
  filterToOpen,
  onOpen
}: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (filterToOpen?.type === filter.type && filterToOpen?.kind === 'filter' && !isOpen) {
      setIsOpen(true)
      onOpen?.()
    }
  }, [filterToOpen, filter.type, isOpen, onOpen])

  const filterOption = filterOptions.find(opt => opt.value === filter.type)
  if (!filterOption) return null

  return (
    <DropdownMenu key={filter.type} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex h-8 items-center gap-x-3 rounded bg-background-3 pl-2.5 pr-2 transition-colors duration-200 hover:bg-background-8">
        <div className="flex items-center gap-x-1.5 text-13">
          <span className="text-foreground-1">
            {filterOption.label}
            {!!filter.selectedValues.length && ': '}
          </span>
          <span className="text-foreground-4">{getFilterDisplayValue(filterOption, filter)}</span>
        </div>
        <Icon className="chevron-down text-icons-1" name="chevron-down" size={10} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn('w-[276px] p-0', {
          'w-max': filterOption.type === 'calendar'
        })}
        align="start">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex w-full items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-2">
              <span className="text-14 text-foreground-4">{filterOption.label}</span>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-[18px] items-center gap-x-1 rounded bg-background-3 pl-1.5 pr-1 text-14 text-foreground-2">
                  {filterOption.conditions?.find(c => c.value === filter.condition)?.label}
                  <Icon className="chevron-down text-icons-1" name="chevron-down" size={10} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {filterOption.conditions?.map(condition => (
                    <DropdownMenuItem
                      onSelect={() => handleUpdateCondition?.(filter.type, condition.value)}
                      key={condition.value}>
                      {condition.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="group flex h-[18px] items-center px-1">
                <Icon
                  className="text-icons-1 transition-colors duration-200 group-hover:text-foreground-1"
                  name="more-dots-fill"
                  size={12}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  className="focus:bg-transparent focus:text-foreground-danger focus:outline-none"
                  onSelect={() => handleRemoveFilter?.(filter.type)}>
                  <button className="flex items-center gap-x-1.5 text-14 text-foreground-4 transition-colors duration-200 hover:text-foreground-danger">
                    <Icon name="trash" size={12} />
                    Delete filter
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filter.condition !== 'is_empty' && filterOption.type === 'checkbox' && (
          <div className="border-b border-borders-1 px-3 pb-2.5">
            <div
              className={cn(
                'border-border-2 focus-within:border-borders-3 flex min-h-8 justify-between gap-x-1 rounded border px-2.5 py-[3px] outline-none transition-colors duration-200 focus-within:border',
                {
                  'px-1': !!filter.selectedValues.length
                }
              )}>
              <div className="flex flex-1 flex-wrap items-center gap-1">
                {!!filter.selectedValues.length &&
                  filter.selectedValues.map(value => {
                    const label = filterOption.options?.find(opt => opt.value === value)?.label
                    return (
                      <div className="flex h-6 items-center gap-x-1.5 rounded bg-background-8 px-2" key={value}>
                        <span className="text-14 text-foreground-8">{label}</span>
                        <button
                          className="text-icons-1 transition-colors duration-200 hover:text-foreground-1"
                          onClick={() => {
                            const newValues = filter.selectedValues.filter(v => v !== value)
                            handleUpdateFilter?.(filter.type, newValues)
                          }}>
                          <Icon className="rotate-45" name="plus" size={10} />
                        </button>
                      </div>
                    )
                  })}

                <DropdownMenuItem className="p-0 focus:bg-transparent" asChild>
                  <Input
                    className="h-6 flex-1 border-none outline-none hover:border-none focus:border-none focus-visible:ring-0"
                    type="text"
                    placeholder={filter.selectedValues.length > 0 ? '' : 'Select one or more options...'}
                    value={searchQueries.filters[filter.type] || ''}
                    onChange={e => handleSearchChange?.(filter.type, e.target.value, 'filters')}
                    onClick={e => {
                      e.preventDefault()
                    }}
                    onKeyDown={e => e.stopPropagation()}
                  />
                </DropdownMenuItem>
              </div>
              {(!!filter.selectedValues.length || searchQueries.filters[filter.type]) && (
                <button
                  className="flex p-1.5 text-foreground-4 transition-colors duration-200 hover:text-foreground-1"
                  onClick={() => {
                    handleUpdateFilter?.(filter.type, [])
                    handleSearchChange?.(filter.type, '', 'filters')
                  }}>
                  <Icon className="rotate-45" name="plus" size={12} />
                </button>
              )}
            </div>
          </div>
        )}

        <div>
          {filter.condition !== 'is_empty' &&
            handleUpdateFilter &&
            renderFilterValues(
              filter,
              filterOption,
              handleUpdateFilter,
              filterOption.type === 'checkbox' ? getFilteredOptions(filterOption, filter, searchQueries) : undefined
            )}

          {filterOption.type === 'checkbox' && getFilteredOptions(filterOption, filter, searchQueries).length === 0 && (
            <div className="flex items-center justify-center p-4">
              <span className="text-1 leading-none text-foreground-2">No results</span>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filters
