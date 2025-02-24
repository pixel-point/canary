import { useCallback, useEffect, useState } from 'react'

import { useCreateBranchMutation } from '@harnessio/code-service-client'
import { useToast } from '@harnessio/ui/components'
import {
  BranchSelectorListItem,
  CreateBranchDialog as CreateBranchDialogComp,
  CreateBranchFormFields
} from '@harnessio/ui/views'

import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { useTranslationStore } from '../i18n/stores/i18n-store'
import { BranchSelectorContainer } from './branch-selector-container'

interface CreateBranchDialogProps {
  open: boolean
  onClose: () => void
}

export const CreateBranchDialog = ({ open, onClose }: CreateBranchDialogProps) => {
  const repo_ref = useGetRepoRef()
  const { toast } = useToast()
  const { t } = useTranslationStore()
  const [selectedBranchOrTag, setSelectedBranchOrTag] = useState<BranchSelectorListItem | null>(null)

  const [showToast, setShowToast] = useState(false)
  const [toastId, setToastId] = useState<string | null>(null)

  const [createdBranchName, setCreatedBranchName] = useState<string>('')

  const selectBranchOrTag = useCallback((branchTagName: BranchSelectorListItem) => {
    setSelectedBranchOrTag(branchTagName)
  }, [])

  useEffect(() => {
    if (!open) {
      setShowToast(false)
      setToastId(null)
    }

    if (showToast && !toastId) {
      const { id } = toast({
        title: t('views:repos.branchCreated'),
        description: t('views:repos.branchCreatedDescription', { name: createdBranchName })
      })

      setToastId(id)
    }
  }, [createdBranchName, showToast, t, toast, toastId, open])

  const {
    mutateAsync: createBranch,
    error: createBranchError,
    isLoading: isCreatingBranch
  } = useCreateBranchMutation(
    {},
    {
      onSuccess: data => {
        onClose()
        setCreatedBranchName(data.body.name ?? '')
        setShowToast(true)
      }
    }
  )

  const handleCreateBranch = async (data: CreateBranchFormFields) => {
    await createBranch({
      repo_ref,
      body: {
        ...data
      }
    })
  }

  return (
    <CreateBranchDialogComp
      useTranslationStore={useTranslationStore}
      open={open}
      onClose={onClose}
      selectedBranchOrTag={selectedBranchOrTag}
      onSubmit={handleCreateBranch}
      isCreatingBranch={isCreatingBranch}
      error={createBranchError?.message}
      renderProp={() => (
        <BranchSelectorContainer onSelectBranchorTag={selectBranchOrTag} selectedBranch={selectedBranchOrTag} />
      )}
    />
  )
}
