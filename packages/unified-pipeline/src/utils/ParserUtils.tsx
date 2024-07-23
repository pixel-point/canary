import React from 'react'
import { get, has } from 'lodash-es'
import { Node } from '../components/Canvas/types'
import { StageCategory } from '../components/PipelineConfigPanel/types'
import { getIdFromName } from './StringUtils'
import Bitbucket from '../icons/Bitbucket'
import Slack from '../icons/Slack'

const STAGE_LABEL = 'Stage'
const STAGE_GROUP_LABEL = 'Stage Group'
const STAGES_PATH_PREFIX = 'stages'
export const PIPELINE_STAGES_PATH_PREFIX = `pipeline.${STAGES_PATH_PREFIX}`
export const STEPS_PATH_PREFIX = 'steps'

export const parsePipelineYaml = ({
  yamlObject,
  pathPrefix = '',
  isParallel = false
}: {
  yamlObject: Record<string, any>
  pathPrefix?: string
  isParallel?: boolean
}): Node[] => {
  const stages = get(yamlObject, pathPrefix, [])
  if (!Array.isArray(stages)) return []
  const collectedNodes: Node[] = []
  stages.forEach((stage, index) => {
    const category = has(stage, 'group')
      ? StageCategory.GROUP
      : has(stage, 'parallel')
        ? StageCategory.PARALLEL
        : StageCategory.UNIT

    const newPathPrefix = `${pathPrefix}.${index}`

    if (category === StageCategory.GROUP) {
      const groupMembers = parsePipelineYaml({
        yamlObject: get(stage, 'group', []),
        pathPrefix: STAGES_PATH_PREFIX
      })
      collectedNodes.push(
        getStageGroupNode({
          stageGroup: stage,
          stageNodes: groupMembers,
          stageGroupIdx: index,
          stageGroupNodePathPrefix: newPathPrefix
        })
      )
    } else if (category === StageCategory.PARALLEL) {
      const parallelMembers = parsePipelineYaml({
        yamlObject: get(stage, 'parallel', []),
        pathPrefix: STAGES_PATH_PREFIX,
        isParallel: true
      })
      collectedNodes.push(
        getStageGroupNode({
          stageGroup: stage,
          stageNodes: parallelMembers,
          stageGroupIdx: index,
          stageGroupNodePathPrefix: newPathPrefix
        })
      )
    } else {
      collectedNodes.push(
        getStageNode({
          stage,
          stageIdx: index,
          childNodes: getChildNodes(stage),
          stagePathPrefix: pathPrefix,
          isParallel
        })
      )
    }
  })
  return collectedNodes
}

const getStageGroupNode = ({
  stageGroup,
  stageNodes,
  stageGroupIdx,
  stageGroupNodePathPrefix
}: {
  stageGroup: Record<string, any>
  stageNodes: Node[]
  stageGroupIdx: number
  stageGroupNodePathPrefix: string
}): Node => {
  const stepGroupName = get(stageGroup, 'name', `${STAGE_GROUP_LABEL} ${stageGroupIdx}`)
  const stageGroupId = getIdFromName(stepGroupName)
  return {
    name: stepGroupName,
    path: stageGroupNodePathPrefix,
    icon: null,
    children: stageNodes,
    deletable: true,
    expandable: true,
    groupId: stageGroupId
  } as Node
}

const getStageNode = ({
  stage,
  stageIdx,
  childNodes,
  stagePathPrefix,
  isParallel
}: {
  stage: Record<string, any>
  stageIdx: number
  childNodes: Node[]
  stagePathPrefix: string
  isParallel?: boolean
}): Node => {
  return {
    name: get(stage, 'name') || `${STAGE_LABEL} ${stageIdx}`,
    path: `${stagePathPrefix}.${stageIdx}`,
    icon: null,
    children: childNodes,
    deletable: true,
    expandable: true,
    ...(isParallel && { parallel: isParallel })
  } as Node
}

const getChildNodes = (stage: Record<string, any>): Node[] => {
  const steps = get(stage, STEPS_PATH_PREFIX, [])
  let childNodes: Node[] = []
  if (Array.isArray(steps) && steps.length > 0) {
    childNodes = steps.map((step: Record<string, any>, stepIndex: number) => getStepNode(step, stepIndex))
  }
  return childNodes
}

const getStepNode = (step: Record<string, any>, stepIndex: number): Node => {
  return {
    name: get(step, 'name', `step ${stepIndex + 1}`),
    icon: getPlaceholderIcon(stepIndex),
    expandable: false,
    path: '',
    deletable: false
  } as Node
}

const getPlaceholderIcon = (stepIndex: number): React.ReactElement => {
  return stepIndex % 2 ? <Bitbucket /> : <Slack />
}
