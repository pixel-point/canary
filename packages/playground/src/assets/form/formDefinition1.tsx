import { IFormDefinition, IInputDefinition } from '@harnessio/forms'
import { InputConfigType, InputType } from '../../components/form-inputs/types'
import * as Yup from 'yup'

type IInputConfigWithConfig = IInputDefinition & InputConfigType

const inputs: IInputConfigWithConfig[] = [
  {
    inputType: InputType.string,
    path: 'stringProp1',
    label: 'String',
    description: 'This is a string input',
    required: true,
    validation: {
      schema: Yup.mixed().test({
        message: 'Value not equal to 123',
        test: value => {
          return value === '123'
        }
      })
    }
  },
  {
    inputType: InputType.array,
    path: 'rootArray',
    label: 'Array',
    description: 'This is a array input',
    required: true,
    inputConfig: {
      input: {
        path: '', // TODO this should be not required
        inputType: InputType.string,
        label: 'List prop',
        required: true,
        validation: {
          schema: Yup.mixed().test('Value is not a integer', 'Value is not a integer', value => {
            return value === parseInt(value).toString()
          })
        }
      }
    }
  },
  {
    inputType: InputType.list,
    path: 'rootList',
    label: 'List',
    description: 'This is a list input',
    required: true,
    inputConfig: {
      inputs: [
        {
          inputType: InputType.boolean,
          label: 'Boolean',
          relativePath: 'booleanProp1'
        },
        {
          inputType: InputType.string,
          label: 'Array prop 2',
          relativePath: 'arrayProp2',
          required: true,
          validation: {
            schema: Yup.mixed().test('Value is not a integer', 'Value is not a integer', value => {
              return value === parseInt(value).toString()
            })
          }
        }
      ]
    }
  },
  {
    inputType: InputType.string,
    label: 'String 2',
    path: 'stringProp2',
    required: true,
    validation: {
      schema: Yup.mixed().test({
        message: 'Value not equal to AB',
        test: value => {
          return value === 'AB'
        }
      })
    }
  }
]

export const formDefinition1: IFormDefinition<InputConfigType> = {
  inputs
}
