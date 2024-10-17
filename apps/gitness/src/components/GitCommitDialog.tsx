import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Spacer } from '@harnessio/canary'
import { GitCommitFormType } from '../types'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import {
  OpenapiCommitFilesRequest,
  TypesCommitFilesResponse,
  useCommitFilesMutation
} from '@harnessio/code-service-client'
import { CommitToGitRefOption, GitCommitForm } from './GitCommitForm'
import { GitCommitAction } from '../utils/git-utils'

interface CommitDialogProps {
  open: boolean
  onClose: () => void
  commitAction: GitCommitAction
  gitRef: string
  resourcePath: string
  payload?: string
  sha?: string
  onSuccess: (response: TypesCommitFilesResponse, isNewBranch: boolean) => void
}

export default function GitCommitDialog({
  open,
  onClose,
  commitAction,
  gitRef,
  resourcePath,
  payload,
  sha,
  onSuccess
}: CommitDialogProps) {
  const repoRef = useGetRepoRef()

  const { mutateAsync: commitChages } = useCommitFilesMutation({})

  const commitTitle = commitAction === GitCommitAction.DELETE ? 'Delete' : 'Edit'
  const commitTitlePlaceholder = commitTitle + ' ' + resourcePath

  const onSubmit = async (formValues: GitCommitFormType) => {
    const { message, description, commitToGitRef, newBranchName } = formValues

    try {
      const data: OpenapiCommitFilesRequest = {
        actions: [
          {
            action: commitAction,
            path: resourcePath,
            payload: payload,
            sha
          }
        ],
        branch: gitRef,
        new_branch: commitToGitRef === CommitToGitRefOption.NEW_BRANCH ? newBranchName : '',
        title: message || commitTitlePlaceholder,
        message: description,
        bypass_rules: false //check how this works
      }

      commitChages({
        repo_ref: repoRef,
        body: { ...data }
      }).then(response => {
        onSuccess(response, commitToGitRef === CommitToGitRefOption.NEW_BRANCH)
      })
    } catch (e) {
      console.log(e, 'error')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px]  bg-primary-background border-border">
        <DialogHeader>
          <DialogTitle>Commit Changes</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Spacer size={6} />
          <GitCommitForm onSubmit={onSubmit} onCancel={onClose} commitTitlePlaceHolder={commitTitlePlaceholder} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
