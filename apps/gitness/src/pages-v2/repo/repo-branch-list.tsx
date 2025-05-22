import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useQueryClient } from '@tanstack/react-query'

import {
  useCalculateCommitDivergenceMutation,
  useCreateBranchMutation,
  useDeleteBranchMutation,
  useFindRepositoryQuery,
  useListBranchesQuery
} from '@harnessio/code-service-client'
import { DeleteAlertDialog } from '@harnessio/ui/components'
import { CreateBranchFormFields, RepoBranchListView } from '@harnessio/ui/views'

import { CreateBranchDialog } from '../../components-v2/create-branch-dialog'
import { useRoutes } from '../../framework/context/NavigationContext'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { useQueryState } from '../../framework/hooks/useQueryState'
import usePaginationQueryStateWithStore from '../../hooks/use-pagination-query-state-with-store'
import { PathParams } from '../../RouteDefinitions'
import { orderSortDate, PageResponseHeader } from '../../types'
import { useRepoBranchesStore } from './stores/repo-branches-store'
import { transformBranchList } from './transform-utils/branch-transform'

export function RepoBranchesListPage() {
  const routes = useRoutes()
  const repoRef = useGetRepoRef()
  const { spaceId, repoId } = useParams<PathParams>()
  const queryClient = useQueryClient()

  const {
    page,
    setPage,
    setBranchList,
    setDefaultBranch,
    setSelectedBranchTag,
    setSpaceIdAndRepoId,
    setPaginationFromHeaders,
    branchList
  } = useRepoBranchesStore()

  const [query, setQuery] = useQueryState('query')
  const [createBranchSearchQuery, setCreateBranchSearchQuery] = useState('')
  const { queryPage } = usePaginationQueryStateWithStore({ page, setPage })

  const [isCreateBranchDialogOpen, setCreateBranchDialogOpen] = useState(false)
  const [deleteBranchName, setDeleteBranchName] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { data: { body: repoMetadata } = {} } = useFindRepositoryQuery({ repo_ref: repoRef })

  const { isLoading: isLoadingBranches, data: { body: branches, headers } = {} } = useListBranchesQuery({
    queryParams: {
      page: queryPage,
      limit: 10,
      query: query ?? '',
      order: orderSortDate.DESC,
      sort: 'date',
      include_commit: true,
      include_pullreqs: true,
      include_checks: true
    },
    repo_ref: repoRef
  })

  const { data: { body: searchBranches } = {} } = useListBranchesQuery({
    queryParams: {
      query: createBranchSearchQuery,
      limit: 10,
      order: orderSortDate.DESC
    },
    repo_ref: repoRef
  })

  const {
    isLoading: isLoadingDivergence,
    data: { body: _branchDivergence = [] } = {},
    mutate: calculateBranchDivergence
  } = useCalculateCommitDivergenceMutation(
    { repo_ref: repoRef },
    {
      onSuccess: data => {
        if (data.body && branches) {
          setBranchList(transformBranchList(branches, repoMetadata?.default_branch, data.body))
        }
      }
    }
  )

  const handleInvalidateBranchList = () => {
    queryClient.invalidateQueries({ queryKey: ['listBranches'] })
  }

  const handleResetDeleteBranch = () => {
    setDeleteBranchName(null)
    setIsDeleteDialogOpen(false)
    if (deleteBranchError) {
      resetDeleteBranch()
    }
  }

  const handleSetDeleteBranch = (branchName: string) => {
    setDeleteBranchName(branchName)
    setIsDeleteDialogOpen(true)
  }

  const {
    mutateAsync: deleteBranch,
    isLoading: isDeletingBranch,
    error: deleteBranchError,
    reset: resetDeleteBranch
  } = useDeleteBranchMutation(
    { repo_ref: repoRef },
    {
      onSuccess: () => {
        setIsDeleteDialogOpen(false)
        handleResetDeleteBranch()
        handleInvalidateBranchList()
      }
    }
  )

  const { mutateAsync: saveBranch, isLoading: isCreatingBranch, error: createBranchError } = useCreateBranchMutation({})

  const onSubmit = async (formValues: CreateBranchFormFields) => {
    const { name, target } = formValues
    await saveBranch({ repo_ref: repoRef, body: { name, target, bypass_rules: false } })
    handleInvalidateBranchList()
    setCreateBranchDialogOpen(false)
  }

  const handleDeleteBranch = (branch_name: string) => {
    deleteBranch({ branch_name, queryParams: {} })
  }

  useEffect(() => {
    setPaginationFromHeaders(
      parseInt(headers?.get(PageResponseHeader.xNextPage) || ''),
      parseInt(headers?.get(PageResponseHeader.xPrevPage) || '')
    )
  }, [headers, setPaginationFromHeaders])

  useEffect(() => {
    if (!branches) return

    if (branches?.length === 0) {
      return setBranchList([])
    }

    calculateBranchDivergence({
      body: { requests: branches?.map(branch => ({ from: branch.name, to: repoMetadata?.default_branch })) || [] }
    })
  }, [calculateBranchDivergence, branches, repoMetadata?.default_branch])

  useEffect(() => {
    setSpaceIdAndRepoId(spaceId || '', repoId || '')
  }, [spaceId, repoId, setSpaceIdAndRepoId])

  // useEffect(() => {
  //   setDefaultBranch(repoMetadata?.default_branch || '')
  // }, [repoMetadata, setDefaultBranch])

  useEffect(() => {
    const defaultBranch = branchList?.find(branch => branch.default)
    setSelectedBranchTag({
      name: defaultBranch?.name || repoMetadata?.default_branch || '',
      sha: defaultBranch?.sha || '',
      default: true
    })
    setDefaultBranch(repoMetadata?.default_branch ?? '')
  }, [branchList, repoMetadata?.default_branch])

  return (
    <>
      <RepoBranchListView
        isLoading={isLoadingBranches || isLoadingDivergence}
        isCreatingBranch={isCreatingBranch}
        onSubmit={onSubmit}
        useRepoBranchesStore={useRepoBranchesStore}
        isCreateBranchDialogOpen={isCreateBranchDialogOpen}
        setCreateBranchDialogOpen={setCreateBranchDialogOpen}
        searchQuery={query}
        setSearchQuery={setQuery}
        createBranchError={createBranchError?.message}
        // toBranchRules={() => routes.toRepoBranchRules({ spaceId, repoId })}
        toPullRequestCompare={({ diffRefs }: { diffRefs: string }) =>
          routes.toPullRequestCompare({ spaceId, repoId, diffRefs })
        }
        toPullRequest={({ pullRequestId }: { pullRequestId: number }) =>
          routes.toPullRequest({ spaceId, repoId, pullRequestId: pullRequestId.toString() })
        }
        toCode={({ branchName }: { branchName: string }) => `${routes.toRepoFiles({ spaceId, repoId })}/${branchName}`}
        onDeleteBranch={handleSetDeleteBranch}
        searchBranches={searchBranches || []}
        setCreateBranchSearchQuery={setCreateBranchSearchQuery}
      />

      <CreateBranchDialog
        open={isCreateBranchDialogOpen}
        onClose={() => setCreateBranchDialogOpen(false)}
        onSuccess={handleInvalidateBranchList}
      />

      <DeleteAlertDialog
        open={isDeleteDialogOpen}
        onClose={handleResetDeleteBranch}
        deleteFn={handleDeleteBranch}
        error={deleteBranchError ? { message: deleteBranchError?.message ?? '' } : null}
        type="branch"
        identifier={deleteBranchName ?? undefined}
        isLoading={isDeletingBranch}
      />
    </>
  )
}
