import { Accordion, Icon, StackedList, StatusBadge, Text } from '@/components'
import { useRouterContext } from '@/context'
import { timeDistance } from '@/utils'
import { EnumCheckStatus, ExecutionState, TypesPullReqCheck } from '@/views'
import { cn } from '@utils/cn'
import { PanelAccordionShowButton } from '@views/repo/pull-request/details/components/conversation/sections/panel-accordion-show-button'
import { isEmpty } from 'lodash-es'

import { PullRequestRoutingProps } from '../../../pull-request-details-types'
import { LineDescription, LineTitle } from './pull-request-line-title'

const ACCORDION_VALUE = 'item-3'

interface ExecutionPayloadType {
  execution_number: number
}

interface PullRequestMergeSectionProps extends Partial<PullRequestRoutingProps> {
  checkData: TypesPullReqCheck[]
  checksInfo: { header: string; content: string; status: EnumCheckStatus }
  accordionValues: string[]
}

const PullRequestCheckSection = ({
  checkData,
  checksInfo,
  toPRCheck,
  accordionValues
}: PullRequestMergeSectionProps) => {
  const { Link } = useRouterContext()

  const getStatusIcon = (status: EnumCheckStatus) => {
    switch (status) {
      // TODO: fix icons to use from nucleo
      case ExecutionState.PENDING:
      case ExecutionState.BLOCKED:
        return <Icon name="pending-clock" className="text-icons-alert" />
      case ExecutionState.RUNNING:
        return <Icon name="comments" className="text-cn-foreground-warning" />
      case ExecutionState.FAILURE:
      case ExecutionState.ERROR:
        return <Icon name="triangle-warning" className="text-cn-foreground-danger" />
      default:
        return <Icon name="success" className="text-cn-foreground-success" />
    }
  }

  return !isEmpty(checkData) ? (
    <Accordion.Item value={ACCORDION_VALUE}>
      <Accordion.Trigger className="py-3">
        <StackedList.Field
          className="flex gap-y-1"
          title={<LineTitle text={checksInfo.header} icon={getStatusIcon(checksInfo.status)} />}
          description={<LineDescription text={checksInfo.content} />}
        />
        <PanelAccordionShowButton isShowButton value={ACCORDION_VALUE} accordionValues={accordionValues} />
      </Accordion.Trigger>
      <Accordion.Content className={cn('flex flex-col pl-6', { 'pb-0': checkData.length === 1 })}>
        {checkData.map(check => {
          const time = timeDistance(check?.check?.created, check?.check?.updated)

          return (
            <div key={check.check?.id} className={cn('flex items-center justify-between gap-2 border-t py-2.5')}>
              <div className="flex items-center gap-2">
                {getStatusIcon(check?.check?.status as EnumCheckStatus)}
                <Text size={1} color="primary" truncate className="max-w-[300px] overflow-hidden">
                  {check?.check?.identifier}
                </Text>
                <Text size={1} color="tertiaryBackground">
                  {check?.check?.status === ExecutionState.SUCCESS
                    ? `Succeeded in ${time}`
                    : check?.check?.status === ExecutionState.FAILURE
                      ? `Failed in ${time}`
                      : check?.check?.status === ExecutionState.RUNNING
                        ? 'Running...'
                        : check?.check?.status === ExecutionState.PENDING
                          ? 'Pending...'
                          : `Errored in ${time}`}
                </Text>
              </div>
              <div className="grid grid-cols-[84px_auto] items-center">
                <div className="col-span-1">
                  {/* TODO: figure out how to do link in this? */}
                  {/* <Link
              className="text-blue-500 mx-2"
              to={
                routes.toCODEPullRequest({
                  repoPath: repoMetadata.path as string,
                  pullRequestId: String(pullReqMetadata.number),
                  pullRequestSection: PullRequestSection.CHECKS
                }) + `?uid=${check?.check?.identifier}`
              }
            ></Link> */}
                  {check?.check?.status !== ExecutionState.PENDING && (
                    <Link
                      to={
                        toPRCheck?.({
                          pipelineId: check?.check?.identifier || '',
                          executionId: (
                            check?.check?.payload?.data as ExecutionPayloadType
                          ).execution_number?.toString()
                        }) || ''
                      }
                    >
                      <Text size={1} color="tertiaryBackground">
                        Details
                      </Text>
                    </Link>
                  )}
                </div>
                <div className="col-span-1 flex justify-end">
                  {check?.check?.status === ExecutionState.PENDING ? (
                    <StatusBadge variant="outline" size="sm">
                      <Text size={1} color="tertiaryBackground">
                        Required
                      </Text>
                    </StatusBadge>
                  ) : (
                    <div className="min-w-[70px]"></div>
                  )}
                </div>
              </div>
            </div>
          )
          // return (
          //   <div key={check_idx} className="flex justify-between py-2 border-t">
          //     <div className="flex items-center">
          //       {getStatusIcon(check?.check?.status as EnumCheckStatus)}

          //       <div className="truncate min-w-[200px] max-w-[200px] pl-3 pt-0.5"> {check?.check?.identifier}</div>
          //       <div className="truncate max-w-[200px] pl-3 pt-0.5">
          //         {check?.check?.status === ExecutionState.SUCCESS
          //           ? `Succeeded in ${time}`
          //           : check?.check?.status === ExecutionState.FAILURE
          //             ? `Failed in ${time}`
          //             : check?.check?.status === ExecutionState.RUNNING
          //               ? 'Running...'
          //               : check?.check?.status === ExecutionState.PENDING
          //                 ? 'Pending...'
          //                 : `Errored in ${time}`}
          //       </div>
          //     </div>
          //     <div className="grid grid-cols-[84px_auto] items-center">
          //       <div className="col-span-1">
          //         {/* TODO: figure out how to do link in this? */}
          //         {/* <Link
          //   className="text-blue-500 mx-2"
          //   to={
          //     routes.toCODEPullRequest({
          //       repoPath: repoMetadata.path as string,
          //       pullRequestId: String(pullReqMetadata.number),
          //       pullRequestSection: PullRequestSection.CHECKS
          //     }) + `?uid=${check?.check?.identifier}`
          //   }
          // ></Link> */}
          //         {check?.check?.status !== ExecutionState.PENDING && (
          //           <Text weight="medium" size={1}>
          //             Details
          //           </Text>
          //         )}
          //       </div>
          //       <div className="col-span-1 flex justify-end">
          //         {check.required ? (
          //           <div className="border rounded-full bg-transparent">
          //             <Text className="text-2 text-cn-foreground-3 px-2 py-1.5">required</Text>
          //           </div>
          //         ) : (
          //           <div className="min-w-[70px]"></div>
          //         )}
          //       </div>
          //     </div>
          //   </div>
          // )
        })}
      </Accordion.Content>
    </Accordion.Item>
  ) : null
}

export default PullRequestCheckSection
