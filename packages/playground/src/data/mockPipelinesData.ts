import { ExecutionState } from '../components/execution/types'

export const mockPipelines = [
  {
    id: '0',
    status: ExecutionState.RUNNING,
    name: 'TI v2 - Build jhttp - cloud',
    sha: '93dbd09a',
    description: 'fix(deps): update module github.com/aws/aws-sdk-go to',
    version: 'v1.5.4.20',
    timestamp: '1723478906498',
    meter: [
      { id: '0', state: 3 },
      { id: '1', state: 3 },
      { id: '2', state: 3 },
      { id: '3', state: 3 },
      { id: '4', state: 3 },
      { id: '5', state: 3 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 1 },
      { id: '9', state: 1 },
      { id: '10', state: 3 }
    ]
  },
  {
    id: '1',
    status: ExecutionState.SUCCESS,
    name: 'Zuul Cloud',
    sha: '366177a6',
    timestamp: '1723478906498',
    meter: [{ id: '0', state: 1 }]
  },
  {
    id: '2',
    name: 'build scan push K8S - Trivy',
    sha: '93dbd09a',
    description: 'fix: [CI-13371]: Fix log closers in case of step timeouts',
    version: 'v1.5.4.20',
    timestamp: '1723478906498',
    meter: [
      { id: '0', state: 3 },
      { id: '1', state: 1 },
      { id: '2', state: 1 },
      { id: '3', state: 1 },
      { id: '4', state: 1 },
      { id: '5', state: 1 },
      { id: '6', state: 1 }
    ]
  },
  {
    id: '3',
    status: ExecutionState.FAILURE,
    name: 'Zuul K8S',
    sha: 'da7c1c67',
    description: 'feat: [CDE-119]: Add task handling to spawn and cleanup VM for CDE/gitspaces on bare metalo',
    version: 'v1.5.4.20',
    timestamp: '1723478906498',
    meter: [
      { id: '0', state: 1 },
      { id: '1', state: 1 },
      { id: '2', state: 1 },
      { id: '3', state: 3 },
      { id: '4', state: 3 },
      { id: '5', state: 3 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 2 },
      { id: '9', state: 2 },
      { id: '10', state: 2 }
    ]
  },
  {
    id: '4',
    status: ExecutionState.ERROR,
    name: 'build scan push K8S - Trivy',
    sha: '93dbd09a',
    description: 'fix: [CI-13371]: Fix log closers in case of step timeouts',
    version: 'v1.5.4.20',
    timestamp: '1723478906498',
    meter: [
      { id: '0', state: 3 },
      { id: '1', state: 3 },
      { id: '2', state: 3 },
      { id: '3', state: 1 },
      { id: '4', state: 3 },
      { id: '5', state: 3 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 3 }
    ]
  },
  {
    id: '5',
    status: ExecutionState.FAILURE,
    name: 'build scan push test - k8s - Clone 2',
    sha: 'fe54f9b1',
    timestamp: '1723478906498',
    meter: [
      { id: '0', state: 1 },
      { id: '1', state: 1 },
      { id: '2', state: 1 },
      { id: '3', state: 3 },
      { id: '4', state: 3 },
      { id: '5', state: 3 },
      { id: '6', state: 3 },
      { id: '7', state: 2 }
    ]
  },
  {
    id: '6',
    status: ExecutionState.SUCCESS,
    name: 'build scan push test - cloud',
    sha: 'b7765ad1',
    description: 'update google/go-jsonnet version to',
    version: 'v0.20.0',
    timestamp: '1723478906498',
    meter: [
      { id: '0', state: 3 },
      { id: '1', state: 3 },
      { id: '2', state: 2 },
      { id: '3', state: 2 },
      { id: '4', state: 3 },
      { id: '5', state: 1 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 1 },
      { id: '10', state: 1 }
    ]
  },
  {
    id: '7',
    status: ExecutionState.SUCCESS,
    name: 'build scan push test - k8s',
    sha: 'cf5f4b4a',
    description: 'fix: [CI-11759]: Fixing sum for Harness code',
    version: 'v1.5.4.20',
    timestamp: '1723478906498',
    meter: [
      { id: '0', state: 2 },
      { id: '1', state: 2 },
      { id: '2', state: 2 },
      { id: '3', state: 1 },
      { id: '4', state: 1 },
      { id: '5', state: 1 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 3 }
    ]
  },
  {
    id: '8',
    status: ExecutionState.FAILURE,
    name: 'build scan push test - k8s - Clone',
    sha: 'da7c1c67',
    description: 'fix: [CI-13371]: Fix log closers in case of step timeouts',
    version: 'v1.5.4.20',
    timestamp: '1723478906498',
    meter: [
      { id: '0', state: 3 },
      { id: '1', state: 3 },
      { id: '2', state: 3 },
      { id: '3', state: 2 },
      { id: '4', state: 1 },
      { id: '5', state: 3 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 3 }
    ]
  }
]
