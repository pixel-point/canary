import { useCallback, useEffect, useRef, useState } from 'react'

import { resolve } from 'path'

import { defaultTo, isEqual } from 'lodash-es'

const TAGS_MOCK = [
  'myrunner',
  'macos-arm64',
  'west1-delegate-qa',
  'linux-amd64',
  'eightfivetwo',
  'automation-eks-delegate'
]

export const useBackendTagsSearch = (tags: string[], selectedTags?: string[]) => {
  const [searchTag, setSearchTag] = useState<string>('')
  const [filteredTags, setFilteredTags] = useState<string[]>(() => defaultTo(selectedTags, []))
  const [loadingTags, setLoadingTags] = useState<boolean>(false)
  const latestQueryRef = useRef<string>('')

  const fetchTagsFromBackend = useCallback(
    (searchQuery: string): Promise<string[]> => {
      return new Promise(resolve => {
        console.log(`Fetching tags from backend... Query is ${searchQuery}`)
        const tagsToResolve = tags.length === 0 ? TAGS_MOCK : tags

        setTimeout(
          () => {
            if (searchQuery === '') {
              resolve(tags)
            } else {
              const tagsToResolveFiltered = tagsToResolve.filter(tag =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
              )
              resolve(tagsToResolveFiltered)
            }
          },
          Math.floor(Math.random() * 3000)
        )
      })
    },
    [tags]
  )

  useEffect(() => {
    const searchQuery = searchTag.trim()

    if (searchQuery === latestQueryRef.current) {
      return
    }

    latestQueryRef.current = searchQuery

    setLoadingTags(true)

    fetchTagsFromBackend(searchQuery)
      .then(resolvedTags => {
        setFilteredTags(prev => {
          if (searchQuery === '' && resolvedTags.length === 0 && selectedTags) {
            return selectedTags
          }

          if (isEqual(prev, resolvedTags)) {
            return prev
          }

          return resolvedTags
        })
      })
      .finally(() => {
        setLoadingTags(false)
      })
  }, [searchTag, tags, selectedTags, fetchTagsFromBackend])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTag(value)
  }, [])

  return {
    searchTag,
    filteredTags,
    handleSearchChange,
    loadingTags
  }
}
