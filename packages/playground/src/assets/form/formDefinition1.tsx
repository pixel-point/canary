import * as zod from 'zod'
import type { IFormDefinition, IInputDefinition } from '@harnessio/forms'
import type { InputConfigType} from '../../components/form-inputs/types';
import { InputType } from '../../components/form-inputs/types'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

type IInputConfigWithConfig = IInputDefinition & InputConfigType

const inputs: IInputConfigWithConfig[] = [
  {
    inputType: InputType.text,
    path: 'stringProp1',
    label: 'String',
    description: 'This is a string input',
    required: true,
    validation: {
      schema: zod.any().superRefine(async (val, ctx) => {
        await delay(500)
        if (val !== 'AB') {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: `Value not equal to AB`
          })
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
        inputType: InputType.array,
        path: '',
        label: 'Array inner',
        description: 'This is a array in the array input',
        required: true,
        inputConfig: {
          input: {
            path: '', // TODO this should be not required
            inputType: InputType.text,
            label: 'List prop',
            required: true,
            validation: {
              schema: zod.any().refine(
                async value => {
                  await delay(1000)
                  return value === 'QWE'
                },
                { message: 'Value is not QWE' }
              )
            }
          }
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
          inputType: InputType.text,
          label: 'Array prop 2',
          relativePath: 'arrayProp2',
          required: true,
          validation: {
            schema: zod.any().refine(
              value => {
                return value === 'QWE'
              },
              { message: 'Value is not QWE' }
            )
          }
        }
      ]
    }
  },
  {
    inputType: InputType.text,
    label: 'String 2',
    path: 'stringProp2',
    required: true,
    validation: {
      schema: zod.any().refine(
        val => {
          return val === '123'
        },
        { message: `Value not equal to 123` }
      )
    }
  }
]

export const formDefinition1: IFormDefinition<InputConfigType> = {
  inputs
}
