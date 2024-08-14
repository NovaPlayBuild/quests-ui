import { createPublicClient, http } from 'viem'
import { chainMap, parseChainMetadataToViemChain } from '@hyperplay/chains'
import { Reward } from '@hyperplay/utils'

const averageEstimatedGasUsagePerFunction: Record<string, number> = {
  ERC1155: 102_470,
  ERC721: 107_567,
  ERC20: 98_507
}

export async function getRewardClaimGasEstimation(
  reward: Reward,
  logInfo: (message: string) => void
) {
  if (!reward.chain_id) {
    throw Error(`chain_id is not set for reward: ${reward.id}`)
  }

  const chainMetadata = chainMap[reward.chain_id]

  if (!chainMetadata) {
    throw Error(`chainMetadata is not set for reward: ${reward.id}`)
  }

  const viemChain = parseChainMetadataToViemChain(chainMetadata)

  const publicClient = createPublicClient({
    chain: viemChain,
    transport: http()
  })

  let gasPerFunction

  switch (reward.reward_type) {
    case 'ERC1155':
    case 'ERC721':
    case 'ERC20':
      // we bump by 50% to account for potential gas price fluctuations
      gasPerFunction = Math.ceil(
        averageEstimatedGasUsagePerFunction[reward.reward_type] * 1.5
      )
      break
    default:
      throw Error(`unknown reward type ${reward.reward_type}`)
  }

  const gasPrice = await publicClient.getGasPrice()
  const gasNeeded = BigInt(gasPerFunction) * gasPrice

  logInfo(
    `Gas needed to claim ${reward.reward_type} reward: ${gasNeeded} (${gasPerFunction} gas per function * ${gasPrice} gas price)`
  )

  return gasNeeded
}
