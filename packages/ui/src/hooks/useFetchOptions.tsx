import { useEffect, useRef, useState } from 'react'

export interface UseFetchOptionsParams<T> {
  searchValue: string
  fetchOptions: (query: string) => Promise<T[]>
}

export interface UseFetchOptionsResult<T> {
  options: T[]
  isLoading: boolean
  error: Error | null
}

export function useFetchOptions<T>({ searchValue, fetchOptions }: UseFetchOptionsParams<T>): UseFetchOptionsResult<T> {
  const [options, setOptions] = useState<T[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await fetchOptions(searchValue)
        if (!controller.signal.aborted) {
          setOptions(result)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
          setOptions([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [searchValue, fetchOptions])

  return {
    options,
    isLoading,
    error
  }
}
