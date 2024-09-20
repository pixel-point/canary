import React from 'react'
import { CanaryOutletFactory, CanaryOutletName, Icon } from '@harnessio/canary'

CanaryOutletFactory.registerOutlet(CanaryOutletName.SPLIT_ICON, () => {
  return <Icon name="chevron-down" />
})
