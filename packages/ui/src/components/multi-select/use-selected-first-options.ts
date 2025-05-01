import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

import { MultiSelectOptionType } from '@/components'

type UseSelectedFirstOptionsReturnType<TOption> = {
  optionsToDisplay: MultiSelectOptionType<TOption>[]
  setOptionsToDisplay: Dispatch<SetStateAction<MultiSelectOptionType<TOption>[]>>
  showSelectedFirstOnOpen: (open: boolean) => void
}

export const useSelectedFirstOptions = <TOption>(
  options: MultiSelectOptionType<TOption>[],
  selectedItems: MultiSelectOptionType<Partial<TOption>>[]
): UseSelectedFirstOptionsReturnType<TOption> => {
  const [isOpen, setIsOpen] = useState(false)
  const [optionsToDisplay, setOptionsToDisplay] = useState<MultiSelectOptionType<TOption>[]>(options)
  const selectedIds = useMemo(() => new Set(selectedItems.map(item => item.id)), [selectedItems])

  const showSelectedFirstOnOpen = useCallback(
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

  return {
    optionsToDisplay: isOpen ? optionsToDisplay : options,
    setOptionsToDisplay,
    showSelectedFirstOnOpen
  }
}
