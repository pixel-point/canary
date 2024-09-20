/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { InputComponent, InputProps, RenderInputs } from '@harnessio/forms'
import type { AnyFormikValue } from '@harnessio/forms'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@harnessio/canary'
import { InputType } from './types'
import InputLabel from './common/InputLabel'

export interface GroupInputConfig {
  inputType: InputType.group
}

function GroupInputInternal(props: InputProps<AnyFormikValue>): JSX.Element {
  const { input, factory } = props
  const { label = '', inputs = [], required, description } = input

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={'group'}>
        <AccordionTrigger>
          <InputLabel label={label} required={required} description={description} />
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <RenderInputs items={inputs} factory={factory} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export class GroupInput extends InputComponent<AnyFormikValue> {
  public internalType = InputType.group

  constructor() {
    super()
  }

  renderComponent(props: InputProps<AnyFormikValue>): JSX.Element {
    return <GroupInputInternal {...props} />
  }
}
