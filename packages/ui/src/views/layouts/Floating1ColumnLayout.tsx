import { cn } from '../../utils/cn'

type HighlightTheme = 'blue' | 'green' | 'error'

interface Floating1ColumnLayoutProps {
  className?: string
  children: React.ReactNode
  maxWidth?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  verticalCenter?: boolean
  as?: 'div' | 'section' | 'main'
  highlightTheme?: HighlightTheme
}

const widthClass = {
  default: 'max-w-[1200px]',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl'
}

export const Floating1ColumnLayout = ({
  className,
  maxWidth = 'default', // Default to 'default' key
  verticalCenter = false,
  children,
  as: Tag = 'div',
  highlightTheme
}: Floating1ColumnLayoutProps) => {
  const verticalCenterClass = verticalCenter ? 'flex items-center justify-center min-h-screen' : ''

  const computedClassName = cn('px-5 pb-8 mx-auto md:px-8', widthClass[maxWidth], verticalCenterClass, className)

  if (highlightTheme) {
    return (
      <HighlightedFloatingLayout className={computedClassName} theme={highlightTheme}>
        {children}
      </HighlightedFloatingLayout>
    )
  }

  return <Tag className={computedClassName}>{children}</Tag>
}

const highlightThemes = {
  blue: {
    topGradient: 'bg-[#798FD2]',
    topAdditionalGradient: 'bg-[#A0BADF]', // 27%
    bottomGradient: 'bg-[#799ED2]'
  },
  green: {
    topGradient: 'bg-[#70DCD3]',
    topAdditionalGradient: 'bg-[#A6E5F2]', // 27%
    bottomGradient: 'bg-[#70DCD3]'
  },
  error: {
    topGradient: 'bg-[#AD79D2]',
    topAdditionalGradient: 'bg-[#C5A0DF]', // 27%
    bottomGradient: 'bg-[#AD79D2]'
  }
}

interface HighlightedFloatingLayoutProps extends Floating1ColumnLayoutProps {
  theme: HighlightTheme
}

const HighlightedFloatingLayout = ({ children, className, theme = 'blue' }: HighlightedFloatingLayoutProps) => {
  const { topAdditionalGradient, topGradient, bottomGradient } = highlightThemes[theme]
  const isError = theme === 'error'

  return (
    <Floating1ColumnLayout className={cn(className, 'relative max-w-full overflow-hidden')}>
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <span
          className={cn(
            'absolute blur-[30px] top-0 left-1/2 -translate-y-1/2 w-[528px] h-[178px] rounded-[100%] opacity-10 mix-blend-plus-lighter',
            '[mask-image:radial-gradient(50%_50%_at_50%_50%,#000_30%,transparent_100%)]',
            'transition-[transform,background-color] ease-in-out duration-500',
            isError ? '-translate-x-[28%]' : ' -translate-x-[65%]',
            topAdditionalGradient
          )}
        />
        <span
          className={cn(
            'absolute blur-[30px] top-3.5 -translate-y-1/2 left-1/2 w-[895px] h-[377px] rounded-[100%] opacity-[0.14]',
            '[mask-image:radial-gradient(50%_50%_at_50%_50%,#000_0%,transparent_100%)]',
            'transition-[transform,background-color] ease-in-out duration-500',
            isError ? '-translate-x-[11%]' : ' -translate-x-[84.5%]',
            topGradient
          )}
        />
        <span
          className={cn(
            'absolute blur-[30px] bottom-0 translate-y-1/2 left-1/2 w-[895px] h-[261px] rounded-[100%] opacity-[0.08]',
            '[mask-image:radial-gradient(50%_50%_at_50%_50%,#000_0%,transparent_100%)]',
            'transition-[transform,background-color] ease-in-out duration-500',
            isError ? '-translate-x-[88.5%]' : ' -translate-x-[104px]',
            bottomGradient
          )}
        />
      </div>
      <span
        className="absolute pointer-events-none inset-0 bg-[url('/images/signin/noise.png')] bg-[size:100px_100px] bg-repeat opacity-70 mix-blend-overlay"
        aria-hidden
      />
      {children}
    </Floating1ColumnLayout>
  )
}
