import { Badge, Navbar, Icon } from '@harnessio/canary'
import React from 'react'

export default function HomePage() {
  return (
    <div>
      <p className='text-destructive'>Home page</p>
      <Badge>Badge</Badge>
      <Navbar.Root>
        <Navbar.Header>Header</Navbar.Header>
        <Navbar.Content>Content</Navbar.Content>
        <Navbar.Footer>Footer</Navbar.Footer>
        </Navbar.Root>
      <Icon name='award' />
    </div>
  )
}
