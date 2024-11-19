interface PageProps {
  placeholder: string
  children: React.ReactNode
  useAIButton?: React.ReactNode
  useManualButton?: React.ReactNode
}

function AIPrompt({ ...props }: PageProps) {
  const { children, useAIButton, useManualButton } = props

  return (
    <div className="flex items-center gap-4">
      <div className="flex grow items-center gap-3 rounded-full border py-0.5 pr-1">
        {children}
        {useAIButton && <>{useAIButton}</>}
      </div>
      {useManualButton && <>{useManualButton}</>}
    </div>
  )
}

export { AIPrompt }
