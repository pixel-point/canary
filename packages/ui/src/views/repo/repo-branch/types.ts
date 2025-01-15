import { TranslationStore } from '@/views'
import { z } from 'zod'

import { PullRequestType } from '../pull-request/pull-request.types'
import { IBranchSelectorStore } from '../repo.types'
import { createBranchFormSchema } from './components/create-branch-dialog'

export type CreateBranchFormFields = z.infer<typeof createBranchFormSchema>

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
  behindAhead: {
    behind?: number
    ahead?: number
    default?: boolean
  }
  pullRequests?: PullRequestType[]
}

export interface BranchListPageProps {
  isLoading: boolean
  branches: BranchProps[]
  spaceId?: string
  repoId?: string
  defaultBranch?: string
  useTranslationStore: () => TranslationStore
}

export interface MoreActionsTooltipProps {
  spaceId?: string
  repoId?: string
  defaultBranch?: string
  branchInfo: BranchProps
  useTranslationStore: () => TranslationStore
}

export interface RepoBranchListViewProps {
  isLoading: boolean
  useRepoBranchesStore: () => IBranchSelectorStore
  useTranslationStore: () => TranslationStore
  isCreateBranchDialogOpen: boolean
  setCreateBranchDialogOpen: (isOpen: boolean) => void
  onSubmit: (formValues: CreateBranchFormFields) => void
  isCreatingBranch: boolean
  createBranchError?: string
  searchQuery: string | null
  setSearchQuery: (query: string | null) => void
}

interface Branch {
  name?: string
}

export interface CreateBranchDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (formValues: CreateBranchFormFields) => void
  isLoadingBranches: boolean
  branches?: Array<Branch>
  error?: string
  isCreatingBranch?: boolean
  useTranslationStore: () => TranslationStore
  defaultBranch?: string
}
