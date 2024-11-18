import type { UseFormReturn, InputProps, AnyFormikValue } from '@harnessio/forms'
import { InputType } from './types'
import { FormControl, FormField, FormItem, Switch } from '@harnessio/canary'
import { InputComponent } from '@harnessio/forms'
import InputLabel from './common/InputLabel'
import InputWrapper from './common/InputWrapper'
import { InputError } from './common/InputError'

export interface BooleanInputConfig {
  inputType: InputType.boolean
  inputConfig?: {
    onChange: (value: AnyFormikValue, formik: UseFormReturn) => void
  }
}

function BooleanInputInternal(props: InputProps<AnyFormikValue, BooleanInputConfig>): JSX.Element {
  const { readonly, path, input } = props
  const { label = '', required, description } = input

  return (
    <InputWrapper>
      <FormField
        name={path}
        render={({ field }) => (
          <FormItem className="flex space-x-2 space-y-0">
            <FormControl>
              <Switch
                disabled={readonly}
                checked={field.value}
                onCheckedChange={value => {
                  field.onChange(value)
                }}
              />
            </FormControl>
            <InputLabel label={label} required={required} description={description} />
            <InputError />
          </FormItem>
        )}
      />
    </InputWrapper>
  )
}

export class BooleanInput extends InputComponent<AnyFormikValue> {
  public internalType = InputType.boolean

  renderComponent(props: InputProps<AnyFormikValue, BooleanInputConfig>): JSX.Element {
    return <BooleanInputInternal {...props} />
  }
}
