import { Link } from 'react-router-dom'

import { Text } from '../../../components'

export function Agreements() {
  return (
    <Text className="leading-tight mt-auto relative z-10" size={0} color="foreground-5" align="center">
      By joining, you agree to{' '}
      <Link
        className="underline decoration-transparent hover:decoration-foreground-1 transition-colors duration-200 underline-offset-4 decoration-1 text-foreground-1 whitespace-nowrap"
        to="/"
      >
        Terms of Service
      </Link>{' '}
      and&nbsp;
      <Link
        className="underline decoration-transparent hover:decoration-foreground-1 transition-colors duration-200 underline-offset-4 decoration-1 text-foreground-1 whitespace-nowrap"
        to="/"
      >
        Privacy Policy
      </Link>
    </Text>
  )
}
