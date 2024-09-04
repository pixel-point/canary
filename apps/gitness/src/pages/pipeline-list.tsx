import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'
import { PipelineList } from '@harnessio/playground'

export default function Pipelines() {
  const { data: pipelines } = useListPipelinesQuery(
    {
      repo_ref: 'workspace/repo/+',
      queryParams: { page: 0, limit: 10, query: '', latest: true }
    },
    /* To enable mock data */
    {
      placeholderData: { content: [{ identifier: 'pipeline1' }, { identifier: 'pipeline2' }] },
      enabled: true
    }
  )

  return (
    <div className="flex flex-col justify-center">
      <h1>Pipelines</h1>
      <PipelineList
        pipelines={pipelines?.content?.map((item: TypesPipeline) => ({
          id: item?.id,
          success: item?.execution?.status === 'success',
          name: item?.identifier,
          sha: item?.execution?.after,
          description: item?.description,
          timestamp: item?.created
        }))}
      />
    </div>
  )
}
