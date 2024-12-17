import { CodeModes } from '@harnessio/ui/views'

import { RepoFilesWrapper } from './components/repo-files-wrapper.tsx'

export const RepoFilesList = () => {
  return <RepoFilesWrapper codeMode={CodeModes.VIEW} isDir />
}