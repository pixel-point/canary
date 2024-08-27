import React from 'react'
import NoListData, { NoListDataProps } from './no-list-data'

interface NoSearchResultsProps extends Omit<NoListDataProps, 'iconSize'> {
  iconSize?: number
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({
  iconName,
  iconSize = 112,
  title,
  description,
  primaryButton,
  secondaryButton
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center border rounded-md py-20 pb-24">
      <NoListData
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

export default NoSearchResults
