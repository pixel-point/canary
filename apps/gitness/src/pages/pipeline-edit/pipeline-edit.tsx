import { YamlEditorContextProvider } from '@harnessio/yaml-editor'
import PipelineStudio from './components/pipeline-studio'
import PipelineStudioDataProvider from './context/PipelineStudioDataProvider'
import PipelineStudioViewProvider from './context/PipelineStudioViewProvider'

const PipelineEditPage = (): JSX.Element => {
  return (
    <YamlEditorContextProvider>
      <PipelineStudioDataProvider>
        <PipelineStudioViewProvider>
          <PipelineStudio />
        </PipelineStudioViewProvider>
      </PipelineStudioDataProvider>
    </YamlEditorContextProvider>
  )
}

export default PipelineEditPage
