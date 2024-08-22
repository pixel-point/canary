import { Button, Text } from '@harnessio/canary'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className="grid place-content-center justify-center w-screen h-screen gap-3">
      <Text size={6} weight="bold" align="center">
        Oops, we can't find it!
      </Text>
      <Text size={3} align="center" className="text-tertiary-background">
        Please check your link and try again.
      </Text>
      <Button asChild variant="default" className="mt-6 justify-self-center">
        <Link to="/">Home page</Link>
      </Button>
    </div>
  )
}
