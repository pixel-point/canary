import React from 'react'

interface PageProps {
  placeholder: string
  children: React.ReactNode
  useAIButton?: React.ReactNode
  useManualButton?: React.ReactNode
}

function AIPrompt({ ...props }: PageProps) {
  const { children, useAIButton, useManualButton } = props

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-3 border rounded-full py-0.5 pr-1 flex-grow">
        {children}
        {useAIButton && <>{useAIButton}</>}
      </div>
      {useManualButton && <>{useManualButton}</>}
    </div>
  )
}

export { AIPrompt }
