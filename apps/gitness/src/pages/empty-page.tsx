import { NoData } from '@harnessio/views'
import { useNavigate } from 'react-router-dom'

export const EmptyPage = ({ pathName }: { pathName: string }) => {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-[100vh] items-center">
      <NoData
        iconName="no-search-magnifying-glass"
        title={`Upgrade to Harness Enterprise to access ${pathName}`}
        description={[]}
        primaryButton={{
          label: 'Take me back',
          onClick: () => navigate(-1)
        }}
      />
    </div>
  )
}
