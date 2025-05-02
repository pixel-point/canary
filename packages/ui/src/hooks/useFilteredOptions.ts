import { useMemo } from 'react'

export interface Option {
  id: string | number
  label: string
}

export function useFilteredOptions<T extends Option>(options: T[], searchQuery: string): T[] {
  return useMemo(() => {
    const search = searchQuery.trim().toLowerCase()

    if (!search) return options

    return options.filter(option => option.label.toLowerCase().includes(search))
  }, [options, searchQuery])
}
