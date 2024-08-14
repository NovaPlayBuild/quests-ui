import { useEffect } from 'react'

export function useTrackQuestViewed(
  selectedQuestId: number | null,
  trackEvent: (payload: any) => Promise<void>
) {
  useEffect(() => {
    if (selectedQuestId !== null) {
      trackEvent({
        event: 'Quest Viewed',
        properties: { quest: { id: selectedQuestId.toString() } }
      })
    }
  }, [selectedQuestId])
}
