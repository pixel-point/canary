import { useQueryState } from 'nuqs'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash-es'

export function useDebouncedQuery(defaultValue = '', delay = 300): [string, (value: string) => void] {
  const [query, setQuery] = useQueryState('query', { defaultValue })
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  const debouncedSetQuery = useCallback(
    debounce((newQuery: string) => setDebouncedQuery(newQuery), delay),
    [delay]
  )

  useEffect(() => {
    debouncedSetQuery(query)
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [query, debouncedSetQuery])

  return [debouncedQuery, setQuery]
}
