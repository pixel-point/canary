import React from 'react'
import { RenderInputs } from '../RenderInputs/RenderInputs'
import type { IFormDefinition } from '../../types/types'
import type { InputFactory } from '../../core/factory/InputFactory'

export interface RenderFormProps {
  inputs: IFormDefinition
  factory: InputFactory
  className?: string
}

export function RenderForm(props: RenderFormProps): React.ReactElement {
  const { inputs, className, factory } = props

  return (
    <div className={className}>
      {inputs.hero}
      <RenderInputs items={inputs.inputs} factory={factory} />
    </div>
  )
}
