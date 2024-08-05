import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Download, MailOpen, Refresh, RefreshDouble, NavArrowDown } from '@harnessio/icons-noir'
import { SplitButton, type SplitButtonProps, type ButtonProps, 
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
   } from '@harnessio/canary'
import { CanaryOutletFactory, CanaryOutletName } from '@harnessio/canary'

CanaryOutletFactory.registerOutlet(CanaryOutletName.BUTTON_SPINNER, (props: ButtonProps) => {
  return <Refresh className={`${props.children ? 'mr-2 ' : ''}animate-spin`} />
})

CanaryOutletFactory.registerOutlet(CanaryOutletName.SPLIT_ICON, () => {
  return <NavArrowDown strokeWidth='2' />
})

const menu = <>
<DropdownMenuLabel>My Account</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem>
      Profile
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Billing
      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Settings
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Keyboard shortcuts
      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Email</DropdownMenuItem>
          <DropdownMenuItem>Message</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>More...</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
    <DropdownMenuItem>
      New Team
      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem>GitHub</DropdownMenuItem>
  <DropdownMenuItem>Support</DropdownMenuItem>
  <DropdownMenuItem disabled>API</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem>
    Log out
    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
  </DropdownMenuItem>            
</>

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
    dropdownAlign: { control: 'select', options: ['start', 'end', 'center'] },    
  },

  args: { onClick: fn() }
}

export default meta

export const Primary: StoryObj<SplitButtonProps> = {
  args: {
    menu:  <>
    <DropdownMenuItem onClick={() => alert('Import Repository')}>Import Repository</DropdownMenuItem>
    <DropdownMenuItem onClick={() => alert('Import Repositories')}>Import Repositories</DropdownMenuItem>
    </>    
    ,
    dropdownMenuContentClass: 'w-56',
    children: 'Primary'
  }
}

export const Secondary: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    dropdownMenuContentClass: 'w-56',
    variant: 'secondary',
    children: 'Secondary'
  }
}

export const Outline: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    dropdownMenuContentClass: 'w-56',
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
    dropdownMenuContentClass: 'w-56',
    variant: 'destructive',
    children: 'Destructive'
  }
}

export const Large: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    dropdownMenuContentClass: 'w-56',
    size: 'lg',
    children: 'Large'
  }
}

export const Small: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    dropdownMenuContentClass: 'w-56',
    size: 'sm',
    children: 'Small'
  }
}

export const WithIcon: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    dropdownMenuContentClass: 'w-56',
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
    dropdownMenuContentClass: 'w-56',
    children: <Download strokeWidth="2" />
  }
}

export const Loading: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    dropdownMenuContentClass: 'w-56',
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
import { SplitButton, CanaryOutletFactory } from '@harnessio/canary'

CanaryOutletFactory.registerOutlet(CanaryOutletName.BUTTON_SPINNER, (props: SplitButtonProps) => {
  return <Refresh className={\`\${props.children ? 'mr-2 ' : ''}animate-spin\`} />
})

// Then: 

<SplitButton loading>Please wait</SplitButton>
  \`\`\`
        `
      }
    }
  }
}

export const IconOnlyLoading: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    dropdownMenuContentClass: 'w-56',
    loading: true
  }
}

export const LoadingWithCustomSpinner: StoryObj<SplitButtonProps> = {
  args: {
    menu,
    dropdownMenuContentClass: 'w-56',
    loading: true,
    spinner: <RefreshDouble className="mr-2 animate-spin" />,
    children: (
      <>        
        Please wait
      </>
    )
  }
}
