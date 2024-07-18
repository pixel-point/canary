import React from "react";
import { Node } from "components/Canvas/types";
import Bitbucket from "../../icons/Bitbucket";

export const mockNodes: Node[] = [
  {
    name: "Deploy to Dev",
    path: "spec.stages.1",
    icon: <Bitbucket />,
    children: [
      {
        name: "SBOM and SLSA Verification",
        path: "spec.stages.0.0",
        icon: <Bitbucket />,
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
            icon: <Bitbucket />,
            path: "some-path",
            deletable: true,
            expandable: false,
          },
          {
            name: "Deploy to Server",
            icon: <Bitbucket />,
            path: "some-path",
            deletable: true,
            expandable: false,
          },
        ],
        deletable: true,
        expandable: true,
        parallel: true,
      },
      {
        name: "SCA",
        path: "spec.stages.0.1",
        icon: <Bitbucket />,
        children: [
          {
            name: "SoftwareSupply Chain Validation",
            icon: <Bitbucket />,
            path: "some-path",
            deletable: true,
            expandable: false,
            parallel: true,
          },
          {
            name: "SLSA Verification",
            icon: <Bitbucket />,
            path: "some-path",
            deletable: true,
            expandable: false,
            parallel: true,
          },
        ],
        deletable: true,
        expandable: true,
        parallel: true,
        groupId: "SCA",
      },
    ],
    deletable: true,
    expandable: true,
    groupId: "Deploy_to_Dev",
  },
  // {
  //   name: "Clone codebase",
  //   path: "spec.stages.0",
  //   icon: <Bitbucket />,
  //   children: [
  //     {
  //       name: "Check credentials",
  //       icon: <Bitbucket />,
  //       path: "some-path",
  //       deletable: true,
  //       expandable: false,
  //     },
  //     {
  //       name: "Setup Git Connector",
  //       icon: <Bitbucket />,
  //       path: "some-path",
  //       deletable: true,
  //       expandable: false,
  //     },
  //     {
  //       name: "Clone repository",
  //       icon: <Bitbucket />,
  //       path: "some-path",
  //       deletable: true,
  //       expandable: false,
  //     },
  //   ],
  //   deletable: true,
  //   expandable: true,
  // },
];
