import React from 'react'
import { InputType } from './types'
import { InputComponent } from '@harnessio/forms'
import type { AnyFormikValue } from '@harnessio/forms'

import { Separator } from '../..'

export interface SeparatorInputConfig {
  inputType: InputType.separator
}

function SeparatorInputInternal(): JSX.Element {
  return <Separator className="my-4" />
}

export class SeparatorInput extends InputComponent<AnyFormikValue> {
  public internalType = InputType.separator

  renderComponent(): JSX.Element {
    return <SeparatorInputInternal />
  }
}
