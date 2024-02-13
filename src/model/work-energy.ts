import { BotKind, Bots } from '../types'
import {
  LOOP_ENERGY,
  MAX_ENERGY,
  MAX_GREEN_ENERGY,
  WHITE_DEVIDE_ENERGY,
  TRANSFER_ENERGY,
  RED_DEVIDE_ENERGY,
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
          (b.kind === BotKind.Red ||
            (b.kind === BotKind.Main && b.clan === bot.clan)) &&
          bot.energy > TRANSFER_ENERGY
        ) {
          b.energy += TRANSFER_ENERGY
          bot.energy -= TRANSFER_ENERGY
        }
      })
      if (bot.energy >= MAX_ENERGY) {
        const newBot = devideBot(bot)
        newBot.kind = BotKind.Main
        bots.add(newBot)
      }
      bot.energy -= LOOP_ENERGY
    }

    if (bot.energy < LOOP_ENERGY) {
      bots.delete(bot)
    }
  })

  // Синие
  /*
  bots.forEach((bot) => {
    if (bot.kind === BotKind.Blue) {
      //bot.energy -= LOOP_ENERGY
    }
  })*/

  // Красные
  bots.forEach((bot) => {
    if (bot.kind === BotKind.Red) {
      bot.loopCalculated!.connectedBots.forEach((b) => {
        if (b) {
          if (
            (b.kind === BotKind.Red || b.kind === BotKind.Blue) &&
            b.clan !== bot.clan
          ) {
            b.energy -= TRANSFER_ENERGY
            if (b.kind === BotKind.Red) bot.energy -= TRANSFER_ENERGY
          }
        }
      })
      if (bot.energy >= RED_DEVIDE_ENERGY) {
        const newBot = devideBot(bot)
        newBot.kind = BotKind.Main
        bots.add(newBot)
      }
      bot.energy -= LOOP_ENERGY
    }
  })

  // Белые
  bots.forEach((bot) => {
    if (bot.kind === BotKind.Main) {
      bot.loopCalculated!.connectedBots.forEach((b) => {
        if (
          b.kind === BotKind.Main &&
          b.clan !== bot.clan &&
          bot.energy > LOOP_ENERGY &&
          b.energy > LOOP_ENERGY
        ) {
          glueBots(bot, b)
        } else if (
          ((b.kind === BotKind.Red && b.clan !== bot.clan) ||
            ((b.kind === BotKind.Main ||
              b.kind === BotKind.Red ||
              b.kind === BotKind.Green) &&
              b.clan === bot.clan &&
              bot.energy - TRANSFER_ENERGY * 2 > b.energy)) &&
          bot.energy > TRANSFER_ENERGY
        ) {
          b.energy += TRANSFER_ENERGY
          bot.energy -= TRANSFER_ENERGY
        }
      })
      if (bot.energy >= WHITE_DEVIDE_ENERGY) {
        const newBot = devideBot(bot)
        const r = proccessTransformDna(bot)
        if (r !== BotKind.Main) {
          newBot.kind = r
        }
        bots.add(newBot)
      }
      if (bot.loopCalculated!.neighbours > 0) {
        bot.energy -= LOOP_ENERGY
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
