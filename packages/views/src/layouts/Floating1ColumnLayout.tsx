import { cn } from '@harnessio/canary'

interface Floating1ColumnLayoutProps {
  className?: string
  children: React.ReactNode
  maxWidth?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  verticalCenter?: boolean
}

export const Floating1ColumnLayout = ({
  className,
  maxWidth = 'default', // Default to 'default' key
  verticalCenter = false,
  children
}: Floating1ColumnLayoutProps) => {
  const widthClass = {
    default: 'max-w-[1200px]',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }[maxWidth]

  const verticalCenterClass = verticalCenter ? 'flex items-center justify-center min-h-screen' : ''

  const computedClassName = cn('px-8 pb-8 mx-auto', widthClass, verticalCenterClass, className)

  return <div className={computedClassName}>{children}</div>
}
