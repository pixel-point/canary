import { DropdownMenuCheckboxItem } from '@harnessio/canary'
import { CheckboxFilterOption, FilterValue } from '../../types'

interface CheckboxFilterProps {
  filter: FilterValue
  filterOption: CheckboxFilterOption
  onUpdateFilter: (type: string, selectedValues: string[]) => void
}

const Checkbox = ({ filter, filterOption, onUpdateFilter }: CheckboxFilterProps) => {
  return (
    <div className="px-2 py-1">
      {filterOption.options.map(option => (
        <DropdownMenuCheckboxItem
          className="pl-[34px]"
          checked={filter.selectedValues.includes(option.value)}
          onSelect={event => {
            event?.preventDefault()
            event?.stopPropagation()
            const newValues = filter.selectedValues.includes(option.value)
              ? filter.selectedValues.filter(v => v !== option.value)
              : [...filter.selectedValues, option.value]
            onUpdateFilter(filter.type, newValues)
          }}
          key={option.value}>
          {option.label}
        </DropdownMenuCheckboxItem>
      ))}
    </div>
  )
}

export default Checkbox
