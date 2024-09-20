import type { BooleanInputConfig } from './BooleanInput'
import type { TextInputConfig } from './TextInput'
import type { NumberInputConfig } from './NumberInput'
import type { ArrayInputConfig } from './ArrayInput'
import type { ListInputConfig } from './ListInput'
import type { TextAreaInputConfig } from './TextAreaInput'
import type { GroupInputConfig } from './GroupInput'
import type { SelectInputConfig } from './SelectInput'

export enum InputType {
  boolean = 'boolean',
  text = 'text',
  number = 'number',
  array = 'array',
  list = 'list',
  group = 'group',
  textarea = 'textarea',
  select = 'select'
}

export type InputConfigType =
  | BooleanInputConfig
  | TextInputConfig
  | TextAreaInputConfig
  | NumberInputConfig
  | ArrayInputConfig
  | ListInputConfig
  | GroupInputConfig
  | SelectInputConfig
