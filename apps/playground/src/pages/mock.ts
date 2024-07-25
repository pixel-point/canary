import { TreeViewElement, Status } from '../../../../packages/canary/src/components/treeview'

export const elements: TreeViewElement[] = [
  {
    id: '1',
    isSelectable: true,
    name: 'DAST',
    status: Status.SUCCESS,
    duration: 15,
    children: [
      {
        id: '2',
        isSelectable: true,
        name: 'Fortify',
        status: Status.SUCCESS,
        duration: 5
      },
      {
        id: '3',
        isSelectable: true,
        name: 'Veracode',
        status: Status.SUCCESS,
        duration: 5
      },
      {
        id: '4',
        isSelectable: true,
        name: 'Checkmarx',
        status: Status.SUCCESS,
        duration: 5
      }
    ]
  },
  {
    id: '5',
    isSelectable: true,
    name: 'Deploy to Prod',
    status: Status.FAILED,
    children: [
      {
        id: '6',
        isSelectable: true,
        name: 'SBOM and SLSA Validation',
        status: Status.FAILED,
        children: [
          {
            id: '9',
            isSelectable: true,
            name: 'SoftwareSupply Chain Validation',
            status: Status.FAILED,
            duration: 15
          },
          {
            id: '10',
            isSelectable: true,
            name: 'SLSA Verification',
            status: Status.QUEUED
          }
        ]
      },
      {
        id: '7',
        isSelectable: true,
        name: 'Risk Profile OPA - New Criticals',
        status: Status.QUEUED
      },
      {
        id: '8',
        isSelectable: true,
        name: 'Canary Deployment',
        status: Status.QUEUED
      }
    ]
  }
]
