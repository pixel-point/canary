import React from "react";
import { PipelineStudio } from "../../components/PipelineStudio/PipelineStudio";
// import { nodes as singleStage } from "./mock_single";
import { mockNodes } from "./mock_many";
// import { nodes as multiStagesParallel } from "./mock_multiple";
import { nodes as mockNodesParallel } from "./mock_parallel";
import { mockNodes as mockNodesMixed } from "./mock_mixed";
import { mockNodes as mockNodesDemo } from "./mock_demo";

export const Studio: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodes as any }}
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
      graph={{ nodes: mockNodesParallel as any }}
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
