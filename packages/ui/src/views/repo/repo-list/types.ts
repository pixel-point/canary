import { RepositoryType } from '@views/repo/repo.types'
import { i18n, TFunction } from 'i18next'

export interface RepoStore {
  repositories: RepositoryType[] | null
  totalPages: number
  page: number
  importRepoIdentifier: string | null
  importToastId: string | null

  setImportToastId: (id: string | null) => void
  setPage: (page: number) => void
  setRepositories: (data: RepositoryType[], totalPages: number) => void
  updateRepository: (repo: RepositoryType) => void
  setImportRepoIdentifier: (identifier: string | null) => void
  addRepository: (repo: RepositoryType) => void
}

export interface TranslationStore {
  t: TFunction
  i18n: i18n
  changeLanguage: (lng: string) => void
}

export interface RoutingProps {
  toRepository: (repo: RepositoryType) => string
  toCreateRepo: () => string
  toImportRepo: () => string
  toImportMultipleRepos: () => string
}

/**
 * RoutingProps made optional for usage in apps/design-system
 */
export interface RepoListProps extends Partial<RoutingProps> {
  useRepoStore: () => RepoStore
  useTranslationStore: () => TranslationStore
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  searchQuery?: string | null
  setSearchQuery: (query: string | null) => void
}
