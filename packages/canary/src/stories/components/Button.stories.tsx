import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button, type ButtonProps } from '../../components/button'
import { Download, MailOpen, Refresh, RefreshDouble } from '@harnessio/icons-noir'
import { CanaryOutletFactory, CanaryOutletName } from '@/lib/CanaryOutletFactory'

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Displays a button or a component that looks like a button.`
      }
    }
  },
  tags: ['autodocs'],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    asChild: { control: 'boolean' },
    children: { control: 'object', description: 'Children. Can be any `ReactNode`' }
  },

  args: { onClick: fn() }
}

export default meta

export const Primary: StoryObj<ButtonProps> = {
  args: {
    children: 'Primary'
  }
}

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}

export const Outline: StoryObj<ButtonProps> = {
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}

export const Ghost: StoryObj<ButtonProps> = {
  args: {
    variant: 'ghost',
    children: 'Ghost'
  }
}

export const Link: StoryObj<ButtonProps> = {
  args: {
    variant: 'link',
    children: 'Link'
  }
}

export const Destructive: StoryObj<ButtonProps> = {
  args: {
    variant: 'destructive',
    children: 'Destructive'
  }
}

export const Large: StoryObj<ButtonProps> = {
  args: {
    size: 'lg',
    children: 'Large'
  }
}

export const Small: StoryObj<ButtonProps> = {
  args: {
    size: 'sm',
    children: 'Small'
  }
}

export const WithIcon: StoryObj<ButtonProps> = {
  args: {
    children: (
      <>
        <MailOpen strokeWidth="2" className="mr-2" />
        Login with Email
      </>
    )
  }
}

export const IconOnly: StoryObj<ButtonProps> = {
  args: {
    size: 'icon',
    children: <Download strokeWidth="2" />
  }
}

CanaryOutletFactory.registerOutlet(CanaryOutletName.BUTTON_SPINNER, (props: ButtonProps) => {
  return <Refresh className={`${props.children ? 'mr-2 ' : ''}animate-spin`} />
})

export const Loading: StoryObj<ButtonProps> = {
  args: {
    loading: true,
    children: 'Please wait'
  },
  parameters: {
    docs: {
      description: {
        story: `You can register a default spinner to render when the button is loading using \`CanaryOutletFactory\`. 
        This is useful when you want to display a spinner inside the button using \`loading\` prop. 
        
**For example**:

\`\`\`tsx
import { Refresh } from '@harnessio/icons-noir'
import type { ButtonProps } from '@harnessio/canary'

CanaryOutletFactory.registerOutlet(CanaryOutletName.BUTTON_SPINNER, (props: ButtonProps) => {
  return <Refresh className={\`\${props.children ? 'mr-2 ' : ''}animate-spin\`} />
})

// Then: 

<Button loading>Please wait</Button>
  \`\`\`
        `
      }
    }
  }
}

export const IconOnlyLoading: StoryObj<ButtonProps> = {
  args: {
    loading: true
  }
}

export const LoadingWithCustomSpinner: StoryObj<ButtonProps> = {
  args: {
    disabled: true,
    children: (
      <>
        <RefreshDouble className="mr-2 animate-spin" />
        Please wait
      </>
    )
  }
}

export const AsChild: StoryObj<ButtonProps> = {
  args: {
    asChild: true,
    children: (
      <a>
        <Download strokeWidth="2" className="mr-2" />
        Download
      </a>
    )
  }
}
