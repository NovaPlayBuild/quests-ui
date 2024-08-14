import { resetSessionStartedTime } from '@/helpers/getPlaystreakArgsFromQuestData'
import { Runner, wait } from '@hyperplay/utils'
import { useEffect } from 'react'

export function useSyncPlaySession(
  projectId: string,
  invalidateQuery: () => Promise<void>,
  syncPlaySession: (appName: string, runner: Runner) => Promise<void>
) {
  useEffect(() => {
    const syncTimer = setInterval(async () => {
      await syncPlaySession(projectId, 'hyperplay')
      // allow for some time before read
      await wait(5000)
      await invalidateQuery()
      resetSessionStartedTime()
    }, 1000 * 60)

    return () => {
      clearInterval(syncTimer)
    }
  }, [projectId, invalidateQuery])
}
