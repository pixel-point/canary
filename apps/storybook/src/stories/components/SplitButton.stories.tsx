import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Download, MailOpen, Refresh, RefreshDouble, NavArrowDown } from '@harnessio/icons-noir'
import { SplitButton, type SplitButtonProps, type ButtonProps, Label, Input } from '@harnessio/canary'
import { CanaryOutletFactory, CanaryOutletName } from '@harnessio/canary'

CanaryOutletFactory.registerOutlet(CanaryOutletName.BUTTON_SPINNER, (props: ButtonProps) => {
  return <Refresh className={`${props.children ? 'mr-2 ' : ''}animate-spin`} />
})

CanaryOutletFactory.registerOutlet(CanaryOutletName.SPLIT_ICON, () => {
  return <NavArrowDown strokeWidth='2' />
})

const menu = <div className="grid gap-4">
<div className="space-y-2">
  <h4 className="font-medium leading-none">Dimensions</h4>
  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
</div>
<div className="grid gap-2">
  <div className="grid grid-cols-3 items-center gap-4">
    <Label htmlFor="width">Width</Label>
    <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
  </div>
  <div className="grid grid-cols-3 items-center gap-4">
    <Label htmlFor="maxWidth">Max. width</Label>
    <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
  </div>
  <div className="grid grid-cols-3 items-center gap-4">
    <Label htmlFor="height">Height</Label>
    <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
  </div>
  <div className="grid grid-cols-3 items-center gap-4">
    <Label htmlFor="maxHeight">Max. height</Label>
    <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
  </div>
</div>
</div>

const meta: Meta<SplitButtonProps> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Split button has an active button and a dropdown with it`
      }
    }
  },
  tags: ['autodocs'],

  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    children: { control: 'object', description: 'Children. Can be any `ReactNode`' },
    menu: { control: 'object', description: 'Children. Can be any `ReactNode`' },
    menuAlign: { control: 'select', options: ['start', 'end', 'center'] },    
  },

  args: { onClick: fn() }
}

export default meta

export const Primary: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    children: 'Primary'
  }
}

export const Secondary: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    variant: 'secondary',
    children: 'Secondary'
  }
}

export const Outline: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    variant: 'outline',
    children: 'Outline'
  }
}

// Colors don't look good for these variants
// export const Ghost: StoryObj<SplitButtonProps> = {
//   args: {
//     variant: 'ghost',
//     children: 'Ghost'
//   }
// }

// export const Link: StoryObj<SplitButtonProps> = {
//   args: {
//     variant: 'link',
//     children: 'Link'
//   }
// }

export const Destructive: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    variant: 'destructive',
    children: 'Destructive'
  }
}

export const Large: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    size: 'lg',
    children: 'Large'
  }
}

export const Small: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    size: 'sm',
    children: 'Small'
  }
}

export const WithIcon: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    children: (
      <>
        <MailOpen strokeWidth="2" className="mr-2" />
        Login with Email
      </>
    )
  }
}

export const IconOnly: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    children: <Download strokeWidth="2" />
  }
}

export const Loading: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
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
import type { SplitButtonProps } from '@harnessio/canary'

CanaryOutletFactory.registerOutlet(CanaryOutletName.BUTTON_SPINNER, (props: SplitButtonProps) => {
  return <Refresh className={\`\${props.children ? 'mr-2 ' : ''}animate-spin\`} />
})

// Then: 

<SplitButtonPropsSplitButton loading>Please wait</SplitButtonPropsSplitButton>
  \`\`\`
        `
      }
    }
  }
}

export const IconOnlyLoading: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    loading: true
  }
}

export const LoadingWithCustomSpinner: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    popoverContentClass: 'w-80',
    loading: true,
    spinner: <RefreshDouble className="mr-2 animate-spin" />,
    children: (
      <>        
        Please wait
      </>
    )
  }
}
