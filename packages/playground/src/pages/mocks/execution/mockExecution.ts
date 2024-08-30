import { ExecutionState } from '../../../components/execution/types'

export const data = {
  pipeline_id: 1,
  created_by: 3,
  repo_id: 1,
  trigger: 'admin',
  number: 1,
  status: ExecutionState.RUNNING,
  event: 'manual',
  message:
    'Merge pull request #92 from drone/ks/CODE-2043 fix unmarshalling array into Go value of type github.searchRepository',
  before: '203523e17cba8d230afec057bdd6349009f5060b',
  after: '203523e17cba8d230afec057bdd6349009f5060b',
  ref: 'refs/heads/main',
  source: 'develop',
  target: 'main',
  author_login: 'Administrator',
  author_name: 'Administrator',
  author_email: 'admin@gitness.io',
  sender: 'admin',
  params: { DRONE_BUILD_LINK: 'http://localhost:3000/test/repo/pipelines/test/execution/1' },
  started: 1722296944823,
  finished: 1722296944831,
  created: 1722296944780,
  updated: 1722296944831,
  stages: [
    {
      execution_id: 1,
      repo_id: 1,
      number: 1,
      name: 'DAST',
      group: 'Deploy to Prod',
      status: ExecutionState.RUNNING,
      error: 'Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?',
      exit_code: 255,
      machine: 'vardan_bansal',
      started: 1722296944000,
      stopped: 1722296944000,
      on_success: true,
      on_failure: false,
      steps: [
        {
          number: 1,
          name: 'Fortify',
          status: ExecutionState.RUNNING,
          exit_code: 0,
          started: 1722296944000,
          stopped: 1722296949000,
          image: 'drone/git:latest',
          detached: false,
          inputTitle: {
            name: 'Input Name',
            value: 'Input Value'
          },
          input: [
            {
              name: '21212',
              value: 'Input Value'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'spec',
              value: [{ name: 'instance selection', value: { name: 'type', value: 'Percentage' } }]
            },
            {
              name: 'spec',
              value: [
                { name: 'instance selection', value: { name: 'type', value: 'Percentage' } },
                {
                  name: 'instance selection',
                  value: [
                    { name: 'type', value: 'Percentage' },
                    { name: 'type', value: 'Percentage' }
                  ]
                },
                { name: 'spec', value: { name: 'percentage', value: '5' } },
                { name: 'skipDryRun', value: 'false' },
                { name: 'delegate selectors', value: 'value1' }
              ]
            }
          ],
          outout: []
        },
        {
          number: 2,
          name: 'Veracode',
          status: ExecutionState.FAILURE,
          exit_code: 0,
          started: 1722296944000,
          stopped: 1722296949000,
          depends_on: ['clone'],
          image: 'docker.io/library/alpine:latest',
          detached: false,
          inputTitle: {
            name: 'Input Name',
            value: 'Input Value'
          },
          input: [
            {
              name: '21212',
              value: 'Input Value'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'spec',
              value: [{ name: 'instance selection', value: { name: 'type', value: 'Percentage' } }]
            },
            {
              name: 'spec',
              value: [
                { name: 'instance selection', value: { name: 'type', value: 'Percentage' } },
                {
                  name: 'instance selection',
                  value: [
                    { name: 'type', value: 'Percentage' },
                    { name: 'type', value: 'Percentage' }
                  ]
                },
                { name: 'spec', value: { name: 'percentage', value: '5' } },
                { name: 'skipDryRun', value: 'false' },
                { name: 'delegate selectors', value: 'value1' }
              ]
            }
          ],
          outout: []
        },
        {
          number: 3,
          name: 'Checkmarx',
          status: ExecutionState.SUCCESS,
          exit_code: 0,
          started: 1722296944000,
          stopped: 1722296949000,
          depends_on: ['clone'],
          image: 'docker.io/library/alpine:latest',
          detached: false,
          inputTitle: {
            name: 'Input Name',
            value: 'Input Value'
          },
          input: [
            {
              name: '21212',
              value: 'Input Value'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'spec',
              value: [{ name: 'instance selection', value: { name: 'type', value: 'Percentage' } }]
            },
            {
              name: 'spec',
              value: [
                { name: 'instance selection', value: { name: 'type', value: 'Percentage' } },
                {
                  name: 'instance selection',
                  value: [
                    { name: 'type', value: 'Percentage' },
                    { name: 'type', value: 'Percentage' }
                  ]
                },
                { name: 'spec', value: { name: 'percentage', value: '5' } },
                { name: 'skipDryRun', value: 'false' },
                { name: 'delegate selectors', value: 'value1' }
              ]
            }
          ],
          outout: []
        }
      ]
    },
    {
      execution_id: 1,
      repo_id: 1,
      number: 2,
      name: 'Deploy to Prod',
      status: ExecutionState.FAILURE,
      error: 'Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?',
      exit_code: 255,
      machine: 'vardan_bansal',
      started: 1722296944000,
      stopped: 1722296944000,
      on_success: true,
      on_failure: false,
      steps: [
        {
          number: 1,
          name: 'SBOM and SLSA Validation',
          status: ExecutionState.FAILURE,
          exit_code: 0,
          started: 1722296944000,
          stopped: 1722296944000,
          image: 'drone/git:latest',
          detached: false,
          inputTitle: {
            name: 'Input Name',
            value: 'Input Value'
          },
          input: [
            {
              name: '21212',
              value: 'Input Value'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'spec',
              value: [{ name: 'instance selection', value: { name: 'type', value: 'Percentage' } }]
            }
          ],
          output: []
        },
        {
          number: 2,
          name: 'Risk Profile OPA - New Criticals',
          status: ExecutionState.SKIPPED,
          exit_code: 0,
          started: 1722296944000,
          stopped: 1722296944000,
          depends_on: ['clone'],
          image: 'docker.io/library/alpine:latest',
          detached: false,
          inputTitle: {
            name: 'Input Name',
            value: 'Input Value'
          },
          input: [
            {
              name: '21212',
              value: 'Input Value'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'spec',
              value: [{ name: 'instance selection', value: { name: 'type', value: 'Percentage' } }]
            }
          ],
          output: []
        },
        {
          number: 3,
          name: 'Canary Deployment',
          status: ExecutionState.SKIPPED,
          exit_code: 0,
          started: 1722296944000,
          stopped: 1722296944000,
          depends_on: ['clone'],
          image: 'docker.io/library/alpine:latest',
          detached: false,
          inputTitle: {
            name: 'Input Name',
            value: 'Input Value'
          },
          input: [
            {
              name: '21212',
              value: 'Input Value'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'identifier',
              value: 'canaryDeployment'
            },
            {
              name: 'name',
              value: 'canaryDeployment'
            },
            {
              name: 'timeout',
              value: '10m'
            },
            {
              name: 'type',
              value: 'K8sCanaryDeploy'
            },
            {
              name: 'type',
              value: 'percentage'
            },
            {
              name: 'spec',
              value: [{ name: 'instance selection', value: { name: 'type', value: 'Percentage' } }]
            }
          ],
          output: []
        }
      ]
    }
  ]
}
