import { useMemo, useState } from 'react'

import { defaultTo } from 'lodash-es'

export const useClientTagsSearch = (tags: string[], selectedTags?: string[]) => {
  const [searchTag, setSearchTag] = useState('')
  const filteredTags = useMemo(() => {
    if (!searchTag && tags.length === 0) {
      return defaultTo(selectedTags, [])
    }

    if (!searchTag) return tags

    const search = searchTag.toLowerCase()

    return tags.filter(tag => tag.toLowerCase().includes(search))
  }, [searchTag, tags, selectedTags])

  const handleSearchChange = (value: string) => {
    setSearchTag(value)
  }

  return {
    searchTag,
    handleSearchChange,
    filteredTags
  }
}
