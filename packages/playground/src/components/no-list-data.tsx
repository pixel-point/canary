import React from 'react'
import { Icon, Text, Button, cn } from '@harnessio/canary'
import PlaygroundListSettings from '../components/playground/list-settings'
import { NavLink } from 'react-router-dom'

export interface NoListDataProps {
  title: string
  iconName?: 'no-data-folder' | 'no-search-magnifying-glass' | 'no-data-merge' | 'no-data-cog'
  iconSize?: number
  description: string[]
  primaryButton?: {
    label: string
    to?: string
  }
  secondaryButton?: {
    label: string
    to?: string
  }
  insideTabView?: boolean
  listState?: string
  setListState?: React.Dispatch<React.SetStateAction<string>>
}

const NoListData: React.FC<NoListDataProps> = ({
  listState,
  setListState,
  iconName,
  iconSize = 112,
  title,
  description,
  primaryButton,
  secondaryButton,
  insideTabView = false
}) => {
  return (
    <div
      className={cn('w-full h-full flex flex-col place-content-center place-items-center', {
        'py-20 pb-24': insideTabView
      })}>
      {iconName && <Icon name={iconName} size={iconSize} />}
      <div className="flex flex-col gap-4 place-content-center place-items-center ">
        <Text size={5} weight="medium">
          {title}
        </Text>
        {description && (
          <div className="flex flex-col">
            {description.map((line, index) => (
              <Text key={index} size={2} weight="normal" align="center" className="text-tertiary-background">
                {line}
              </Text>
            ))}
          </div>
        )}
        {(primaryButton || secondaryButton) && (
          <div className="mt-3.5 flex gap-4">
            {primaryButton && (
              <Button size="lg" asChild>
                <NavLink to={primaryButton.to || '/</Button>'}>{primaryButton.label}</NavLink>
              </Button>
            )}
            {secondaryButton && (
              <Button variant="outline" size="lg" asChild>
                <NavLink to={secondaryButton.to || '/</Button>'}>{secondaryButton.label}</NavLink>
              </Button>
            )}
          </div>
        )}
      </div>
      {listState && setListState && <PlaygroundListSettings listState={listState} setListState={setListState} />}
    </div>
  )
}

export default NoListData