<<<<<<< HEAD
import { Icon, Text, Button, cn, IconProps } from '@harnessio/canary'
=======
import React from 'react'
import type { IconProps } from '@harnessio/canary'
import { Icon, Text, Button, cn } from '@harnessio/canary'
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
import { NavLink } from 'react-router-dom'

export interface NoDataProps {
  title: string
  iconName?:
    | Pick<IconProps, 'name'>
    | 'no-data-folder'
    | 'no-search-magnifying-glass'
    | 'no-data-merge'
    | 'no-data-cog'
    | 'no-data-webhooks'
    | 'no-data-branches'
    | 'no-data-members'
  iconSize?: number
  description: string[]
  primaryButton?: {
    label: string
    onClick?: () => void
    to?: string
  }
  secondaryButton?: {
    label: string
    to?: string
    onClick?: () => void
  }
  insideTabView?: boolean
  loadState?: string
  setLoadState?: React.Dispatch<React.SetStateAction<string>>
}

export const NoData: React.FC<NoDataProps> = ({
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
      className={cn('flex h-full w-full flex-col place-content-center place-items-center gap-4', {
        'py-20 pb-24': insideTabView
      })}>
      {iconName && <Icon name={iconName as IconProps['name']} size={iconSize} />}
      <div className="flex flex-col place-content-center place-items-center gap-2.5">
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
          <div className="mt-4 flex gap-[1.125rem]">
            {primaryButton &&
              (primaryButton.to ? (
                <Button asChild onClick={primaryButton.onClick}>
                  <NavLink to={primaryButton.to}>{primaryButton.label}</NavLink>
                </Button>
              ) : (
                <Button onClick={primaryButton.onClick}>{primaryButton.label}</Button>
              ))}
            {secondaryButton &&
              (secondaryButton.to ? (
                <Button variant="outline" asChild onClick={secondaryButton.onClick}>
                  <NavLink to={secondaryButton.to || '/</Button>'}>{secondaryButton.label}</NavLink>
                </Button>
              ) : (
                <Button variant="outline" onClick={secondaryButton.onClick}>
                  {secondaryButton.label}
                </Button>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
