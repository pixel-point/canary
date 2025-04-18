import { StyledLink } from '@/components'

export function Agreements() {
  return (
    <span className="relative z-10 mt-auto text-center text-1 leading-tight text-cn-foreground-3">
      By joining, you agree to <StyledLink to="https://harness.io/subscriptionterms">Terms of Service</StyledLink>{' '}
      and&nbsp;
      <StyledLink to="https://harness.io/privacy">Privacy Policy</StyledLink>
    </span>
  )
}
