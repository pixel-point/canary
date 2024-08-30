import React from 'react'
import type { IInputDefinition } from '../../types/types'
import type { InputFactory } from '../../core/factory/InputFactory'
import { InputComponentRenderer } from '../../core/components/InputComponentRenderer'
//import { useRootFormikContext } from '../../core/context/RootFormikContext'

export interface InputRowProps {
  input: IInputDefinition
  factory: InputFactory
}

export function Row({ input, factory }: InputRowProps): React.ReactElement {
  const { prefix = '' } = {} //useRootFormikContext()

  return (
    <div>
      <InputComponentRenderer path={`${prefix}${input.path}`} factory={factory} readonly={false} input={input} />
    </div>
  )
}
