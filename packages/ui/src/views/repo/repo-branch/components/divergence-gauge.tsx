import { Progress } from '@/components'
import { useTranslation } from '@/context'
import { cn } from '@/utils/cn'

interface GaugeProps {
  behindAhead: {
    behind?: number
    ahead?: number
  }
  className?: string
}

export const DivergenceGauge = ({ behindAhead, className }: GaugeProps) => {
  const { t } = useTranslation()
  const total = (behindAhead.behind ?? 0) + (behindAhead.ahead ?? 0)
  const getPercentage = (value: number) => (total > 0 ? (value / total) * 100 : 0)
  const behindPercentage = getPercentage(behindAhead.behind ?? 0)
  const aheadPercentage = getPercentage(behindAhead.ahead ?? 0)

  const adjustPercentage = (percentage: number) => {
    return percentage > 0 && percentage < 10 ? 10 : percentage
  }

  const adjustedBehindPercentage = adjustPercentage(behindPercentage)
  const adjustedAheadPercentage = adjustPercentage(aheadPercentage)

  return (
    <div className={cn('mt-0.5 flex w-full flex-col gap-[3px]', className)}>
      <div className="mx-auto grid w-28 grid-flow-col grid-cols-[1fr_auto_1fr] items-center justify-center gap-x-1.5">
        <span className="truncate text-right text-2 leading-none text-cn-foreground-3">
          {behindAhead.behind ?? 0}
          <span className="sr-only">
            {t('views:repos.commits', 'commits')}
            {t('views:repos.behind', 'behind')}
          </span>
        </span>
        <div className="h-3 w-px bg-cn-background-3" aria-hidden />
        <span className="truncate text-2 leading-none text-cn-foreground-3">
          {behindAhead.ahead ?? 0}
          <span className="sr-only">
            {t('views:repos.commits', 'commits')}
            {t('views:repos.ahead', 'ahead')}
          </span>
        </span>
      </div>
      {/* Both behind and ahead are 0, don't show the progress bar */}
      {behindAhead?.behind === 0 && behindAhead?.ahead == 0 ? null : (
        <div className="mx-auto grid w-28 grid-flow-col grid-cols-2 items-center justify-center">
          <Progress
            className="rounded-l-none"
            variant="divergence"
            value={adjustedBehindPercentage}
            size="sm"
            rotated="180deg"
            indicatorRounded="right-sm"
            indicatorColor="dark-gray"
          />
          <Progress
            className="rounded-l-none"
            variant="divergence"
            value={adjustedAheadPercentage}
            size="sm"
            indicatorRounded="right-sm"
            indicatorColor="light-gray"
          />
        </div>
      )}
    </div>
  )
}
