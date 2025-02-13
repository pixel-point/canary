import {
  Button,
  ButtonGroup,
  ControlGroup,
  CopyButton,
  Fieldset,
  FormSeparator,
  Input,
  MarkdownViewer,
  NoData,
  Spacer,
  Text
} from '@/components'
import { SandboxLayout } from '@/views'

interface RepoEmptyViewProps {
  repoName: string
  projName: string
  httpUrl: string
  sshUrl: string
  gitRef: string
  handleCreateToken: () => void
  navigateToProfileKeys?: () => void
}

export const RepoEmptyView: React.FC<RepoEmptyViewProps> = ({
  repoName,
  projName,
  httpUrl,
  sshUrl,
  gitRef,
  handleCreateToken,
  navigateToProfileKeys
}) => {
  const getInitialCommitMarkdown = () => {
    return `
\`\`\`shell
cd ${repoName}
git branch -M main
echo '# Hello World' >> README.md                                                     
git add README.md
git commit -m 'Initial commit'
git push -u origin main
\`\`\`
`
  }

  const getExistingRepoMarkdown = () => {
    return `
\`\`\`shell
git remote add origin http://localhost:3000/git/${projName}/${repoName}.git                     
git branch -M main
git push -u origin main
\`\`\`
`
  }

  return (
    <SandboxLayout.Main>
      <SandboxLayout.Content className="mx-auto max-w-[850px]">
        <Text size={5} weight={'medium'}>
          Repository
        </Text>
        <Spacer size={6} />
        <NoData
          withBorder
          iconName="no-repository"
          title="This repository is empty"
          description={['We recommend every repository include a', 'README, LICENSE, and .gitignore.']}
          primaryButton={{
            label: 'New file',
            to: `${projName ? `/${projName}` : ''}/repos/${repoName}/code/new/${gitRef}/~/`
          }}
          className="min-h-[40vh] py-0"
        />
        <Spacer size={6} />

        <Fieldset>
          <Text size={4} weight="medium">
            Please Generate Git Cradentials if it’s your first time cloning the repository
          </Text>
          <Text size={3}>Git clone URL</Text>
          <Input label="HTTP" value={httpUrl} readOnly rightElement={<CopyButton name={httpUrl} />} />
          <Input label="SSH" value={sshUrl} readOnly rightElement={<CopyButton name={sshUrl} />} />
          <ControlGroup>
            <ButtonGroup>
              <Button onClick={handleCreateToken}>Generate Clone Credentials</Button>
            </ButtonGroup>
            <p className="mt-2">
              You can also manage your git credential{' '}
              <span
                role="button"
                tabIndex={0}
                className="text-foreground-accent hover:decoration-foreground-accent underline decoration-transparent underline-offset-4 transition-colors duration-200"
                onClick={() => navigateToProfileKeys?.()}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
              >
                here
              </span>
            </p>
          </ControlGroup>

          <FormSeparator />
          <Text size={4} weight="medium">
            Then push some content into it
          </Text>
          <MarkdownViewer source={getInitialCommitMarkdown()} />
          <Text size={4} weight="medium">
            Or you can push an existing repository
          </Text>
          <ControlGroup>
            <MarkdownViewer source={getExistingRepoMarkdown()} />
            <p>
              You might need to{' '}
              <span
                role="button"
                tabIndex={0}
                className="text-foreground-accent hover:decoration-foreground-accent underline decoration-transparent underline-offset-4 transition-colors duration-200"
                onClick={() => navigateToProfileKeys?.()}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                  }
                }}
              >
                create an API token
              </span>
              In order to pull from or push into this repository.
            </p>
          </ControlGroup>
        </Fieldset>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
