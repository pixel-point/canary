import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  DeleteTagErrorResponse,
  useCreateTagMutation,
  useDeleteTagMutation,
  useListTagsQuery
} from '@harnessio/code-service-client'
import { DeleteAlertDialog, DeleteAlertDialogProps } from '@harnessio/ui/components'
import {
  BranchSelectorListItem,
  CommitTagType,
  CreateTagDialog,
  CreateTagFormFields,
  RepoTagsListView
} from '@harnessio/ui/views'

import { BranchSelectorContainer } from '../../components-v2/branch-selector-container'
import { CreateBranchDialog } from '../../components-v2/create-branch-dialog'
import { useRoutes } from '../../framework/context/NavigationContext'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { useQueryState } from '../../framework/hooks/useQueryState'
import usePaginationQueryStateWithStore from '../../hooks/use-pagination-query-state-with-store'
import { useTranslationStore } from '../../i18n/stores/i18n-store'
import { PathParams } from '../../RouteDefinitions'
import { PageResponseHeader } from '../../types'
import { useRepoTagsStore } from './stores/repo-tags-store'

export const RepoTagsListContainer = () => {
  const repo_ref = useGetRepoRef()
  const { page, setPage, setPaginationFromHeaders, setTags } = useRepoTagsStore()
  const { spaceId, repoId } = useParams<PathParams>()

  const routes = useRoutes()
  const [query, setQuery] = useQueryState('query')

  const { queryPage } = usePaginationQueryStateWithStore({ page, setPage })

  const [selectedBranchOrTag, setSelectedBranchOrTag] = useState<BranchSelectorListItem | null>(null)

  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false)
  const [openCreateBranchDialog, setOpenCreateBranchDialog] = useState(false)
  const [deleteTagDialog, setDeleteTagDialog] = useState(false)
  const [deleteTagName, setDeleteTagName] = useState<string | null>(null)

  const [deleteError, setDeleteError] = useState<DeleteAlertDialogProps['error']>(null)

  const {
    data: { body: tagsList, headers } = {},
    isLoading: isLoadingTags,
    refetch: refetchTags
  } = useListTagsQuery({
    repo_ref: repo_ref,
    queryParams: {
      query: query ?? '',
      page: queryPage,
      limit: 10
    }
  })

  const {
    mutate: createTag,
    isLoading: isCreatingTag,
    error: createTagError
  } = useCreateTagMutation(
    { repo_ref: repo_ref },
    {
      onSuccess: () => {
        setOpenCreateTagDialog(false)
        refetchTags()
      }
    }
  )

  const { mutate: deleteTag, isLoading: isDeletingTag } = useDeleteTagMutation(
    { repo_ref: repo_ref },
    {
      onSuccess: () => {
        setDeleteTagDialog(false)
        setDeleteError(null)
        refetchTags()
      },
      onError: (error: DeleteTagErrorResponse) => {
        const deleteErrorMsg = error?.message || 'An unknown error occurred.'
        setDeleteError({ message: deleteErrorMsg })
      }
    }
  )

  useEffect(() => {
    if (tagsList) {
      setTags(tagsList as CommitTagType[])
    }
  }, [tagsList, setTags])

  useEffect(() => {
    setPaginationFromHeaders(
      parseInt(headers?.get(PageResponseHeader.xNextPage) ?? '0'),
      parseInt(headers?.get(PageResponseHeader.xPrevPage) ?? '0')
    )
  }, [headers, setPaginationFromHeaders])

  const onSubmit = (data: CreateTagFormFields) => {
    createTag({
      body: {
        ...data
      }
    })
  }

  const onDeleteTag = (tagName: string) => {
    deleteTag({
      tag_name: tagName,
      queryParams: {}
    })
  }

  const selectBranchOrTag = useCallback(
    (branchTagName: BranchSelectorListItem) => {
      setSelectedBranchOrTag(branchTagName)
    },
    [repoId, spaceId]
  )

  return (
    <>
      <RepoTagsListView
        useTranslationStore={useTranslationStore}
        isLoading={isLoadingTags}
        openCreateBranchDialog={() => setOpenCreateBranchDialog(true)}
        openCreateTagDialog={() => setOpenCreateTagDialog(true)}
        searchQuery={query}
        setSearchQuery={setQuery}
        onDeleteTag={(tagName: string) => {
          setDeleteTagDialog(true)
          setDeleteTagName(tagName)
        }}
        useRepoTagsStore={useRepoTagsStore}
        toCommitDetails={({ sha }: { sha: string }) => routes.toRepoCommitDetails({ spaceId, repoId, commitSHA: sha })}
      />
      <CreateTagDialog
        useTranslationStore={useTranslationStore}
        open={openCreateTagDialog}
        onClose={() => setOpenCreateTagDialog(false)}
        onSubmit={onSubmit}
        isLoading={isCreatingTag}
        error={createTagError?.message}
        selectedBranchOrTag={selectedBranchOrTag}
        renderProp={() => (
          <BranchSelectorContainer onSelectBranchorTag={selectBranchOrTag} selectedBranch={selectedBranchOrTag} />
        )}
      />
      <CreateBranchDialog open={openCreateBranchDialog} onClose={() => setOpenCreateBranchDialog(false)} />
      <DeleteAlertDialog
        open={deleteTagDialog}
        onClose={() => setDeleteTagDialog(false)}
        deleteFn={onDeleteTag}
        error={deleteError}
        type="tag"
        identifier={deleteTagName ?? undefined}
        isLoading={isDeletingTag}
        useTranslationStore={useTranslationStore}
      />
    </>
  )
}
