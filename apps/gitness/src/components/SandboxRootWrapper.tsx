import { SandboxRoot } from '@harnessio/playground'
import { useAppContext } from '../framework/context/AppContext'
import { useGetSpaceURLParam } from '../framework/hooks/useGetSpaceParam'

const SandboxRootWrapper = () => {
  const { currentUser, spaces } = useAppContext()
  const spaceId = useGetSpaceURLParam()

  return (
    <>
      <SandboxRoot currentUser={currentUser} currentSpaceId={spaceId || spaces?.[0]?.identifier} />
    </>
  )
}

export default SandboxRootWrapper
