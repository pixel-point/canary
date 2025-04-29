import { useCallback, useMemo, useState } from 'react'

import { MultiSelectOptionType } from '@/components'

export const useSelectedFirstOptions = <TOption>(
  options: MultiSelectOptionType<TOption>[],
  selectedItems: MultiSelectOptionType<Partial<TOption>>[]
): readonly [MultiSelectOptionType<TOption>[], (open: boolean) => void] => {
  const [isOpen, setIsOpen] = useState(false)
  const [optionsToDisplay, setOptionsToDisplay] = useState<MultiSelectOptionType<TOption>[]>(options)
  const selectedIds = useMemo(() => new Set(selectedItems.map(item => item.id)), [selectedItems])

  const onOpen = useCallback(
    open => {
      if (open) {
        const selectedFirst = [...options].sort((a, b) => {
          const aSelected = selectedIds.has(a.id)
          const bSelected = selectedIds.has(b.id)

          if (aSelected === bSelected) return 0

          return aSelected ? -1 : 1
        })

        setOptionsToDisplay(selectedFirst)
      }

      setIsOpen(open)
    },
    [selectedIds, options]
  )

  return [isOpen ? optionsToDisplay : options, onOpen] as const
}
