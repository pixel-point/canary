import { IInputDefinition } from '@harnessio/forms'
import { generateFriendlyName } from './common-utils'
import { InputType, UIInputWithConfigsForArray } from '@harnessio/playground'

// TODO
enum ApiInputType {
  STRING = 'string',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  ARRAY = 'array',
  OBJECT = 'object'
}

// TODO
interface ApiInput {
  type: ApiInputType
  description?: string
  default?: string
  options?: { isExtended?: boolean }
  required?: boolean
}

// TODO
export interface ApiInputs {
  [key: string]: ApiInput
}

export function apiInput2IInputDefinition(inputName: string, input: ApiInput, prefix?: string): IInputDefinition {
  let arrayInput: UIInputWithConfigsForArray | undefined
  if (input.type === 'array') {
    arrayInput = {
      inputType: InputType.text
    }
  }

  return {
    label: generateFriendlyName(inputName),
    path: prefix ? `${prefix}.${inputName}` : inputName,
    description: input.description,
    // TODO: add mapper for this
    inputType: input.type === 'string' ? 'text' : input.type,
    //required: input.required,
    ...(arrayInput ? { inputConfig: { input: arrayInput } } : {})
  }
}

export function addNameInput(inputs: IInputDefinition[], path: string): IInputDefinition[] {
  return [{ path, label: 'Name', description: 'Name of the step', inputType: InputType.string }, ...inputs]
}
