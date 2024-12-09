import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { OpenapiGetContentOutput } from '@harnessio/code-service-client'
import { FileViewerControlBar, MarkdownViewer, ViewTypeValue } from '@harnessio/ui/components'
import { CodeEditor } from '@harnessio/yaml-editor'

import GitBlame from '../components/GitBlame'
import { useDownloadRawFile } from '../framework/hooks/useDownloadRawFile'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { themes } from '../pages/pipeline-edit/theme/monaco-theme'
import { PathParams } from '../RouteDefinitions'
import { decodeGitContent, filenameToLanguage, formatBytes } from '../utils/git-utils'

const getIsMarkdown = (language?: string) => language === 'markdown'

const getDefaultView = (language?: string): ViewTypeValue => {
  return getIsMarkdown(language) ? 'preview' : 'code'
}

interface FileContentViewerProps {
  repoContent?: OpenapiGetContentOutput
  handleOpenCommitDialog: () => void
}

/**
 * TODO: This code was migrated from V2 and needs to be refactored.
 */
export default function FileContentViewer({
  repoContent,
  handleOpenCommitDialog
}: FileContentViewerProps) {
  const fileName = repoContent?.name || ''
  const language = filenameToLanguage(fileName) || ''
  const fileContent = decodeGitContent(repoContent?.content?.data)
  const repoRef = useGetRepoRef()
  const { spaceId, repoId, gitRef, resourcePath } = useParams<PathParams>()
  const subResourcePath = useParams()['*'] || ''
  const fullResourcePath = subResourcePath ? resourcePath + '/' + subResourcePath : resourcePath
  const downloadFile = useDownloadRawFile()
  const navigate = useNavigate()
  const rawURL = `/api/v1/repos/${repoRef}/raw/${fullResourcePath}?git_ref=${gitRef}`
  const [view, setView] = useState<ViewTypeValue>(getDefaultView(language))

  const onChangeView = (value: ViewTypeValue) => {
    setView(value)
  }

  useEffect(() => {
    setView(getDefaultView(language))
  }, [language])

  const themeConfig = useMemo(
    () => ({
      defaultTheme: 'dark',
      themes
    }),
    []
  )

  const handleDownloadFile = () => {
    downloadFile({
      repoRef,
      resourcePath: fullResourcePath || '',
      gitRef: gitRef || ''
    })
  }

  const handleEditFile = () => {
    navigate(`/${spaceId}/repos/${repoId}/code/edit/${gitRef}/~/${fullResourcePath}`)
  }

  const CodeView = useMemo(
    () => (
      <CodeEditor
        language={language}
        codeRevision={{ code: fileContent }}
        onCodeRevisionChange={() => {}}
        themeConfig={themeConfig}
        options={{
          readOnly: true
        }}
      />
    ),
    [language, fileContent, themeConfig]
  )

  return (
    <>
      <FileViewerControlBar
        view={view}
        onChangeView={onChangeView}
        isMarkdown={getIsMarkdown(language)}
        fileBytesSize={formatBytes(repoContent?.content?.size || 0)}
        fileContent={fileContent}
        url={rawURL}
        handleDownloadFile={handleDownloadFile}
        handleEditFile={handleEditFile}
        handleOpenDeleteDialog={handleOpenCommitDialog}
      />

      {language === 'markdown' && view === 'preview' ? (
        <MarkdownViewer source={fileContent} withBorderWrapper />
      ) : view === 'code' ? (
        CodeView
      ) : (
        <GitBlame
          selectedBranch={gitRef || ''}
          themeConfig={themeConfig}
          codeContent={fileContent}
          language={language}
        />
      )}
    </>
  )
}
