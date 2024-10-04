import React, { useEffect, useState } from 'react'
import { Text, Icon, cn } from '@harnessio/canary'
import copy from 'clipboard-copy'
import { ShaBadge } from '..'
import { Link } from 'react-router-dom'

export const CommitCopyActions = ({ sha }: { sha: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let timeoutId: number
    if (copied) {
      copy(sha)
      timeoutId = window.setTimeout(() => setCopied(false), 2500)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [copied])

  return (
    <ShaBadge.Root>
      <ShaBadge.Content>
        <Link to="#">
          <Text size={1} className="text-tertiary-background">
            {sha.substring(0, 6)}
          </Text>
        </Link>
      </ShaBadge.Content>
      <ShaBadge.Icon handleClick={() => setCopied(true)}>
        <Icon size={12} name={copied ? 'tick' : 'clone'} className={cn({ 'text-success': copied })} />
      </ShaBadge.Icon>
    </ShaBadge.Root>
  )
}
