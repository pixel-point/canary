import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@harnessio/canary'
import { Layout } from './layout/layout'

interface ContactCardProps {
  imgSrc: string
  authorName: string
  authorEmail: string
  fallback?: string | React.ReactNode
}

export const ContactCard: React.FC<ContactCardProps> = props => {
  const { imgSrc, fallback = 'user', authorName, authorEmail } = props
  return (
    <Layout.Horizontal gap="space-x-3">
      <Avatar>
        <AvatarImage src={imgSrc} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-white font-normal text-sm">{authorName}</span>
        <span className="text-white leading-3 text-xs">{authorEmail}</span>
      </div>
    </Layout.Horizontal>
  )
}
