import React from 'react'

interface CardProps {
  title?: string
  logo: React.ReactElement<SVGSVGElement>
  logoClass?: string
}

export function CreatePipelineTemplateCard({ title = '', logo, logoClass }: CardProps) {
  const logoWithClass = React.cloneElement(logo, {
    className: logoClass || 'w-[92px] h-[92px]'
  })

  return (
    <div className="grid h-full w-full grid-rows-[1fr_auto] select-none cursor-pointer">
      <div className="flex items-center justify-center">{logoWithClass}</div>
      {title && (
        <div className="flex px-4 py-3">
          <p className="text-base font-normal -tracking-[2%] text-primary">{title}</p>
        </div>
      )}
    </div>
  )
}
