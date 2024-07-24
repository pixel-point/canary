import { Meta, StoryFn } from '@storybook/react'
import { Footer, Severity } from '../../../src/composites/footer/footer'

export default {
  title: 'Composites/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Page footer`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: StoryFn = () => (
  <Footer
    problems={{ [Severity.ERROR]: 5, [Severity.WARNING]: 15, [Severity.INFO]: 25 }}
    commitHistory={{ lastCommittedAt: 1721774796000, lastCommittedBy: 'Olivia Smith' }}
  />
)

export const Default = Template.bind({})
Default.args = {}
