import { AnyFormikValue, IFormDefinition } from '@harnessio/forms'
import { IInputConfigWithConfigInterface, InputConfigType } from '@harnessio/ui/views'

import {
  getCloningContainer,
  getConnectionContainer,
  getMetadataContainer,
  getResourcesContainer
} from './common-connector-utils'

export const GITHUB_CONNECTOR_CATEOGRY = 'Code Repository'

const inputs: IInputConfigWithConfigInterface[] = [
  {
    inputType: 'cards',
    path: 'githubType',
    label: 'GitHub Type',
    inputConfig: {
      options: [
        { label: 'Cloud', value: 'Cloud', description: 'Connect to Github Cloud', id: 'cloud', title: 'Cloud' },
        {
          label: 'Enterprise',
          value: 'Enterprise',
          description: 'Connect to Github Enterprise',
          id: 'enterprise',
          title: 'Enterprise'
        }
      ]
    },
    default: 'Cloud'
    // required: true,
    // validation: {
    //   schema: zod.string().min(1, 'Required input')
    // }
  },
  {
    inputType: 'select',
    path: `auth`,
    label: 'Authentication',
    default: 'Oauth',
    inputConfig: {
      options: [
        { label: 'Oauth', value: 'Oauth' },
        { label: 'GitHub Application', value: 'GithubApp' },
        { label: 'Personal Token', value: 'UsernameToken' }
      ]
    }
  },
  {
    inputType: 'text',
    path: `pat`,
    label: 'Personal Token',
    isVisible: (values: { auth: string }) => {
      return values?.auth === 'UsernameToken'
    }
  },
  {
    inputType: 'group',
    path: `connection`,
    label: 'Connection',
    placeholder: 'Optional',
    inputs: [
      {
        inputType: 'text',
        path: `delegateSelectors`,
        label: 'Delegate Selector',
        required: true,
        inputConfig: {
          disableAnyDelegate: (values: AnyFormikValue) => values?.auth === 'UsernameToken'
        }
      }
    ]
  },
  getResourcesContainer(),
  getCloningContainer(),
  getConnectionContainer(),
  getMetadataContainer()
]

export const githubConnectorFormDefinition: IFormDefinition<InputConfigType> = {
  inputs
}
