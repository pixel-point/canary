import { Dispatch, SetStateAction } from 'react'

import { z } from 'zod'

import { PullRequestType } from '../pull-request/pull-request.types'
import { BranchSelectorListItem, IBranchSelectorStore } from '../repo.types'
import { createBranchFormSchema } from './components/create-branch-dialog'

export type CreateBranchFormFields = z.infer<ReturnType<typeof createBranchFormSchema>>
export interface BranchProps {
  id: number
  name: string
  sha: string
  timestamp: string
  user: {
    name: string
    avatarUrl?: string
  }
  checks?: {
    done?: number
    total?: number
    status?: {
      pending: number
      running: number
      success: number
      failure: number
      error: number
    }
  }
  behindAhead?: {
    behind?: number
    ahead?: number
    default?: boolean
  }
  pullRequests?: PullRequestType[]
}

interface RoutingProps {
  toBranchRules: () => string
  toPullRequestCompare: ({ diffRefs }: { diffRefs: string }) => string
  toPullRequest: ({ pullRequestId }: { pullRequestId: number }) => string
  toCode: ({ branchName }: { branchName: string }) => string
}

export interface BranchListPageProps extends Partial<RoutingProps> {
  isLoading: boolean
  branches: BranchProps[]
  defaultBranch?: string
  setCreateBranchDialogOpen: (isOpen: boolean) => void
  handleResetFiltersAndPages: () => void
  onDeleteBranch: (branchName: string) => void
  isDirtyList: boolean
}

export interface RepoBranchListViewProps extends Partial<RoutingProps> {
  isLoading: boolean
  useRepoBranchesStore: () => IBranchSelectorStore
  isCreateBranchDialogOpen: boolean
  setCreateBranchDialogOpen: (isOpen: boolean) => void
  onSubmit: (formValues: CreateBranchFormFields) => Promise<void>
  isCreatingBranch: boolean
  createBranchError?: string
  searchQuery: string | null
  setSearchQuery: (query: string | null) => void
  onDeleteBranch: (branchName: string) => void
  searchBranches: Branch[]
  setCreateBranchSearchQuery: Dispatch<SetStateAction<string>>
}

interface Branch {
  name?: string
}

export interface CreateBranchDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (formValues: CreateBranchFormFields) => Promise<void>
  error?: string
  isCreatingBranch?: boolean
  selectedBranchOrTag: BranchSelectorListItem | null
  renderProp: React.ReactNode
  prefilledName?: string
}
