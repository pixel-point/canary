import { useCallback } from 'react'
import { Plus } from 'lucide-react'
import {
  Controller,
  useFieldArray,
  InputComponent,
  InputProps,
  AnyFormikValue,
  IInputDefinition,
  RenderInputs
} from '@harnessio/forms'
import { Button, FormField, FormItem, Icon } from '@harnessio/canary'
import { InputType } from './types'
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
                    {fields.map((item, idx) => (
                      <div key={item.id} className="flex items-end space-x-2">
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
                            <Icon name="x-mark" />
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
