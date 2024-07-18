import React from 'react'
import { Node } from 'components/Canvas/types'
import Jira from '../../icons/Jira'

export const nodes: Node[] = [
  {
    name: 'SBOM and SLSA Verification',
    path: 'spec.stages.0',
    icon: <Jira />,
    children: [
      {
        name: 'SoftwareSupply Chain Validation',
        icon: <Jira />,
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
    expandable: true
  },
  {
    name: 'SCA',
    path: 'spec.stages.1',
    icon: <Jira />,
    children: [
      {
        name: 'SoftwareSupply Chain Validation',
        icon: <Jira />,
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
    expandable: true
  },
  {
    name: 'Deploy to QA',
    path: 'spec.stages.2',
    icon: <Jira />,
    children: [
      {
        name: 'Pull artifact',
        icon: <Jira />,
        path: 'some-path',
        deletable: true,
        expandable: false
      }
    ],
    deletable: true,
    expandable: true
  }
]
