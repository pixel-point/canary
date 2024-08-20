import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@harnessio/canary'
import { XmarkCircle } from '@harnessio/icons-noir'

export type VisualYamlValue = 'visual' | 'yaml'

interface VisualYamlToggleProps {
  view: VisualYamlValue
  setView: (view: VisualYamlValue) => void
  isYamlValid: boolean
}

export const VisualYamlToggle = (props: VisualYamlToggleProps): JSX.Element => {
  const { view, setView, isYamlValid } = props
  return (
    <ToggleGroup
      onValueChange={value => {
        if (value) {
          setView(value as VisualYamlValue)
        }
      }}
      value={view}
      type="single"
      unselectable={'on'}
      className={'bg-neutral-900 p-1 border border-white/10 border-solid rounded-lg'}>
      <ToggleGroupItem
        disabled={!isYamlValid}
        value={'visual'}
        className="h-7 border border-transparent data-[state=on]:border-white/10 border-solid rounded-md disabled:opacity-100">
        {!isYamlValid && <XmarkCircle className="mr-1 text-[#f76e6e]" />}
        Visual
      </ToggleGroupItem>
      <ToggleGroupItem
        value={'yaml'}
        className="h-7 border border-transparent data-[state=on]:border-white/10 border-solid rounded-md">
        YAML
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
