import { forwardRef } from 'react'

import { Link } from '@components/link'
import { Slot } from '@radix-ui/react-slot'

export interface AlertLinkProps {
  to: string
  external?: boolean
  asChild?: boolean
  children: React.ReactNode
}

export const AlertLink = forwardRef<HTMLAnchorElement, AlertLinkProps>(
  ({ to, external = false, asChild = false, children }, ref) => {
    if (asChild) {
      return <Slot ref={ref}>{children}</Slot>
    }

    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    return (
      <Link variant="secondary" suffixIcon="arrow-to-top-right" to={to} ref={ref} {...externalProps}>
        {children}
      </Link>
    )
  }
)

AlertLink.displayName = 'AlertLink'
