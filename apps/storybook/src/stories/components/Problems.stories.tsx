import { Meta, StoryObj } from '@storybook/react'
import { Problem, Problems, ProblemsProps, Severity } from '../../composites/Problems'

const meta: Meta<ProblemsProps> = {
  title: 'Composites/Problems',
  component: Problems,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Problems component`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    problems: { control: 'object', description: 'Array of problems' },
    selectedProblemIdx: { control: 'number' }
  }
}

export default meta

const problems: Problem[] = [
  { message: 'Error 1', position: { row: 20, column: 30 }, severity: Severity.ERROR },
  { message: 'Error 2', position: { row: 20, column: 30 }, severity: Severity.ERROR },
  { message: 'Warning 1', position: { row: 20, column: 30 }, severity: Severity.WARNING },
  {
    message:
      'Warning  looooong lineeeeeeeeeeee looooong looooong lineeeeeeeeeeee looooong  looooong lineeeeeeeeeeee looooong looooong lineeeeeeeeeeee looooong lineeeeeeeeeeeelooooong lineeeeeeeeeeeelooooong lineeeeeeeeeeeelooooong lineeeeeeeeeeee  2',
    position: { row: 20, column: 30 },
    severity: Severity.WARNING
  },
  { message: 'Info 1', position: { row: 20, column: 30 }, severity: Severity.INFO },
  { message: 'Info 2', position: { row: 20, column: 30 }, severity: Severity.INFO }
]

export const Default: StoryObj<ProblemsProps> = {
  args: {
    problems
  }
}
