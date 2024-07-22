import { Node } from "components/Canvas/types";

export const mockNodes: Node[] = [
  {
    name: "SBOM and SLSA Verification",
    path: "spec.stages.0",
    icon: null,
    children: [
      {
        name: "SoftwareSupply Chain Validation",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
      {
        name: "Push to Artifactory",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
      {
        name: "Deploy to Server",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "SCA",
    path: "spec.stages.1",
    icon: null,
    children: [
      {
        name: "SoftwareSupply Chain Validation",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "Deploy to QA",
    path: "spec.stages.2",
    icon: null,
    children: [
      {
        name: "Pull artifact",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "Stage 4",
    path: "spec.stages.3",
    icon: null,
    children: [
      {
        name: "Step 1",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "Stage 5",
    path: "spec.stages.4",
    icon: null,
    children: [
      {
        name: "Step 1",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "Stage 6",
    path: "spec.stages.5",
    icon: null,
    children: [
      {
        name: "Step 1",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
      {
        name: "Step 2",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "Stage 7",
    path: "spec.stages.6",
    icon: null,
    children: [
      {
        name: "Step 1",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "Stage 8",
    path: "spec.stages.7",
    icon: null,
    children: [
      {
        name: "Step 1",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "Stage 9",
    path: "spec.stages.8",
    icon: null,
    children: [
      {
        name: "Step 1",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
  {
    name: "Stage 10",
    path: "spec.stages.9",
    icon: null,
    children: [
      {
        name: "Step 1",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
      {
        name: "Step 2",
        icon: null,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
];
