import React from 'react'
import { FormControl, FormField, FormItem, Input } from '@harnessio/canary'
import { InputType } from './types'
import { InputComponent } from '@harnessio/forms'
import type { AnyFormikValue, InputProps } from '@harnessio/forms'
import InputLabel from './common/InputLabel'
import InputWrapper from './common/InputWrapper'
import { InputError } from './common/InputError'

export interface NumberInputConfig {
  inputType: InputType.number
}

function NumberInputInternal(props: InputProps<AnyFormikValue>): JSX.Element {
  const { readonly, path, input } = props
  const { label = '', required, placeholder, description } = input

  return (
    <InputWrapper>
      <FormField
        name={path}
        render={({ field }) => (
          <FormItem>
            <InputLabel label={label} description={description} required={required} />
            <FormControl>
              <Input placeholder={placeholder} {...field} disabled={readonly} type="number" />
            </FormControl>
            <InputError />
          </FormItem>
        )}
      />
    </InputWrapper>
  )
}

export class NumberInput extends InputComponent<AnyFormikValue> {
  public internalType = InputType.number

  renderComponent(props: InputProps<AnyFormikValue>): JSX.Element {
    return <NumberInputInternal {...props} />
  }
}
