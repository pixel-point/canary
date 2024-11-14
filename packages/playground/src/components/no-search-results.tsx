import React from 'react'
import { NoData, NoDataProps } from './no-data'

interface NoSearchResultsProps extends Omit<NoDataProps, 'iconSize'> {
  iconSize?: number
}

export const NoSearchResults: React.FC<NoSearchResultsProps> = ({
  iconName,
  iconSize = 112,
  title,
  description,
  primaryButton,
  secondaryButton
}: NoSearchResultsProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center border rounded-md pt-[6.25rem] pb-[9.75rem]">
      <NoData
        iconName={iconName}
        iconSize={iconSize}
        title={title}
        description={description}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
      />
    </div>
  )
}
