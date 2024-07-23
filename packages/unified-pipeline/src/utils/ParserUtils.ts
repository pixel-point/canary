import { get, has } from "lodash-es";
import { Node } from "../components/Canvas/types";
import { StageCategory } from "../components/PipelineConfigPanel/types";
import { getIdFromName } from "./StringUtils";

const STAGE_LABEL = "Stage";
const STAGES_PATH = "stages";
const PIPELINE_STAGES_PATH = `pipeline.${STAGES_PATH}`;
const STAGE_STEPS_PATH = "spec.steps";

export const parsePipelineYaml = ({
  yamlObject,
  collectedNodes,
  pathPrefix = PIPELINE_STAGES_PATH,
  isParallel
}: {
  yamlObject: Record<string, any>;
  collectedNodes: Node[];
  pathPrefix?: string;
  isParallel?: boolean;
}): Node[] => {
  const stages = get(yamlObject, pathPrefix, []);
  if (Array.isArray(stages) && stages.length > 0) {
    stages.map((stage: Record<string, any>, stageIdx: number) => {
      const category = has(stage, "group")
        ? StageCategory.GROUP
        : has(stage, "parallel")
          ? StageCategory.PARALLEL
          : StageCategory.UNIT;
      if (
        category.toLowerCase() === StageCategory.GROUP.valueOf().toLowerCase()
      ) {
        const groupMembers = parsePipelineYaml({
          yamlObject: get(stage, "group"),
          collectedNodes: [],
          pathPrefix: STAGES_PATH
        });
        const groupNode = getStageGroupNode({
          stageGroup: stage,
          stageNodes: groupMembers,
          stageGroupIdx: stageIdx,
          stageGroupNodePathPrefix: `${pathPrefix}${stageIdx}`
        });
        collectedNodes.push(groupNode);
      } else if (
        category.toLowerCase() ===
        StageCategory.PARALLEL.valueOf().toLowerCase()
      ) {
        const groupMembers = parsePipelineYaml({
          yamlObject: get(stage, "parallel"),
          collectedNodes: [],
          pathPrefix: `${pathPrefix}${stageIdx}.`,
          isParallel: true
        });
        const groupNode = getStageGroupNode({
          stageGroup: stage,
          stageNodes: groupMembers,
          stageGroupIdx: stageIdx,
          stageGroupNodePathPrefix: `${pathPrefix}${stageIdx}`
        });
        collectedNodes.push(groupNode);
      } else {
        collectedNodes.push(
          getStageNode({
            stage,
            stageIdx: stageIdx,
            childNodes: getChildNodes(stage),
            stagePathPrefix: pathPrefix,
            isParallel
          })
        );
      }
    });
  }
  return collectedNodes;
};

const getStageGroupNode = ({
  stageGroup,
  stageNodes,
  stageGroupIdx,
  stageGroupNodePathPrefix
}: {
  stageGroup: Record<string, any>;
  stageNodes: Node[];
  stageGroupIdx: number;
  stageGroupNodePathPrefix: string;
}): Node => {
  const stepGroupName = get(stageGroup, "name", `Stage group ${stageGroupIdx}`);
  const stageGroupId = getIdFromName(stepGroupName);
  return {
    name: stepGroupName,
    path: stageGroupNodePathPrefix,
    icon: null,
    children: stageNodes,
    deletable: true,
    expandable: true,
    groupId: stageGroupId
  } as Node;
};

const getStageNode = ({
  stage,
  stageIdx,
  childNodes,
  stagePathPrefix,
  isParallel
}: {
  stage: Record<string, any>;
  stageIdx: number;
  childNodes: Node[];
  stagePathPrefix: string;
  isParallel?: boolean;
}): Node => {
  return {
    name: get(stage, "name") || STAGE_LABEL,
    path: `${stagePathPrefix}${stageIdx}`,
    icon: null,
    children: childNodes,
    deletable: true,
    expandable: true,
    ...(isParallel && { parallel: isParallel })
  } as Node;
};

const getChildNodes = (stage: Record<string, any>): Node[] => {
  const steps = get(stage, STAGE_STEPS_PATH, []);
  let childNodes: Node[] = [];
  if (Array.isArray(steps) && steps.length > 0) {
    childNodes = steps.map((step: Record<string, any>, stepIndex: number) =>
      getStepNode(step, stepIndex)
    );
  }
  return childNodes;
};

const getStepNode = (step: Record<string, any>, stepIndex: number): Node => {
  return {
    name: get(step, "name", `step-${stepIndex + 1}`),
    icon: null,
    expandable: false
  } as Node;
};
