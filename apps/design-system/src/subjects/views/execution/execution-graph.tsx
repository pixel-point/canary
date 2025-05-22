import { ExecutionHeader, ExecutionState, ExecutionTabs } from '@harnessio/ui/views'

import PipelineExecutionGraph from './pipeline-execution-graph'

export const ExecutionGraphView = () => {
  return (
    <div className="flex h-full flex-col">
      <ExecutionTabs />
      <ExecutionHeader
        className="border-cn-borders-3 border-b"
        commitName="8fbru3ix"
        branchName="master"
        title={{ number: '311. ', title: 'Alerting docs: adds sns integration' }}
        storage="0 B"
        storageAverage="0 B / 250 MB"
        simpleOperation="27/100k"
        branch="master"
        commit="b8bruh99h"
        status={ExecutionState.RUNNING}
        buildTime="1h 30m"
        createdTime="10 mins ago"
        pipelineName="build scan push test - k8s - Clone 2"
      />
      <PipelineExecutionGraph />
    </div>
  )
}
