import * as zod from 'zod'

import { IFormDefinition, IInputDefinition } from '@harnessio/forms'

import { InputConfigType, InputType } from '../../components/form-inputs/types'

type IInputConfigWithConfig = IInputDefinition & InputConfigType

export const defaultsValues2 = {
  rootArray: new Array(5).fill({
    secondArray: new Array(5).fill({
      secondArrayProp: 'second',
      thirdArray: new Array(5).fill({
        thirdArrayProp1: 'third'
      })
    })
  })
}

const inputs: IInputConfigWithConfig[] = [
  {
    inputType: InputType.list,
    path: 'rootArray',
    label: 'First array',
    required: true,

    inputConfig: {
      inputs: [
        {
          inputType: InputType.text,
          label: 'First array prop',
          relativePath: 'firstArrayProp',
          required: true,
          inputConfig: {},
          validation: {
            schema: zod.any().refine(
              async value => {
                return value === parseInt(value).toString()
              },
              { message: 'Value is not a integer' }
            )
          }
        },
        {
          inputType: InputType.list,
          relativePath: 'secondArray',
          label: 'Second array (table)',
          required: true,
          inputConfig: {
            layout: 'grid',
            inputs: [
              {
                inputType: InputType.text,
                label: 'Second array prop',
                relativePath: 'secondArrayProp',
                required: true,
                inputConfig: {},
                validation: {
                  schema: zod.any().refine(
                    async value => {
                      return value === parseInt(value).toString()
                    },
                    { message: 'Value is not a integer' }
                  )
                }
              },
              {
                inputType: InputType.list,
                relativePath: 'thirdArray',
                label: 'Third array',
                required: true,
                inputConfig: {
                  layout: 'default',
                  inputs: [
                    {
                      inputType: InputType.text,
                      relativePath: 'thirdArrayProp1',
                      required: false,
                      label: 'Third array prop 1',
                      inputConfig: {},
                      validation: {
                        schema: zod.any().refine(
                          async value => {
                            return value === parseInt(value).toString()
                          },
                          { message: 'Value is not a integer' }
                        )
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }
]

export const formDefinition2: IFormDefinition<InputConfigType> = {
  inputs
}
