import { ReactNode, useMemo } from 'react'

import { Button, FileAdditionsTrigger, NoData, PathBreadcrumbs, PathParts, SkeletonList } from '@/components'
import { CodeModes, LatestFileTypes, RepoFile, SandboxLayout, TranslationStore } from '@/views'
import { FileLastChangeBar, Summary } from '@/views/repo/components'

interface RepoFilesProps {
  pathParts: PathParts[]
  loading: boolean
  files: RepoFile[]
  isDir: boolean
  isShowSummary: boolean
  latestFile: LatestFileTypes
  children: ReactNode
  useTranslationStore: () => TranslationStore
  pathNewFile: string
  pathUploadFiles: string
  codeMode: CodeModes
  changeFileName: (value: string) => void
  gitRefName: string
  handleOpenCommitDialog: () => void
}

export const RepoFiles = ({
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
  changeFileName,
  gitRefName,
  handleOpenCommitDialog
}: RepoFilesProps) => {
  // const isView = codeMode === CodeModes.VIEW
  const isView = false

  const content = useMemo(() => {
    if (!isDir)
      return (
        <>
          <FileLastChangeBar useTranslationStore={useTranslationStore} {...latestFile} />
          {children}
        </>
      )

    if (loading) return <SkeletonList />

    if (isShowSummary && files.length)
      return <Summary latestFile={latestFile} files={files} useTranslationStore={useTranslationStore} />

    return (
      <NoData
        insideTabView
        iconName="no-data-folder"
        title="No files yet"
        description={['There are no files in this repository yet.', 'Create new or import an existing file.']}
        primaryButton={{ label: 'Create file' }}
        secondaryButton={{ label: 'Import file' }}
      />
    )
  }, [isDir, children, loading, isShowSummary, latestFile, files, useTranslationStore])

  return (
    <SandboxLayout.Main leftSubPanelWidth={248} fullWidth hasLeftPanel hasLeftSubPanel hasHeader hasSubHeader>
      <SandboxLayout.Content>
        <div className="mb-4 flex h-8 items-center justify-between gap-8">
          <PathBreadcrumbs
            isEdit={codeMode === CodeModes.EDIT}
            isNew={codeMode === CodeModes.NEW}
            items={pathParts}
            changeFileName={changeFileName}
            gitRefName={gitRefName}
          />
          {isView ? (
            <FileAdditionsTrigger
              useTranslationStore={useTranslationStore}
              pathNewFile={pathNewFile}
              pathUploadFiles={pathUploadFiles}
            />
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
              >
                Cancel changes
              </Button>
              <Button onClick={handleOpenCommitDialog}>
                Commit changes
              </Button>
            </div>
          )}
        </div>
        {content}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
