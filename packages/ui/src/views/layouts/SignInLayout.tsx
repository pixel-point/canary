import { Link } from 'react-router-dom'

import { Floating1ColumnLayout } from '../'
import { Text } from '../../components'
import { cn } from '../../utils/cn'

interface SignInLayoutProps {
  className?: string
  children: React.ReactNode
  theme?: 'default' | 'green'
}

const themes = {
  default: {
    topGradient: 'bg-[radial-gradient(50%_50%_at_50%_50%,#AD79D2_0%,transparent_100%)]',
    topAdditionalGradient: 'bg-[radial-gradient(50%_50%_at_50%_50%,#C5A0DF_27.5%,transparent_100%)]',
    bottomGradient: 'bg-[radial-gradient(50%_50%_at_50%_50%,#AD79D2_0%,transparent_100%)]'
  },
  green: {
    topGradient: 'bg-[radial-gradient(50%_50%_at_50%_50%,#70DCD3_27.5%,transparent_100%)]',
    topAdditionalGradient: 'bg-[radial-gradient(50%_50%_at_50%_50%,#A6E5F2_0%,transparent_100%)]',
    bottomGradient: 'bg-[radial-gradient(50%_50%_at_50%_50%,#70DCD3_0%,transparent_100%)]'
  }
}

export const SignInLayout = ({ className, children, theme = 'default' }: SignInLayoutProps) => {
  return (
    <Floating1ColumnLayout
      className={cn('relative sm:pt-[186px] pt-20 flex-col max-w-full overflow-hidden bg-background-7', className)}
      verticalCenter
      as="main"
    >
      {children}
      <Text className="leading-tight mt-auto relative z-10" size={0} color="foreground-5" align="center">
        By joining, you agree to{' '}
        <Link className="text-foreground-1 whitespace-nowrap" to="/">
          Terms of Service
        </Link>{' '}
        and&nbsp;
        <Link className="text-foreground-1 whitespace-nowrap" to="/">
          Privacy Policy
        </Link>
      </Text>
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <span
          className={cn(
            'absolute -top-1.5 left-1/2 -translate-x-[65%] -translate-y-1/2 w-[528px] h-[178px] rounded-[100%] blur-[30px] opacity-[0.14]',
            themes[theme].topAdditionalGradient
          )}
        />
        <span
          className={cn(
            'absolute top-3 -translate-y-1/2 left-1/2 -translate-x-[84.5%] w-[895px] h-[377px] rounded-[100%]  blur-[30px] opacity-10',
            themes[theme].topGradient
          )}
        />
        <span
          className={cn(
            'absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-[104px] w-[895px] h-[261px] rounded-[100%] blur-[30px] opacity-[0.08]',
            themes[theme].bottomGradient
          )}
        />
      </div>
      <span
        className="absolute inset-0 bg-[url('/images/signin/noise.png')] bg-[size:100px_100px] bg-repeat opacity-70 mix-blend-overlay"
        aria-hidden
      />
    </Floating1ColumnLayout>
  )
}
