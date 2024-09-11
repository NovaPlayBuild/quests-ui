import { getChainMetadataSync } from '@novaplay/chains'
import { Reward } from '@novaplay/utils'
import { TFunction } from 'i18next'

export function getRewardCategory(
  reward: Reward,
  t: TFunction<'translation', undefined>
) {
  if (
    reward.reward_type === 'POINTS' ||
    reward.reward_type === 'EXTERNAL-TASKS'
  ) {
    return t('quest.points', 'Points')
  }
  if (reward.chain_id === null) {
    return ''
  }
  return getChainMetadataSync(reward.chain_id.toString())?.chain.name ?? ''
}
