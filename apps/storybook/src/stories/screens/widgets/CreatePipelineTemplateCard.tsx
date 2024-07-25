import React from 'react'

interface CardProps {
  title?: string
  logo: React.ReactElement<SVGSVGElement>
  logoClass?: string
  bgBlur?: string
}

export function CreatePipelineTemplateCard({ bgBlur = '', title = '', logo, logoClass }: CardProps) {
  const logoWithClass = React.cloneElement(logo, {
    className: logoClass || 'w-[92px] h-[92px]'
  })

  const path: string = '../../../src/assets/'

  return (
    <div className="relative grid h-full w-full grid-rows-[1fr_auto] select-none cursor-pointer overflow-hidden">
      <div className="absolute z-10 overflow-hidden inset-0 h-full w-full">
        <div className="absolute z-10 inset-0 bg-[#0F0F11]" />
        <img className="absolute z-20 inset-0 h-full w-full bg-cover opacity-100 blur-sm" src={path + bgBlur} />
      </div>

      <div className="flex z-20 items-center justify-center">{logoWithClass}</div>
      {title && (
        <div className="flex z-30 px-4 py-3">
          <p className="text-base font-normal -tracking-[2%] text-primary">{title}</p>
        </div>
      )}
    </div>
  )
}
