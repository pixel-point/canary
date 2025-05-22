import { useCallback } from 'react'

import { Button } from '@components/button'
import { Icon } from '@components/icon'

import {
  AnyFormikValue,
  Controller,
  IInputDefinition,
  InputComponent,
  InputProps,
  RenderInputs,
  useFieldArray,
  useFormContext
} from '@harnessio/forms'

import { InputCaption } from './common/InputCaption'
import { InputLabel } from './common/InputLabel'
import { InputWrapper } from './common/InputWrapper'
import { RuntimeInputConfig } from './types/types'

export type UIInputWithConfigsForList<T = unknown> = Omit<IInputDefinition<T>, 'path'> & {
  relativePath: string
}

export interface ListFormInputConfig {
  inputType: 'list'
  inputConfig: {
    inputs: UIInputWithConfigsForList[]
    layout?: 'grid' | 'default'
    tooltip?: string
  } & RuntimeInputConfig
}

type ListFormInputProps = InputProps<AnyFormikValue, ListFormInputConfig>

function ListFormInputInternal(props: ListFormInputProps): JSX.Element {
  const { readonly, path, input, factory } = props
  const { label, required, inputConfig, description } = input

  const isGrid = inputConfig?.layout === 'grid'
  // const len = inputConfig?.inputs.length
  // const frArr = new Array(len).fill('1fr', 0, len)
  const rowClass = isGrid ? `grid gap-2` : 'flex flex-col space-y-4'
  const rowStyle = isGrid ? { gridTemplateColumns: `repeat(${inputConfig?.inputs.length}, 1fr) auto` } : {}

  const { fields, append, remove } = useFieldArray({
    name: path
  })

  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(path, formState)
  const { error } = fieldState

  const getChildInputs = useCallback(
    (rowInputs: UIInputWithConfigsForList[], parentPath: string, idx: number): IInputDefinition[] => {
      return rowInputs.map(orgInput => {
        const retInput = {
          ...orgInput,
          // NOTE: create absolute path using parent path, index and relative paths
          path: `${parentPath}[${idx}].${orgInput.relativePath}`
        } as IInputDefinition

        if (isGrid) {
          // label is rendered in header
          delete retInput.label
          // required is only used for optional label (validation is part of the root formik)
          retInput.required = true
        }

        return retInput
      })
    },
    [inputConfig?.layout]
  )

  return (
    <InputWrapper {...props}>
      <InputLabel label={label} required={required} />
      {/* TODO: do we need Controller ? */}
      <Controller
        name={path}
        render={() => (
          <div>
            <div>
              {isGrid && fields.length > 0 && (
                <div className={rowClass} style={rowStyle}>
                  {inputConfig?.inputs.map(rowInput => (
                    <InputLabel key={rowInput.label} label={rowInput.label} required={rowInput.required} />
                  ))}
                </div>
              )}
              <div className="flex flex-col space-y-2">
                {fields.map((_item, idx) => (
                  <div key={_item.id} className={rowClass} style={rowStyle}>
                    {inputConfig?.inputs && (
                      <RenderInputs items={getChildInputs(inputConfig?.inputs, path, idx)} factory={factory} />
                    )}
                    <div className="flex items-center">
                      <div>
                        <Button
                          iconOnly
                          className="mt-2"
                          onClick={() => {
                            remove(idx)
                          }}
                          disabled={readonly}
                        >
                          <Icon name="trash" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button size="sm" onClick={() => append({})} className="mt-2">
              Add
            </Button>
          </div>
        )}
      />
      <InputCaption error={error?.message} caption={description} />
    </InputWrapper>
  )
}

export class ListFormInput extends InputComponent<AnyFormikValue> {
  public internalType = 'list'

  renderComponent(props: ListFormInputProps): JSX.Element {
    return <ListFormInputInternal {...props} />
  }
}
