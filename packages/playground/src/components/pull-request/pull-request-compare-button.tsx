import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Text,
  Button,
  ButtonGroup
} from '@harnessio/canary'
<<<<<<< HEAD
import { CompareFormFields } from '../../layouts/SandboxPullRequestCompareLayout'
=======
import type { CompareFormFields } from '../../layouts/SandboxPullRequestCompareLayout'
>>>>>>> 45f591e1 (fix: updated common layout and navbar)

interface PullRequestCompareButtonProps {
  isSubmitted: boolean
  isValid: boolean
  isLoading: boolean
  formRef: React.RefObject<HTMLFormElement>
  onFormSubmit: (data: CompareFormFields) => void
  onFormDraftSubmit: (data: CompareFormFields) => void
}

const PullRequestCompareButton: React.FC<PullRequestCompareButtonProps> = ({
  isSubmitted,
  isLoading,
  formRef,
  onFormDraftSubmit,
  onFormSubmit
}) => {
  const handleDraftClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const data = {
        title: formData.get('title'),
        description: formData.get('description')
      }
      onFormDraftSubmit(data as CompareFormFields) // Call the draft submit function
    }
  }
  const handleCreateClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const data = {
        title: formData.get('title'),
        description: formData.get('description')
      }
      onFormSubmit(data as CompareFormFields) // Call the draft submit function
    }
  }
  return (
    <>
      {!isSubmitted ? (
        <>
          <ButtonGroup.Root>
            <Button
              theme={'primary'}
              variant="split"
              size="xs_split"
              onClick={handleCreateClick}
              dropdown={
                <DropdownMenu>
                  <DropdownMenuTrigger insideSplitButton>
                    <Icon name="chevron-down" size={11} className="chevron-down" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="mt-1">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={handleDraftClick} disabled={isLoading}>
                        <div className="flex flex-col">
                          <Text color="primary">Create draft pull request</Text>
                          <Text color="tertiaryBackground">Does not request code reviews and cannot be merged</Text>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              }
              type="button" // Change to button type
              disabled={isLoading}>
              {!isLoading ? 'Create pull request' : 'Creating pull request...'}
            </Button>
          </ButtonGroup.Root>
        </>
      ) : (
        <Button variant="ghost" type="button" size="sm" theme="success" className="pointer-events-none">
          Pull request created&nbsp;&nbsp;
          <Icon name="tick" size={14} />
        </Button>
      )}
    </>
  )
}

export default PullRequestCompareButton
