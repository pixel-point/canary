import type { IFormDefinition } from '@harnessio/forms'
import { unsetEmptyStringOutputTransformer } from '@harnessio/forms'
import type { InputConfigType } from '../form-inputs/types'
import { InputType } from '../form-inputs/types'
import type { IInputConfigWithConfig } from './types'
import { BARRIER_STEP_IDENTIFIER } from './types'

export const BARRIER_STEP_DESCRIPTION = 'Barrier step description.'

const inputs: IInputConfigWithConfig[] = [
  {
    inputType: InputType.text,
    path: `${BARRIER_STEP_IDENTIFIER}.name`,
    label: 'Barrier name',
    outputTransform: unsetEmptyStringOutputTransformer()
  }
]

export const barrierStepFormDefinition: IFormDefinition<InputConfigType> = {
  inputs
}
