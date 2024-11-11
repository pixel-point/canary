type BranchProps = {
  id: number | string
  name: string
  sha: string
  timestamp: string
  default?: boolean
  user: {
    name: string
    avatarUrl?: string
  }
  checks: {
    done?: number
    total?: number
    status?: number
  }
  behindAhead: {
    behind?: number
    ahead?: number
    default?: boolean
  }
}

export type { BranchProps }
