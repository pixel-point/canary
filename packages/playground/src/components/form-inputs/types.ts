import type { BooleanInputConfig } from './BooleanInput'
import type { TextInputConfig } from './TextInput'
import type { NumberInputConfig } from './NumberInput'
import type { ArrayInputConfig } from './ArrayInput'
import type { ListInputConfig } from './ListInput'

export enum InputType {
  boolean = 'boolean',
  string = 'string',
  number = 'number',
  array = 'array',
  list = 'list'
}

export type InputConfigType =
  | BooleanInputConfig
  | TextInputConfig
  | NumberInputConfig
  | ArrayInputConfig
  | ListInputConfig
