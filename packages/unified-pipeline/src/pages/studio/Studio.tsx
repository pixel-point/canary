import React from "react";
import { PipelineStudio } from "../../components/PipelineStudio/PipelineStudio";
import pipelineYamlSingleStage from "../../assets/mockPipelines/yamls/pipeline_w_single_stage.yaml";
import pipelineYamlParallelGroup from "../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group.yaml";
import pipelineYamlParallelGroupAndStage from "../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group_and_stage.yaml";
import demoPipeline from "../../assets/mockPipelines/yamls/demo_pipeline.yaml";
import { getGraphFromPipelineYaml } from "../../utils/PipelineYamlUtils";

export const Studio: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={getGraphFromPipelineYaml(pipelineYamlSingleStage)}
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
      graph={getGraphFromPipelineYaml(pipelineYamlParallelGroup)}
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
      graph={getGraphFromPipelineYaml(pipelineYamlParallelGroupAndStage)}
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
      graph={getGraphFromPipelineYaml(demoPipeline)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
      readonly
    />
  );
};
