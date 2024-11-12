import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TypesExecution, TypesStage, useFindExecutionQuery, useViewLogsQuery } from '@harnessio/code-service-client'
import { Badge, Icon, ScrollArea, Separator, Text } from '@harnessio/canary'
import {
  Layout,
  ExecutionTree,
  ExecutionStatus,
  StageExecution,
  ContactCard,
  convertExecutionToTree,
  StageProps,
  getStepId,
  parseStageStepId,
  SandboxLayout,
  ExecutionState
} from '@harnessio/views'
import copy from 'clipboard-copy'
import { PathParams } from '../../RouteDefinitions'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { SSEEvent } from '../../types'
import { getDuration, timeAgoFromEpochTime, formatDuration } from '../pipeline-edit/utils/time-utils'
import useSpaceSSE from '../../framework/hooks/useSpaceSSE'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { useLogs } from '../../framework/hooks/useLogs'
import { createAndDownloadBlob, getLogsText } from '../../utils/common-utils'
import ExecutionDetailsHeaderActions from './execution-details-header-actions'

const ExecutionLogs: React.FC = () => {
  const navigate = useNavigate()
  const space = useGetSpaceURLParam() ?? ''
  const { pipelineId, executionId } = useParams<PathParams>()
  const repoRef = useGetRepoRef()
  const [stage, setStage] = useState<TypesStage>()
  const [stageNum, setStageNum] = useState<number>(1)
  const [stepNum, setStepNum] = useState<number>(1)
  const [execution, setExecution] = useState<TypesExecution | undefined>()
  const pipelineIdentifier = pipelineId || ''
  const executionNum = executionId || ''
  const isPipelineStillExecuting: boolean = useMemo(
    /**
     * @TODO remove ExecutionState and replace with EnumCiStatus, would then not need this type assertion
     */
    () => [ExecutionState.RUNNING, ExecutionState.PENDING].includes(execution?.status as ExecutionState),
    [execution?.status]
  )
  const currentStepStatus = useMemo((): ExecutionState | undefined => {
    const stageIndex = Math.max(0, stageNum - 1)
    const stepIndex = Math.max(0, stepNum - 1)
    /**
     * @TODO remove ExecutionState and replace with EnumCiStatus, would then not need this type assertion
     */
    return execution?.stages?.[stageIndex]?.steps?.[stepIndex]?.status as ExecutionState | undefined
  }, [execution, stageNum, stepNum])

  const { data: { body: initialExecutionData } = {} } = useFindExecutionQuery({
    pipeline_identifier: pipelineIdentifier,
    execution_number: executionNum,
    repo_ref: repoRef
  })

  const { data: { body: logs } = {} } = useViewLogsQuery(
    {
      pipeline_identifier: pipelineIdentifier,
      execution_number: executionNum,
      repo_ref: repoRef,
      stage_number: String(stageNum),
      step_number: String(stepNum)
    },
    { enabled: !isPipelineStillExecuting }
  )

  useEffect(() => {
    setExecution(initialExecutionData)
  }, [initialExecutionData])

  const onEvent = useCallback(
    (data: TypesExecution) => {
      if (
        data?.repo_id === execution?.repo_id &&
        data?.pipeline_id === execution?.pipeline_id &&
        data?.number === execution?.number
      ) {
        setExecution(data)
      }
    },
    [execution?.number, execution?.pipeline_id, execution?.repo_id]
  )

  useSpaceSSE({
    space,
    events: useMemo(
      () => [
        SSEEvent.EXECUTION_UPDATED,
        SSEEvent.EXECUTION_COMPLETED,
        SSEEvent.EXECUTION_CANCELED,
        SSEEvent.EXECUTION_RUNNING
      ],
      []
    ),
    onEvent,
    shouldRun: isPipelineStillExecuting
  })

  const { logs: streamedLogs } = useLogs({
    executionNum,
    pipelineId: pipelineIdentifier,
    repoPath: repoRef,
    stageNum,
    stepNum,
    stepStatus: currentStepStatus
  })

  useEffect(() => {
    if (execution?.stages && execution.stages.length > 0) {
      const stageIdx = stageNum > 0 ? stageNum - 1 : 0
      setStage(execution.stages[stageIdx])
    }
  }, [execution?.stages, stageNum])

  const emptyLogsPlaceholder = [
    {
      pos: 0,
      out: 'No Logs Found\n',
      time: 0
    }
  ]

  const onStepNav = (stepId: number) => {
    setStepNum(stepId)
  }

  return (
    <>
      <SandboxLayout.Main hasHeader fullWidth hasLeftPanel>
        <SandboxLayout.Content>
          <ExecutionDetailsHeaderActions
            isExecuting={isPipelineStillExecuting}
            pipelineIdentifier={pipelineIdentifier}
            executionNum={executionNum}
            repoRef={repoRef}
            currentBranch={initialExecutionData?.source ?? ''}
          />
          <Layout.Horizontal className="px-8">
            <div className="w-2/3">
              {stage && (
                <StageExecution
                  stage={stage as StageProps}
                  logs={
                    isPipelineStillExecuting && currentStepStatus === ExecutionState.RUNNING
                      ? streamedLogs
                      : logs || emptyLogsPlaceholder
                  }
                  selectedStepIdx={stepNum > 0 ? stepNum - 1 : 0}
                  onEdit={() => navigate('../edit')}
                  onDownload={() => {
                    const logsReference =
                      isPipelineStillExecuting && currentStepStatus === ExecutionState.RUNNING
                        ? streamedLogs
                        : logs || emptyLogsPlaceholder
                    const output = getLogsText(logsReference)
                    createAndDownloadBlob(output, 'logs.log')
                  }}
                  onCopy={() =>
                    copy(
                      getLogsText(
                        isPipelineStillExecuting && currentStepStatus === ExecutionState.RUNNING
                          ? streamedLogs
                          : logs || emptyLogsPlaceholder
                      )
                    )
                  }
                  onStepNav={onStepNav}
                />
              )}
            </div>
            <ScrollArea className="w-1/3 h-[calc(100vh-16rem)] pt-4">
              <ContactCard authorEmail={execution?.author_email || ''} authorName={execution?.author_name} />
              <div className="flex flex-col gap-2 my-5">
                <Text className="text-white text-base">{execution?.message}</Text>
                <div className="flex gap-2 items-center">
                  {execution?.event === 'manual' ? (
                    <Badge variant="secondary" className="bg-primary-foreground flex gap-1">
                      <Layout.Horizontal gap="space-x-1" className="flex items-center">
                        <Icon size={12} name={'tube-sign'} />
                        <Text className="text-sm text-git pb-0.5">{execution?.source}</Text>
                      </Layout.Horizontal>
                    </Badge>
                  ) : (
                    <>
                      <Badge variant="secondary" className="bg-primary-foreground flex gap-1">
                        <Layout.Horizontal gap="space-x-1" className="flex items-center">
                          <Icon size={12} name={'tube-sign'} />
                          <Text className="text-sm text-git pb-0.5">{execution?.source}</Text>
                        </Layout.Horizontal>
                      </Badge>
                      <span>to</span>
                      <Badge variant="secondary" className="flex gap-1 bg-primary-foreground">
                        <Layout.Horizontal gap="space-x-1" className="flex items-center">
                          <Icon size={12} name={'git-branch'} />
                          <Text className="text-sm text-git pb-0.5">{execution?.target}</Text>
                        </Layout.Horizontal>
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              <Layout.Horizontal>
                {execution?.status && (
                  <Layout.Vertical gap="space-y-1">
                    <Text className="text-sm text-muted-foreground">Status</Text>
                    <ExecutionStatus.Badge
                      status={execution.status as ExecutionState}
                      minimal
                      duration={formatDuration(getDuration(execution?.started, execution?.finished))}
                    />
                  </Layout.Vertical>
                )}
                {execution?.created && (
                  <Layout.Vertical gap="space-y-1">
                    <Text className="text-sm text-muted-foreground">Started</Text>
                    <span className="text-white">{timeAgoFromEpochTime(execution.created)}</span>
                  </Layout.Vertical>
                )}
              </Layout.Horizontal>
              <Separator className="my-4" />
              {execution && (
                <ExecutionTree
                  defaultSelectedId={getStepId(stageNum, stepNum)}
                  elements={convertExecutionToTree(execution)}
                  onSelectNode={({ childId: fullStepId }: { parentId: string; childId: string }) => {
                    try {
                      const { stageId, stepId } = parseStageStepId(fullStepId) || {}
                      if (!isNaN(Number(stageId))) {
                        setStageNum(Number(stageId))
                      }
                      if (!isNaN(Number(stepId))) {
                        setStepNum(Number(stepId))
                      }
                    } catch {
                      // Ignore exception
                    }
                  }}
                />
              )}
            </ScrollArea>
          </Layout.Horizontal>
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}

export const Execution: React.FC = () => {
  return <ExecutionLogs />
}
