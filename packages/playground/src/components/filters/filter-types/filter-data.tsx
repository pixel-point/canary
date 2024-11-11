import React, { useState } from 'react'
import { Calendar } from '@harnessio/canary'
import { FilterValue } from '../types'

interface DateFilterProps {
  filter: FilterValue
  onUpdateFilter: (type: string, values: string[]) => void
}

const DateFilter = ({ filter, onUpdateFilter }: DateFilterProps) => {
  const [date, setDate] = useState<Date | undefined>(
    filter.selectedValues[0] ? new Date(filter.selectedValues[0]) : undefined
  )

  return (
    <>
      <Calendar
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
    </>
  )
}

export default DateFilter
