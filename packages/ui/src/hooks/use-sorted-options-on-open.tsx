import { useEffect, useMemo, useState } from 'react'

export function useSortedOptionsOnOpen<T extends { id: string | number }>(
  isOpen: boolean,
  options: T[],
  selectedItems: T[],
  enable: boolean = true
): T[] {
  const [snapshotIds, setSnapshotIds] = useState<Set<string | number>>(new Set())

  useEffect(() => {
    if (enable && isOpen) {
      setSnapshotIds(new Set(selectedItems.map(item => item.id)))
    }
  }, [isOpen, enable])

  return useMemo(() => {
    if (!enable || !isOpen) return options

    const selected = options.filter(opt => snapshotIds.has(opt.id))
    const unselected = options.filter(opt => !snapshotIds.has(opt.id))

    return [...selected, ...unselected]
  }, [options, snapshotIds, isOpen, enable])
}
