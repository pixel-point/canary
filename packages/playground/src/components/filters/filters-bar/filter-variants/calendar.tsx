import { useState } from 'react'
import { Calendar as UICalendar } from '@harnessio/canary'
import { FilterValue } from '../../types'

interface CalendarProps {
  filter: FilterValue
  onUpdateFilter: (type: string, selectedValues: string[]) => void
}

const Calendar = ({ filter, onUpdateFilter }: CalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(
    filter.selectedValues[0] ? new Date(filter.selectedValues[0]) : undefined
  )

  return (
    <div className="mt-2.5 px-2 pb-3 pt-1">
      <UICalendar
        className="p-0"
        mode="single"
        selected={date}
        onSelect={newDate => {
          setDate(newDate)
          if (newDate) {
            onUpdateFilter(filter.type, [newDate.toISOString()])
          }
        }}
        initialFocus
      />
    </div>
  )
}

export default Calendar
