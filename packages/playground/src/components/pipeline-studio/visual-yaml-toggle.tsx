import React from 'react'
import { ToggleGroup, ToggleGroupItem, Icon } from '@harnessio/canary'

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
      className={'bg-primary-foreground p-0.5 border border-primary/10 rounded-lg'}>
      <ToggleGroupItem
        disabled={!isYamlValid}
        value={'visual'}
        className="h-7 border border-transparent text-xs font-medium data-[state=on]:border-primary/10 rounded-md disabled:opacity-100">
        {!isYamlValid && <Icon name="x-mark" className="mr-1 text-destructive" />}
        Visual
      </ToggleGroupItem>
      <ToggleGroupItem
        value={'yaml'}
        className="h-7 border text-xs font-medium border-transparent data-[state=on]:border-white/10 text-tertiary-background data-[state=on]:text-primary rounded-md">
        YAML
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
