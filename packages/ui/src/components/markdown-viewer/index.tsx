import { CSSProperties, FC, Fragment, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CopyButton, ImageCarousel } from '@/components'
import MarkdownPreview from '@uiw/react-markdown-preview'
import rehypeExternalLinks from 'rehype-external-links'
import { getCodeString, RehypeRewriteOptions } from 'rehype-rewrite'
import rehypeSanitize from 'rehype-sanitize'
import rehypeVideo from 'rehype-video'

import './style.css'

import { cn } from '@utils/cn'

import { CodeSuggestionBlock, SuggestionBlock } from './CodeSuggestionBlock'

// TODO: add ai stuff at a later point for code suggestions
// import type { SuggestionBlock } from 'components/SuggestionBlock/SuggestionBlock'
// import { CodeSuggestionBlock } from './CodeSuggestionBlock'

const isHeadingElement = (tagName: string) => /^h(1|2|3|4|5|6)/.test(tagName)
const isRelativeLink = (href: string) =>
  href && !href.startsWith('/') && !href.startsWith('#') && !/^https?:|mailto:|tel:|data:|javascript:|sms:/.test(href)

interface MarkdownViewerWrapperProps {
  children: ReactNode
}

const MarkdownViewerWrapper: FC<MarkdownViewerWrapperProps> = ({ children }) => {
  return <div className="rounded-b-md border-x border-b bg-background-1 p-6">{children}</div>
}

interface MarkdownViewerProps {
  source: string
  maxHeight?: string | number
  withBorderWrapper?: boolean
  // TODO: add ai stuff at a later point for code suggestions
  suggestionBlock?: SuggestionBlock
  suggestionCheckSum?: string
  isSuggestion?: boolean
  markdownClassName?: string
}

export function MarkdownViewer({
  source,
  maxHeight,
  withBorderWrapper = false,
  suggestionBlock,
  suggestionCheckSum,
  isSuggestion,
  markdownClassName
}: MarkdownViewerProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [imgEvent, setImageEvent] = useState<string[]>([])
  const refRootHref = useMemo(() => document.getElementById('repository-ref-root')?.getAttribute('href'), [])
  const ref = useRef<HTMLDivElement>(null)
  const [initialSlide, setInitialSlide] = useState<number>(0)

  const styles: CSSProperties = maxHeight ? { maxHeight } : {}
  const Wrapper = withBorderWrapper ? MarkdownViewerWrapper : Fragment

  const rewriteRelativeLinks = useCallback(
    (href: string) => {
      try {
        if (href.startsWith('./')) {
          href = href.replace('./', '')
        }

        const fullUrl = new URL(window.location.href + '/' + href)
        if (fullUrl.origin === window.location.origin) {
          const currentPath = window.location.href.split('~/')[1] ?? ''
          const replaceReadmeText = currentPath.replace('README.md', '')
          const newUrl = '/~/' + (currentPath && !currentPath.includes(href) ? replaceReadmeText + '/' : '') + href

          return (refRootHref + newUrl.replace(/\/\//g, '/')).replace(/^\/ng\//, '/')
        }

        return href
      } catch (error) {
        console.warn('Error rewriting relative link:', error)
        return href
      }
    },
    [refRootHref]
  )

  /**
   * Rewrite links nodes
   */
  const rehypeRewrite: RehypeRewriteOptions['rewrite'] = useCallback(
    (node, _index, parent) => {
      if (node.type === 'element' && node?.tagName === 'a') {
        // Remove links from titles
        if (parent && parent.type === 'element' && isHeadingElement(parent.tagName)) {
          parent.children = parent.children.slice(1)
        }

        // TODO: I'm not sure under what circumstances the condition for having an ID repository-ref-root would be met; I don't know why this code was written.
        if (refRootHref) {
          // Rewriting relative links
          const { properties } = node as unknown as { properties: { href: string } }
          if (properties?.href && isRelativeLink(properties.href)) {
            properties.href = rewriteRelativeLinks(properties.href)
          }
        }
      }
    },
    [refRootHref, rewriteRelativeLinks]
  )

  const interceptClickEventOnViewerContainer = useCallback(
    (event: MouseEvent) => {
      const { target } = event

      const imgTags = ref.current?.querySelectorAll<HTMLImageElement>('.wmde-markdown img') || []

      if (target instanceof HTMLImageElement && !!imgTags.length) {
        const imgsArr: string[] = Array.from(imgTags).map(img => img.src)
        const dataSrc = target.getAttribute('src')
        const index = imgsArr.findIndex(val => val === dataSrc)

        setImageEvent(imgsArr)
        setInitialSlide(index > -1 ? index : 0)
        setIsOpen(true)
      }

      if (target instanceof HTMLAnchorElement) {
        const href = target.getAttribute('href')
        if (href && !/^https?:\/\//.test(href)) {
          event.preventDefault()
          if (href.startsWith('#')) {
            document.getElementById(href.slice(1))?.scrollIntoView()
          } else {
            const newUrl = new URL(target.href)
            navigate(newUrl.pathname)
          }
        }
      }
    },
    [navigate]
  )

  useEffect(() => {
    const container = ref.current

    if (container) {
      container.addEventListener('click', interceptClickEventOnViewerContainer)

      return () => {
        container.removeEventListener('click', interceptClickEventOnViewerContainer)
      }
    }
  }, [interceptClickEventOnViewerContainer])

  return (
    <Wrapper>
      <div ref={ref} style={styles}>
        <MarkdownPreview
          source={source}
          className={cn('prose prose-invert', markdownClassName)}
          rehypeRewrite={rehypeRewrite}
          rehypePlugins={[
            rehypeSanitize,
            [rehypeVideo, { test: /\.(mp4|mov|webm|mkv|flv)$/ }],
            [rehypeExternalLinks, { rel: ['nofollow noreferrer noopener'], target: '_blank' }]
          ]}
          components={{
            pre: ({ children, node }) => {
              const code = node && node.children ? getCodeString(node.children) : (children as string)

              return (
                <div className="relative">
                  <CopyButton
                    className="absolute right-3 top-3 z-[1] size-6 bg-background-3"
                    buttonVariant="outline"
                    name={code}
                    iconSize={13}
                  />
                  <pre>{children}</pre>
                </div>
              )
            },
            // Rewriting the code component to support code suggestions
            code: ({ children = [], className: _className, ...props }) => {
              const code = props.node && props.node.children ? getCodeString(props.node.children) : children

              if (
                typeof code === 'string' &&
                isSuggestion &&
                typeof _className === 'string' &&
                'language-suggestion' === _className.split(' ')[0].toLocaleLowerCase()
              ) {
                return (
                  <CodeSuggestionBlock
                    code={code}
                    suggestionBlock={suggestionBlock}
                    suggestionCheckSum={suggestionCheckSum}
                  />
                )
              }

              return <code className={String(_className)}>{children}</code>
            }
          }}
        />

        <ImageCarousel
          isOpen={isOpen && !!imgEvent.length}
          setIsOpen={setIsOpen}
          imgEvent={imgEvent}
          initialSlide={initialSlide}
        />
      </div>
    </Wrapper>
  )
}
