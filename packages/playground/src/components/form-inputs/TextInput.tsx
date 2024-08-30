import React from 'react'
import { FormControl, FormField, FormItem, Input } from '@harnessio/canary'
import { InputType } from './types'
import { InputComponent, InputProps } from '@harnessio/forms'
import type { AnyFormikValue } from '@harnessio/forms'
import InputLabel from './common/InputLabel'
import InputWrapper from './common/InputWrapper'
import { InputError } from './common/InputError'

export interface TextInputConfig {
  inputType: InputType.string
}

function TextInputInternal(props: InputProps<AnyFormikValue>): JSX.Element {
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
              <Input placeholder={placeholder} {...field} disabled={readonly} />
            </FormControl>
            <InputError />
          </FormItem>
        )}
      />
    </InputWrapper>
  )
}

export class TextInput extends InputComponent<AnyFormikValue> {
  public internalType = InputType.string

  renderComponent(props: InputProps<AnyFormikValue>): JSX.Element {
    return <TextInputInternal {...props} />
  }
}
