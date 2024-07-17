import React from "react";
import { Node } from "components/Canvas/types";
import Bitbucket from "../../icons/Bitbucket";
import Slack from "../../icons/Slack";
import Jira from "../../icons/Jira";

export const mockNodes: Node[] = [
  {
    name: "SBOM and SLSA Verification",
    path: "spec.stages.0",
    icon: null,
    children: [
      {
        name: "SoftwareSupply Chain Validation",
        icon: <Bitbucket />,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
      {
        name: "Push to Artifactory",
        icon: <Slack />,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
      {
        name: "Deploy to Server",
        icon: <Jira />,
        path: "some-path",
        deletable: true,
        expandable: false,
      },
    ],
    deletable: true,
    expandable: true,
  },
];
