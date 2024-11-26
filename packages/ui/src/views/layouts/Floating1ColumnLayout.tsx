import { cn } from '../../utils/cn'

interface Floating1ColumnLayoutProps {
  className?: string
  children: React.ReactNode
  maxWidth?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  verticalCenter?: boolean
  as?: 'div' | 'section' | 'main'
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
  as: Tag = 'div'
}: Floating1ColumnLayoutProps) => {
  const verticalCenterClass = verticalCenter ? 'flex items-center justify-center min-h-screen' : ''

  const computedClassName = cn('px-5 pb-8 mx-auto md:px-8', widthClass[maxWidth], verticalCenterClass, className)

  return <Tag className={computedClassName}>{children}</Tag>
}
