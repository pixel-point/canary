/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { useEffect, useState } from 'react'
import { get } from 'lodash-es'
import { InputComponent, InputProps, RenderInputs, useFormContext } from '@harnessio/forms'
import type { AnyFormikValue } from '@harnessio/forms'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Icon } from '@harnessio/canary'
import { InputType } from './types'
import InputLabel from './common/InputLabel'
import { Layout } from '../layout/layout'

export interface GroupInputConfig {
  inputType: InputType.group
}

function GroupInputInternal(props: InputProps<AnyFormikValue>): JSX.Element {
  const { input, factory, path } = props
  const { label = '', inputs = [], required, description } = input

  const { formState } = useFormContext()
  const error = get(formState.errors, path)

  // NOTE: consider: if group is open hide error as it will be visible in the form
  //const [isOpen, setIsOpen] = useState<boolean>(false)

  // TODO: WORKAROUND/POC
  const [forceMount, setForceMount] = useState<true | undefined>(true)
  useEffect(() => {
    setForceMount(undefined)
  }, [])

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-muted/30 w-full px-3"
      // onValueChange={value => setIsOpen(!!value)}
    >
      <AccordionItem value={'group'} className="border-b-0">
        <AccordionTrigger>
          <Layout.Horizontal className="items-center">
            <InputLabel label={label} required={required} description={description} />
            {error && <Icon name="triangle-warning" className="text-destructive" />}
          </Layout.Horizontal>
        </AccordionTrigger>
        <AccordionContent className="space-y-4" forceMount={forceMount}>
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
