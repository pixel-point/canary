import { YamlEditorContextProvider } from '@harnessio/yaml-editor'
import PipelineStudio from './components/pipeline-studio'
import PipelineStudioDataProvider from './context/PipelineStudioDataProvider'
import PipelineStudioViewProvider from './context/PipelineStudioViewProvider'
import { SandboxLayout } from '@harnessio/playground'

const PipelineEditPage = (): JSX.Element => {
  return (
    <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel fullWidth>
      <SandboxLayout.Content className="p-0">
        <YamlEditorContextProvider>
          <PipelineStudioDataProvider>
            <PipelineStudioViewProvider>
              <PipelineStudio />
            </PipelineStudioViewProvider>
          </PipelineStudioDataProvider>
        </YamlEditorContextProvider>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export default PipelineEditPage
