import React from 'react'
import { Node } from 'components/Canvas/types'
import Bitbucket from '../../icons/Bitbucket'
import Slack from '../../icons/Slack'
import Jira from '../../icons/Jira'

export const nodes: Node[] = [
  {
    name: 'Deploy to Dev',
    path: 'spec.stages.0',
    icon: <Bitbucket />,
    children: [
      {
        name: 'SBOM and SLSA Verification',
        path: 'spec.stages.0.0',
        icon: <Slack />,
        children: [
          {
            name: 'SoftwareSupply Chain Validation',
            icon: <Slack />,
            path: 'some-path',
            deletable: true,
            expandable: false
          },
          {
            name: 'Push to Artifactory',
            icon: <Jira />,
            path: 'some-path',
            deletable: true,
            expandable: false
          },
          {
            name: 'Deploy to Server',
            icon: <Jira />,
            path: 'some-path',
            deletable: true,
            expandable: false
          }
        ],
        deletable: true,
        expandable: true,
        parallel: true
      },
      {
        name: 'SCA',
        path: 'spec.stages.0.1',
        icon: <Bitbucket />,
        children: [
          {
            name: 'SoftwareSupply Chain Validation',
            icon: <Slack />,
            path: 'some-path',
            deletable: true,
            expandable: false
          },
          {
            name: 'SLSA Verification',
            icon: <Jira />,
            path: 'some-path',
            deletable: true,
            expandable: false
          }
        ],
        deletable: true,
        expandable: true,
        parallel: true
      }
      // {
      //   name: "Verify",
      //   path: "spec.stages.0.2",
      //   icon: null,
      //   children: [
      //     {
      //       name: "Run Analysis",
      //       icon: null,
      //       path: "some-path",
      //       deletable: true,
      //       expandable: false,
      //     },
      //     {
      //       name: "Monitor Traffic",
      //       icon: null,
      //       path: "some-path",
      //       deletable: true,
      //       expandable: false,
      //     },
      //   ],
      //   deletable: true,
      //   expandable: true,
      //   parallel: true,
      // },
    ],
    deletable: true,
    expandable: true,
    groupId: 'Deploy_to_Dev'
  }
]
