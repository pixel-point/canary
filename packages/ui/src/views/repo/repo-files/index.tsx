import { FC, ReactNode, useMemo } from 'react'

import { NoData, PathParts, SkeletonList, Spacer } from '@/components'
import {
  BranchInfoBar,
  CodeModes,
  CommitDivergenceType,
  FileLastChangeBar,
  IBranchSelectorStore,
  LatestFileTypes,
  PathActionBar,
  RepoFile,
  SandboxLayout,
  Summary,
  TranslationStore
} from '@/views'

interface RepoFilesProps {
  pathParts: PathParts[]
  loading: boolean
  files: RepoFile[]
  isDir: boolean
  isRepoEmpty?: boolean
  isShowSummary: boolean
  latestFile: LatestFileTypes
  children: ReactNode
  useTranslationStore: () => TranslationStore
  pathNewFile: string
  pathUploadFiles: string
  codeMode: CodeModes
  useRepoBranchesStore: () => IBranchSelectorStore
  defaultBranchName?: string
  currentBranchDivergence: CommitDivergenceType
  toCommitDetails?: ({ sha }: { sha: string }) => string
  isLoadingRepoDetails: boolean
}

export const RepoFiles: FC<RepoFilesProps> = ({
  pathParts,
  loading,
  files,
  isDir,
  isShowSummary,
  latestFile,
  children,
  useTranslationStore,
  pathNewFile,
  pathUploadFiles,
  codeMode,
  useRepoBranchesStore,
  defaultBranchName,
  currentBranchDivergence,
  isRepoEmpty,
  toCommitDetails,
  isLoadingRepoDetails
}) => {
  const { selectedBranchTag } = useRepoBranchesStore()
  const { t } = useTranslationStore()

  const isView = useMemo(() => codeMode === CodeModes.VIEW, [codeMode])

  const content = useMemo(() => {
    if (loading) return <SkeletonList />

    if (!isView) return children

    if (isRepoEmpty) {
      return <p>{t('views:repos.emptyRepo')}</p>
    }

    if (!isDir) {
      return (
        <>
          {!isLoadingRepoDetails && (
            <>
              <FileLastChangeBar
                toCommitDetails={toCommitDetails}
                useTranslationStore={useTranslationStore}
                {...latestFile}
              />
              <Spacer size={4} />
            </>
          )}
          {children}
        </>
      )
    }

    if (isShowSummary && files.length)
      return (
        <>
          {selectedBranchTag.name !== defaultBranchName && (
            <>
              <BranchInfoBar
                defaultBranchName={defaultBranchName}
                useRepoBranchesStore={useRepoBranchesStore}
                currentBranchDivergence={{
                  ahead: currentBranchDivergence.ahead || 0,
                  behind: currentBranchDivergence.behind || 0
                }}
              />
              <Spacer size={4} />
            </>
          )}
          <Summary
            toCommitDetails={toCommitDetails}
            latestFile={latestFile}
            files={files}
            useTranslationStore={useTranslationStore}
          />
        </>
      )

    return (
      <NoData
        withBorder
        iconName="no-data-folder"
        title="No files yet"
        description={['There are no files in this repository yet.', 'Create new or import an existing file.']}
        primaryButton={{ label: 'Create file' }}
        secondaryButton={{ label: 'Import file' }}
      />
    )
  }, [
    isView,
    children,
    isDir,
    useTranslationStore,
    latestFile,
    loading,
    isShowSummary,
    files,
    selectedBranchTag.name,
    defaultBranchName,
    useRepoBranchesStore,
    currentBranchDivergence.ahead,
    currentBranchDivergence.behind,
    isLoadingRepoDetails,
    isRepoEmpty,
    t,
    toCommitDetails
  ])

  return (
    <SandboxLayout.Main fullWidth>
      <SandboxLayout.Content className="flex h-full flex-col pt-4">
        {isView && !isRepoEmpty && (
          <PathActionBar
            codeMode={codeMode}
            pathParts={pathParts}
            useTranslationStore={useTranslationStore}
            pathNewFile={pathNewFile}
            pathUploadFiles={pathUploadFiles}
          />
        )}
        {content}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
