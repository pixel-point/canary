import { SandboxRoot } from '@harnessio/ui/views'

import { useAppContext } from '../framework/context/AppContext'

// import { useGetSpaceURLParam } from '../framework/hooks/useGetSpaceParam'

const RootWrapper = () => {
  const {
    currentUser
    // spaces
  } = useAppContext()
  // const spaceId = useGetSpaceURLParam()

  return (
    <>
      <SandboxRoot currentUser={currentUser} />
    </>
  )
}

export default RootWrapper
