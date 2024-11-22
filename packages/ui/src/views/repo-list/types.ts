export interface RepositoryType {
  id: number
  name: string
  description?: string
  private: boolean
  stars: number
  forks: number
  pulls: number
  createdAt: number
  timestamp: string
}

export interface RepoListProps {
  repositories: RepositoryType[] | null
  setPage: (page: number) => void
  totalPages: number
  currentPage: number
}
