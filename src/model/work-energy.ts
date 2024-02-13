import { BotKind, Bots } from '../types'
import { MAX_ENERGY, MAX_GREEN_ENERGY } from './const'

export default function workEnergy(bots: Bots) {
  bots.forEach((bot) => {
    bot.energy--
    if (bot.kind === BotKind.Green) {
      if (bot.loopCalculated) {
        bot.energy += MAX_GREEN_ENERGY * bot.loopCalculated.emptySpace
        if (bot.energy >= MAX_ENERGY) {
          bot.energy = MAX_ENERGY
        }
      }
    }
    if (bot.energy < 1) {
      bots.delete(bot)
    }
  })
}
