import cx from 'clsx'
import copy from 'clipboard-copy'
import { PipelineStudioToolbarActions, Topbar, VisualYamlToggle } from '@harnessio/views'
import { VisualYamlValue } from '../../../types/pipeline'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { createAndDownloadBlob } from '../../../utils/common-utils'

export const PipelineStudioToolbar = ({
  view,
  setView
}: {
  view: VisualYamlValue
  setView: (view: VisualYamlValue) => void
}) => {
  const {
    state: { isYamlValid, yamlRevision, pipelineData }
  } = usePipelineDataContext()

  return (
    <Topbar.Root className={cx({ ['border-b-0 bg-transparent']: view === 'visual' })}>
      <Topbar.Left>
        <VisualYamlToggle view={view} setView={setView} isYamlValid={isYamlValid} />
      </Topbar.Left>
      {/* <Topbar.Center>AITextEditor placeholder</Topbar.Center> */}
      {view === 'yaml' && (
        <Topbar.Right>
          <PipelineStudioToolbarActions
            onCopyClick={() => {
              copy(yamlRevision.yaml).then(() => {
                // TODO: toast
              })
            }}
            onDownloadClick={() => {
              createAndDownloadBlob(yamlRevision.yaml, `${pipelineData?.identifier}.yaml`)
            }}
          />
        </Topbar.Right>
      )}
    </Topbar.Root>
  )
}
