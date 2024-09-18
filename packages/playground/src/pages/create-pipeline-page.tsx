import React from 'react'
import {
  Spacer,
  Text,
  Section,
  ResourceBox,
  Button,
  Icon,
  SpotlightsBox,
  ButtonGroup,
  Input,
  AIPrompt
} from '@harnessio/canary'
import { Floating1ColumnLayout } from '../layouts/Floating1ColumnLayout'
import { Link } from 'react-router-dom'

const SectionList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-9 w-full">{children}</div>
)

type Template = {
  title: string
  highlightTop: string
  highlightBottom: string
  logoName: string
  href?: string
  logoSize?: number
}

const TemplateSection = () => {
  const templates: Template[] = [
    { title: 'Node.js', highlightTop: '#2ECC71', highlightBottom: '#262930', logoName: 'node-logo', href: '#' },
    { title: 'Python', highlightTop: '#3498DB', highlightBottom: '#262930', logoName: 'python-logo', href: '#' },
    {
      title: 'Python and Node.js',
      highlightTop: '#3498DB',
      highlightBottom: '#2ECC71',
      logoName: 'python-and-node-logo',
      logoSize: 140,
      href: '#'
    }
  ]

  return (
    <Section.Root>
      <Section.Header
        name="Don't know where to start? Use a template"
        action={
          <Link to="#">
            <ButtonGroup.Root verticalAlign="center" spacing="2">
              <Text as="p" size={2} weight="medium" className="text-primary/80">
                See all templates
              </Text>
              <Icon size={12} name="chevron-down" className="-rotate-90" />
            </ButtonGroup.Root>
          </Link>
        }
      />
      <Section.Content>
        {templates.map((template, index) => (
          <Link to={template.href || '#'}>
            <SpotlightsBox.Root
              key={index}
              logo={template.logoName}
              logoSize={template.logoSize}
              highlightTop={template.highlightTop}
              highlightBottom={template.highlightBottom}>
              <SpotlightsBox.Content>
                <Text size={3}>{template.title}</Text>
              </SpotlightsBox.Content>
            </SpotlightsBox.Root>
          </Link>
        ))}
      </Section.Content>
    </Section.Root>
  )
}

type ResourceItem = {
  title: string
  content: string
  href?: string
  iconName: string
}

type ResourceSectionData = {
  title: string
  items: ResourceItem[]
}

const ResourceSection = ({ title, items }: ResourceSectionData) => (
  <ResourceBox.Root>
    <ResourceBox.Header>
      <ResourceBox.HeaderTitle>
        <Text size={2} color="tertiaryBackground" weight="medium">
          {title}
        </Text>
      </ResourceBox.HeaderTitle>
      <ResourceBox.HeaderLink>
        <Button variant="ghost" size="sm_icon" asChild className="rounded-full bg-primary/5">
          <Link to="/#">
            <Icon name="circle-arrow-top-right" size={12} className="text-tertiary-background" />
          </Link>
        </Button>
      </ResourceBox.HeaderLink>
    </ResourceBox.Header>
    <ResourceBox.Content>
      <ResourceBox.List>
        {items.map((item, index) => (
          <Link to={item.href ?? '/#'} key={index}>
            <ResourceBox.ListItem iconName={item.iconName}>
              <Text size={2} color="primary" weight="medium">
                {item.title}
              </Text>
              <Text size={2} color="tertiaryBackground">
                {item.content}
              </Text>
            </ResourceBox.ListItem>
          </Link>
        ))}
      </ResourceBox.List>
    </ResourceBox.Content>
  </ResourceBox.Root>
)

const ResourceInfo = () => (
  <div className="flex flex-col justify-start pr-6">
    <Text size={4} weight="medium">
      Resources
    </Text>
    <Spacer size={3} />
    <Text size={2} className="text-primary/80">
      Explore more about Gitness and its architecture in the documentation.
    </Text>
    <Spacer size={6} />
    <DocumentationLink />
  </div>
)

const DocumentationLink = () => (
  <Link to="#">
    <ButtonGroup.Root verticalAlign="center" spacing="2">
      <Text as="p" size={2}>
        Read documentation
      </Text>
      <Icon size={12} name="chevron-down" className="-rotate-90" />
    </ButtonGroup.Root>
  </Link>
)

const ResourceSectionList = ({ sections }: { sections: ResourceSectionData[] }) => (
  <>
    {sections.map((section, index) => (
      <ResourceSection key={index} title={section.title} items={section.items} />
    ))}
  </>
)

export default function CreatePipelinePage() {
  const resourceSections: ResourceSectionData[] = [
    {
      title: 'Documentation',
      items: [
        { title: 'Quick start', content: 'Viverra pellentesque vel', href: '#', iconName: 'box-lightning' },
        { title: 'Cloning', content: 'Netus vel purus at ultricies', href: '#', iconName: 'box-cloning' },
        { title: 'Pull requests', content: 'Nec tellus eu turpis', href: '#', iconName: 'box-pull-requests' }
      ]
    },
    {
      title: 'Guides',
      items: [
        { title: 'Matrix strategy', content: 'Viverra pellentesque vel', href: '#', iconName: 'box-guide' },
        { title: 'Secrets management', content: 'Netus vel purus at ultricies', href: '#', iconName: 'box-guide' },
        { title: 'Conditional logic', content: 'Nec tellus eu turpis', href: '#', iconName: 'box-guide' }
      ]
    }
  ]

  return (
    <Floating1ColumnLayout>
      <Spacer size={16} />
      <Text as="p" size={6} weight="medium">
        Create your pipeline
      </Text>
      <Spacer size={3} />
      <Text as="p" size={2} weight="normal" className="max-w-[50%] text-primary/80">
        It's very simple to start using Playground. Allow our AI to create your pipeline based on the code base or start
        from a clean state.
      </Text>
      <Spacer size={8} />
      <AIPrompt
        placeholder="Start by describing your project goals or key requirements..."
        useAIButton={
          <Button variant="gradient-border" gradientType="ai-button" size="sm" borderRadius="full">
            <Icon name="ai-sparks" size={22} />
            <Text size={2} className="ml-1">
              Create with AI
            </Text>
          </Button>
        }
        useManualButton={
          <Button variant="outline" size="sm" borderRadius="full">
            Start from scratch
          </Button>
        }>
        <Input
          placeholder="Start by describing your project goals or key requirements..."
          className="pl-4 border-none rounded-full flex-grow"
        />
      </AIPrompt>
      <Spacer size={6} />
      <SectionList>
        <TemplateSection />
        <Section.Root>
          <Section.Content>
            <ResourceInfo />
            <ResourceSectionList sections={resourceSections} />
          </Section.Content>
        </Section.Root>
      </SectionList>
    </Floating1ColumnLayout>
  )
}
