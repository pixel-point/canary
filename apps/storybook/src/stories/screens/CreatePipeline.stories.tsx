import React from 'react'
import Container from '../../components/layout/container'
import View from '../../components/layout/View'
import Section from '../../components/layout/Section'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessNoActionTopBar } from '../components/TopBar.stories'
import { Button, Card } from '@harnessio/canary'
import SparklesIcon from '../../assets/sparkles-icon.svg?react'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import {CreatePipelineResourcesCard} from './widgets/CreatePipelineResourcesCard'
import NodeLogo from '../../assets/node-logo.svg?react'
import PythonLogo from '../../assets/python-logo.svg?react'
import PythonNodeLogos from '../../assets/node-python-logos.svg?react'
import { CreatePipelineTemplateCard } from './widgets/CreatePipelineTemplateCard'
import CardList from '../composites/CardList'
import QuickStartIcon from '../../assets/documentation-quickstart-icon.svg?react'
import CardListAction from '../../assets/cardlist-action.svg?react'

export default {
  title: 'Screens/Pipeline',
  parameters: {
    layout: 'fullscreen'
  }
}

interface TemplateCardsProps {
  title: string;
  logo: React.ReactElement<SVGSVGElement>;
  logoClass?: string
}

export function CreatePipeline() {
  const templateCards:TemplateCardsProps[] = [
    { title: 'Node.js', logo: <NodeLogo /> },
    { title: 'Python', logo: <PythonLogo /> },
    { title: 'Python and Node.js', logo: <PythonNodeLogos />, logoClass: 'h-[92px]'  }
  ]

  return (
    <Container.Root>
      <Container.Sidebar>
        <GitnessNavbar />
      </Container.Sidebar>
      <Container.Main>
        <Container.Topbar>
          <GitnessNoActionTopBar />
        </Container.Topbar>
        <Container.Content>
          <View.Root>
            <Section.Root firstSection>
              <Section.Header>
                <p className='section-title'>Create your pipeline</p>
                <p className="section-description max-w-[50%]">It’s very simple to start using Gitness. Allow our AI to create your pipeline based on the code base or start from a clean state.</p>
              </Section.Header>
              <div className='flex gap-3 mt-3'>
                {/* TODO: Needs new shad button variant creating for these two below */}
                <Button variant="outline" size="default" borderRadius="full" className='self-start font-light border-primary'>
                  <SparklesIcon className="w-6 h-6" />&nbsp;Create with AI
                </Button>
                <Button variant="outline" size="default" borderRadius="full" className='self-start font-light border-secondary'>
                  Start from scratch
                </Button>
              </div>
            </Section.Root>
            <Section.Root topBorder>
              <Section.Header>
                <div className="flex gap-3 justify-between items-baseline">
                  <p className='section-title-small'>Don't know where to start? Use a template...</p>
                  <Button variant="link" size="sm" className="self-start p-0">
                    See all templates
                    <ChevronRightIcon className="w-3 h-3" />
                  </Button>
                </div>
              </Section.Header>
              <Section.CardGrid>
                {templateCards.map((card, index) => (
                  <Card key={index} className='bg-[#131316] border-[#1D1D20]'>
                    <CreatePipelineTemplateCard title={card.title} logo={card.logo} logoClass={card.logoClass? card.logoClass : ''} />
                  </Card>
                ))}
              </Section.CardGrid>
            </Section.Root>
            <Section.Root topBorder>
              <Section.CardGrid className="auto-cols-[1fr]">
                <CreatePipelineResourcesCard />
                {/* TODO: Needs new shad card variant creating for these two below */}
                <Card className='bg-[#131316] border-[#1D1D20]'>
                  {/* Make widget */}
                  <CardList.Root>
                    <CardList.Header title="Documentation" action={<CardListAction />} />
                    <CardList.Items>
                      <CardList.Item
                        icon={<QuickStartIcon />}
                        title="Quick start"
                        description="Viverra pellentesque vel"
                      />
                      <CardList.Item
                        icon={<QuickStartIcon />}
                        title="Cloning"
                        description="Netus vel purus at ultricies"
                      />
                      <CardList.Item
                        icon={<QuickStartIcon />}
                        title="Pull requests"
                        description="Description"
                      />
                    </CardList.Items>
                  </CardList.Root>
                  {/* EOF Make widget */}
                </Card>
                <Card className='bg-[#131316] border-[#1D1D20]'>
                  {/* Make widget */}
                  <CardList.Root>
                    <CardList.Header title="Guides" action={<CardListAction />} />
                    <CardList.Items>
                      <CardList.Item
                        icon={<QuickStartIcon />}
                        title="Matrix strategy"
                        description="Viverra pellentesque vel"
                      />
                      <CardList.Item
                        icon={<QuickStartIcon />}
                        title="Secrets management"
                        description="Netus vel purus at ultricies"
                      />
                      <CardList.Item
                        icon={<QuickStartIcon />}
                        title="Conditional logic"
                        description="Nec tellus eu turpis"
                      />
                    </CardList.Items>
                  </CardList.Root>
                  {/* EOF Make widget */}
                </Card>
              </Section.CardGrid>
            </Section.Root>
          </View.Root>
        </Container.Content>
      </Container.Main>
    </Container.Root>
  )
}
