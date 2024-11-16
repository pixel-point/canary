import { formatDistanceToNow } from 'date-fns'
import type { Repository } from '../../../types/repository'
import type { FilterValue, SortValue } from '../types'

/**
 * Filters repositories based on active filters
 *
 * @param repos - Array of repositories to filter
 * @param activeFilters - Array of active filter configurations
 * @returns Filtered array of repositories
 *
 * Filter types:
 * - 'type': Filters by repository type (public, private, fork)
 *   - Supports 'is' and 'is_not' conditions
 *   - Ignores empty filters
 * - 'created_time': Filters by repository creation date
 *   - Supports 'is', 'is_before', 'is_after', 'is_between' conditions
 *   - Handles empty date cases
 */
const getFilteredRepos = (repos: Repository[], activeFilters: FilterValue[]): Repository[] => {
  if (activeFilters.length === 0) return repos

  return repos.filter(repo => {
    return activeFilters.every(filter => {
      switch (filter.type) {
        case 'type': {
          if (filter.condition === 'is_empty' || filter.condition === 'is_not_empty') {
            return true
          }

          if (filter.selectedValues.length === 0) {
            return true
          }

          const isPrivate = repo.private
          const isPublic = !repo.private
          const isFork = repo.forks > 0

          const matchesType = filter.selectedValues.some(value => {
            switch (value) {
              case 'private':
                return isPrivate
              case 'public':
                return isPublic
              case 'fork':
                return isFork
              default:
                return false
            }
          })

          return filter.condition === 'is' ? matchesType : !matchesType
        }

        case 'created_time': {
          if (filter.selectedValues.length === 0) {
            return true
          }

          if (filter.condition === 'is_empty') {
            return !repo.createdAt
          }
          if (filter.condition === 'is_not_empty') {
            return !!repo.createdAt
          }

          const createdDate = new Date(repo.createdAt)
          const selectedDate = new Date(filter.selectedValues[0])

          createdDate.setHours(0, 0, 0, 0)
          selectedDate.setHours(0, 0, 0, 0)

          switch (filter.condition) {
            case 'is':
              return createdDate.getTime() === selectedDate.getTime()
            case 'is_before':
              return createdDate.getTime() < selectedDate.getTime()
            case 'is_after':
              return createdDate.getTime() > selectedDate.getTime()
            case 'is_between': {
              if (filter.selectedValues.length !== 2) return true
              const endDate = new Date(filter.selectedValues[1])
              endDate.setHours(0, 0, 0, 0)
              return createdDate.getTime() >= selectedDate.getTime() && createdDate.getTime() <= endDate.getTime()
            }
            default:
              return true
          }
        }

        default:
          return true
      }
    })
  })
}

/**
 * Sorts repositories based on active sort configurations
 *
 * @param repos - Array of repositories to sort
 * @param activeSorts - Array of sort configurations in priority order
 * @returns Sorted array of repositories
 *
 * Sort types:
 * - 'updated': Sort by creation timestamp
 * - 'stars': Sort by number of stars
 * - 'forks': Sort by number of forks
 * - 'pulls': Sort by number of pull requests
 * - 'title': Sort alphabetically by name
 *
 * Each sort supports 'asc' and 'desc' directions
 * Multiple sorts are applied in priority order (first has highest priority)
 */
const getSortedRepos = (repos: Repository[], activeSorts: SortValue[]): Repository[] => {
  return [...repos].sort((a, b) => {
    for (const sort of activeSorts) {
      const direction = sort.direction === 'asc' ? 1 : -1
      let comparison = 0

      switch (sort.type) {
        case 'updated':
          comparison = (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) * direction
          break
        case 'stars':
          comparison = (b.stars - a.stars) * direction
          break
        case 'forks':
          comparison = (b.forks - a.forks) * direction
          break
        case 'pulls':
          comparison = (b.pulls - a.pulls) * direction
          break
        case 'title':
          comparison = a.name.localeCompare(b.name) * direction
          break
      }

      if (comparison !== 0) {
        return comparison
      }
    }

    return 0
  })
}

/**
 * Formats repository dates into relative time strings
 *
 * @param repos - Array of repositories to format
 * @returns Array of repositories with added timestamp property
 *
 * Adds a 'timestamp' property to each repository with a formatted
 * relative time string (e.g. "2 days ago", "1 month ago")
 * Removes "about " prefix from the formatted string
 */
const getFormattedReposWithDate = (repos: Repository[]): Repository[] => {
  return repos.map(repo => ({
    ...repo,
    timestamp: formatDistanceToNow(new Date(repo.createdAt), {
      addSuffix: true,
      includeSeconds: true
    }).replace('about ', '')
  }))
}

export { getFilteredRepos, getSortedRepos, getFormattedReposWithDate }
