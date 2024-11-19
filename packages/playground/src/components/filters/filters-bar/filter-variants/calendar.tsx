import { useState } from 'react'
import { Calendar as UICalendar, type CalendarDateRange } from '@harnessio/canary'
import { FilterValue } from '../../types'
import { UseFiltersReturn } from '../../use-filters'

interface CalendarProps {
  filter: FilterValue
  onUpdateFilter: UseFiltersReturn['handleUpdateFilter']
}

const Calendar = ({ filter, onUpdateFilter }: CalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(
    filter.selectedValues[0] ? new Date(filter.selectedValues[0]) : undefined
  )

  const [dateRange, setDateRange] = useState<CalendarDateRange | undefined>(
    filter.selectedValues.length === 2
      ? {
          from: new Date(filter.selectedValues[0]),
          to: new Date(filter.selectedValues[1])
        }
      : undefined
  )

  const isBetweenMode = filter.condition === 'is_between'

  if (isBetweenMode) {
    return (
      <div className="mt-2.5 px-2 pb-3 pt-1">
        <UICalendar
          className="p-0"
          mode="range"
          selected={dateRange}
          onSelect={(value: CalendarDateRange | undefined) => {
            if (value) {
              setDateRange(value)
              if (value.from && value.to) {
                onUpdateFilter(filter.type, [value.from.toISOString(), value.to.toISOString()])
              }
            }
          }}
          initialFocus
        />
      </div>
    )
  }

  return (
    <div className="mt-2.5 px-2 pb-3 pt-1">
      <UICalendar
        className="p-0"
        mode="single"
        selected={date}
        onSelect={(value: Date | undefined) => {
          if (value) {
            setDate(value)
            onUpdateFilter(filter.type, [value.toISOString()])
          }
        }}
        initialFocus
      />
    </div>
  )
}

export default Calendar
