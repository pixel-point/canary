import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  useCreateBranchMutation,
  useCreateTagMutation,
  useDeleteTagMutation,
  useFindRepositoryQuery,
  useListBranchesQuery,
  useListTagsQuery
} from '@harnessio/code-service-client'
import { DeleteAlertDialog, useToast } from '@harnessio/ui/components'
import {
  CommitTagType,
  CreateBranchDialog,
  CreateBranchFormFields,
  CreateTagDialog,
  CreateTagFormFields,
  RepoTagsListView
} from '@harnessio/ui/views'

import { useRoutes } from '../../framework/context/NavigationContext'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { useQueryState } from '../../framework/hooks/useQueryState'
import usePaginationQueryStateWithStore from '../../hooks/use-pagination-query-state-with-store'
import { useTranslationStore } from '../../i18n/stores/i18n-store'
import { PathParams } from '../../RouteDefinitions'
import { PageResponseHeader } from '../../types'
import { useRepoBranchesStore } from './stores/repo-branches-store'
import { useRepoTagsStore } from './stores/repo-tags-store'
import { transformBranchList } from './transform-utils/branch-transform'

export const RepoTagsListContainer = () => {
  const repo_ref = useGetRepoRef()
  const { setTags, page, setPage, setPaginationFromHeaders } = useRepoTagsStore()
  const { setBranchList, setDefaultBranch, setSelectedBranchTag, branchList, setSpaceIdAndRepoId } =
    useRepoBranchesStore()
  const { spaceId, repoId } = useParams<PathParams>()
  const { t } = useTranslationStore()
  const { toast } = useToast()

  const routes = useRoutes()
  const [query, setQuery] = useQueryState('query')
  const [branchQuery, setBranchQuery] = useState('')

  const { queryPage } = usePaginationQueryStateWithStore({ page, setPage })

  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false)
  const [openCreateBranchDialog, setOpenCreateBranchDialog] = useState(false)
  const [deleteTagDialog, setDeleteTagDialog] = useState(false)
  const [deleteTagName, setDeleteTagName] = useState<string | null>(null)

  const [showToast, setShowToast] = useState(false)
  const [toastId, setToastId] = useState<string | null>(null)
  const [createdBranchName, setCreatedBranchName] = useState<string>('')

  const { data: { body: repository } = {} } = useFindRepositoryQuery({ repo_ref: repo_ref })

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

  const { data: { body: branches } = {} } = useListBranchesQuery({
    queryParams: {
      limit: 50,
      query: branchQuery ?? ''
    },
    repo_ref: repo_ref
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
        refetchTags()
      }
    }
  )

  const {
    mutateAsync: createBranch,
    error: createBranchError,
    isLoading: isCreatingBranch
  } = useCreateBranchMutation(
    {},
    {
      onSuccess: data => {
        setOpenCreateBranchDialog(false)
        setCreatedBranchName(data.body.name ?? '')
        setShowToast(true)
      }
    }
  )

  useEffect(() => {
    if (showToast && !toastId) {
      const { id } = toast({
        title: t('views:repos.branchCreated'),
        description: t('views:repos.branchCreatedDescription', { name: createdBranchName })
      })

      setToastId(id)
    }
  }, [showToast, toastId])

  useEffect(() => {
    setSpaceIdAndRepoId(spaceId || '', repoId || '')
  }, [spaceId, repoId, setSpaceIdAndRepoId])

  useEffect(() => {
    if (tagsList) {
      setTags(tagsList as CommitTagType[])
    }
  }, [tagsList, setTags])

  useEffect(() => {
    if (branches) {
      setBranchList(transformBranchList(branches, repository?.default_branch))
    }
  }, [branches, setBranchList, repository])

  useEffect(() => {
    setPaginationFromHeaders(
      parseInt(headers?.get(PageResponseHeader.xNextPage) ?? '0'),
      parseInt(headers?.get(PageResponseHeader.xPrevPage) ?? '0')
    )
  }, [headers, setPaginationFromHeaders])

  useEffect(() => {
    const defaultBranch = branchList?.find(branch => branch.default)
    setSelectedBranchTag({
      name: defaultBranch?.name || repository?.default_branch || '',
      sha: defaultBranch?.sha || '',
      default: true
    })
    setDefaultBranch(repository?.default_branch ?? '')
  }, [branchList, repository?.default_branch])

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

  const handleCreateBranch = async (data: CreateBranchFormFields) => {
    await createBranch({
      repo_ref,
      body: {
        ...data
      }
    })
  }

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
        useRepoTagsStore={useRepoTagsStore}
        open={openCreateTagDialog}
        onClose={() => setOpenCreateTagDialog(false)}
        onSubmit={onSubmit}
        branchQuery={branchQuery}
        setBranchQuery={setBranchQuery}
        useRepoBranchesStore={useRepoBranchesStore}
        isLoading={isCreatingTag}
        error={createTagError?.message}
      />
      <CreateBranchDialog
        open={openCreateBranchDialog}
        onClose={() => setOpenCreateBranchDialog(false)}
        useRepoBranchesStore={useRepoBranchesStore}
        onSubmit={handleCreateBranch}
        useTranslationStore={useTranslationStore}
        handleChangeSearchValue={setBranchQuery}
        error={createBranchError?.message}
        isCreatingBranch={isCreatingBranch}
      />
      <DeleteAlertDialog
        open={deleteTagDialog}
        onClose={() => setDeleteTagDialog(false)}
        deleteFn={onDeleteTag}
        error={{ type: '', message: '' }}
        type="tag"
        identifier={deleteTagName ?? undefined}
        isLoading={isDeletingTag}
        useTranslationStore={useTranslationStore}
      />
    </>
  )
}
