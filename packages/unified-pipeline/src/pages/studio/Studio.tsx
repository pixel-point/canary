import React from "react";
import { PipelineStudio } from "../../components/PipelineStudio/PipelineStudio";
import { nodes as singleStage } from "../../assets/mockPipelines/mock_single";
// import { mockNodes } from "./mock_many";
// import { nodes as multiStagesParallel } from "./mock_multiple";
// import { nodes as mockNodesParallel } from "../../assets/mockPipelines/mock_parallel";
import { mockNodes as mockNodesMixed } from "../../assets/mockPipelines/mock_mixed";
import { mockNodes as mockNodesDemo } from "../../assets/mockPipelines/mock_demo";
import pipelineYamlParallelGroup from "../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group.yaml";
import { getGraphFromPipelineYAML } from "../../utils/PipelineYamlUtils";

export const Studio: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: singleStage }}
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
      graph={{ nodes: mockNodesMixed as any }}
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
