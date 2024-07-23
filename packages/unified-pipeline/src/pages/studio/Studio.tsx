import React from "react";
import { PipelineStudio } from "../../components/PipelineStudio/PipelineStudio";
import { mockNodes as mockNodesDemo } from "../../assets/mockPipelines/mock_demo";
import pipelineYamlSingleStage from "../../assets/mockPipelines/yamls/pipeline_w_single_stage.yaml";
import pipelineYamlParallelGroup from "../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group.yaml";
import pipelineYamlParallelGroupAndStage from "../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group_and_stage.yaml";
import { getGraphFromPipelineYAML } from "../../utils/PipelineYamlUtils";

export const Studio: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={getGraphFromPipelineYAML(pipelineYamlSingleStage)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
      readonly
    />
  );
};

export const StudioParallel: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={getGraphFromPipelineYAML(pipelineYamlParallelGroup)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
      readonly
    />
  );
};

export const StudioMixed: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={getGraphFromPipelineYAML(pipelineYamlParallelGroupAndStage)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
      readonly
    />
  );
};

export const StudioDemo: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodesDemo as any }}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
      readonly
    />
  );
};
