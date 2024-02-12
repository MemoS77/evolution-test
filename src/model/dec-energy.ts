import { Bots } from '../types'

export default function decEnergy(bots: Bots) {
  bots.forEach((bot) => {
    bot.energy--
    if (bot.energy < 1) {
      bots.delete(bot)
    }
  })
}
