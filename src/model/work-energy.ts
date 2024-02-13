import { BotKind, Bots } from '../types'
import {
  LOOP_ENERGY,
  MAX_ENERGY,
  MAX_GREEN_ENERGY,
  STEM_DEVIDE_ENERGY,
  TRANSFER_ENERGY,
} from './const'
import { devideBot, glueBots } from './gen-bot'
import { proccessTransformDna } from './proccess-dna'

export default function workEnergy(bots: Bots) {
  // Нужно считать по отдельности, иначе некоторые взаимодействия сильно будут зависеть от порядка обработки

  // Зеленые
  bots.forEach((bot) => {
    if (bot.kind === BotKind.Green) {
      bot.energy += MAX_GREEN_ENERGY * bot.loopCalculated!.emptySpace
      bot.loopCalculated!.connectedBots.forEach((b) => {
        if (
          (b.kind === BotKind.Red || b.kind === BotKind.Blue) &&
          bot.energy > TRANSFER_ENERGY
        ) {
          b.energy += TRANSFER_ENERGY
          bot.energy -= TRANSFER_ENERGY
        }
      })
      if (bot.energy >= MAX_ENERGY) {
        bots.add(devideBot(bot))
        bot.kind = BotKind.Blue
      }
      bot.energy -= LOOP_ENERGY
    }

    if (bot.energy < LOOP_ENERGY) {
      bots.delete(bot)
    }
  })

  // Синие
  bots.forEach((bot) => {
    if (bot.kind === BotKind.Blue) {
      bot.loopCalculated!.connectedBots.forEach((b) => {
        if (
          (b.kind === BotKind.Red && b.clan !== bot.clan) ||
          (b.clan === bot.clan && bot.energy - TRANSFER_ENERGY > b.energy)
        ) {
          b.energy += TRANSFER_ENERGY
          bot.energy -= TRANSFER_ENERGY
        }
      })
      if (bot.energy >= MAX_ENERGY) {
        const newBot = devideBot(bot)
        bots.add(newBot)
        newBot.kind = BotKind.Main
      }
      bot.energy -= LOOP_ENERGY
    }
  })

  // Красные
  bots.forEach((bot) => {
    if (bot.kind === BotKind.Red) {
      bot.loopCalculated!.connectedBots.forEach((b) => {
        if (b.kind === BotKind.Red && b.clan !== bot.clan) {
          b.energy -= TRANSFER_ENERGY
          bot.energy -= TRANSFER_ENERGY
        }
      })
      if (bot.energy >= MAX_ENERGY) {
        bots.add(devideBot(bot))
        bot.kind = BotKind.Blue
      }
      bot.energy -= LOOP_ENERGY
    }
  })

  // Семечки
  bots.forEach((bot) => {
    if (bot) {
      if (bot.kind === BotKind.Main) {
        bot.loopCalculated!.connectedBots.forEach((b) => {
          if (b) {
            if (b.kind === BotKind.Main && b.clan !== bot.clan) {
              glueBots(bot, b, bots)
              return
            } else if (b.kind === BotKind.Red && b.clan !== bot.clan) {
              b.energy += TRANSFER_ENERGY
              bot.energy -= TRANSFER_ENERGY
            }
          }
        })
        if (bot.energy >= STEM_DEVIDE_ENERGY) {
          const newBot = devideBot(bot)
          const r = proccessTransformDna(bot)
          if (r !== BotKind.Main) {
            newBot.kind = r
            console.log('Transform!', r)
          } else console.log('Devide')
          bots.add(newBot)
        }
        if (bot.loopCalculated!.neighbours > 0) {
          bot.energy -= LOOP_ENERGY
        }
      }
    }
  })

  // Все
  bots.forEach((bot) => {
    if (bot.energy < LOOP_ENERGY) {
      bots.delete(bot)
    } else if (bot.energy > MAX_ENERGY) {
      bot.energy = MAX_ENERGY
    }
  })
}
