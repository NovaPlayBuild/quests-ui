import { Reward } from '@novaplay/utils'

export async function resyncExternalTasks(
  rewards: Reward[],
  resyncExternalTask: (rewardId: string) => Promise<void>
) {
  for (const reward of rewards) {
    if (reward.reward_type === 'EXTERNAL-TASKS') {
      await resyncExternalTask(reward.id.toString())
    }
  }
}
