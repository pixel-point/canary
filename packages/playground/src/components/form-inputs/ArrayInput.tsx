import React, { useCallback } from 'react'
import { Controller, useFieldArray } from '@harnessio/forms'
import { Button, FormField, FormItem } from '@harnessio/canary'
import { Plus, Trash } from '@harnessio/icons-noir'
import { InputType } from './types'
import { InputComponent, InputProps } from '@harnessio/forms'
import { AnyFormikValue, IInputDefinition } from '@harnessio/forms'
import { RenderInputs } from '@harnessio/forms'
import InputLabel from './common/InputLabel'
import InputWrapper from './common/InputWrapper'
import { InputError } from './common/InputError'

export type UIInputWithConfigsForArray = Omit<IInputDefinition, 'path'>

export interface ArrayInputConfig {
  inputType: InputType.array
  inputConfig: {
    input: IInputDefinition
  }
}

function ArrayInputInternal(props: InputProps<AnyFormikValue, ArrayInputConfig>): JSX.Element {
  const { readonly, path, input, factory } = props
  const { label, required, inputConfig, description } = input

  const { fields, append, remove } = useFieldArray({
    name: path
  })

  const getChildInputs = useCallback(
    (rowInput: UIInputWithConfigsForArray, parentPath: string, idx: number): IInputDefinition[] => {
      const retInput = {
        ...rowInput,
        // NOTE: create absolute path using parent path and index
        path: `${parentPath}[${idx}]`
      } as IInputDefinition

      return [retInput]
    },
    []
  )

  return (
    <InputWrapper>
      <FormField
        name={path}
        render={() => (
          <FormItem>
            <InputLabel label={label} required={required} description={description} />
            <Controller
              name={path}
              render={() => (
                <div className="flex flex-col">
                  <div>
                    {fields.map((_item, idx) => (
                      <div key={idx} className="flex items-end space-x-2">
                        {inputConfig?.input && (
                          <RenderInputs items={getChildInputs(inputConfig?.input, path, idx)} factory={factory} />
                        )}
                        <div>
                          <button
                            className="mt-2"
                            onClick={() => {
                              remove(idx)
                            }}
                            disabled={readonly}>
                            <Trash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Button size="sm" onClick={() => append(input.default ?? undefined)} className="mt-2">
                      Add <Plus />
                    </Button>
                  </div>
                </div>
              )}
            />
            <InputError />
          </FormItem>
        )}
      />
    </InputWrapper>
  )
}

export class ArrayInput extends InputComponent<AnyFormikValue> {
  public internalType = InputType.array

  renderComponent(props: InputProps<AnyFormikValue, ArrayInputConfig>): JSX.Element {
    return <ArrayInputInternal {...props} />
  }
}
