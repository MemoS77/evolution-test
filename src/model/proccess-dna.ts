import { INeuralNetworkData } from 'brain.js/dist/neural-network'
import { Bot, BotKind } from '../types'
import { MAX_ENERGY } from './const'

export function proccessRules(mainBot: Bot, compareBot: Bot, d: number) {
  // Красная притягивается к врагу сильнее
  if (mainBot.kind === BotKind.Red && mainBot.clan !== compareBot.clan) return 4

  // Белые клетки притягиваются друг к другу
  if (
    mainBot.kind === BotKind.White &&
    BotKind.White === compareBot.kind &&
    mainBot.clan !== compareBot.clan
  )
    return 2

  if (mainBot.clan === compareBot.clan) return 1

  return -1
}

export function proccessDna(bot: Bot): number {
  if (!bot.dna) return 0

  const enemy = {
    [BotKind.White]: 0,
    [BotKind.Green]: 0,
    [BotKind.Red]: 0,
    [BotKind.Blue]: 0,
  }

  const own = {
    [BotKind.White]: 0,
    [BotKind.Green]: 0,
    [BotKind.Red]: 0,
    [BotKind.Blue]: 0,
  }

  bot.loopCalculated!.connectedBots.forEach((b) => {
    if (b.clan !== bot.clan) enemy[b.kind] = 1
    else own[b.kind] = 1
  })

  const neurons: INeuralNetworkData = [
    bot.energy / MAX_ENERGY,
    1 / bot.devideCounter,
    bot.loopCalculated!.emptySpace,
    Math.random(),
    enemy[0],
    enemy[1],
    enemy[2],
    enemy[3],
    own[0],
    own[1],
    own[2],
    own[3],
  ]

  const res = bot.dna[bot.kind]!.run(neurons) as Array<number>
  // Нужно найти из 4 элементво массива максимальный и вернуть его индекс
  if (res && res.length > 0) {
    const mx = Math.max(...res)
    return res.findIndex((x) => x === mx)
  }
  return 0

  //return res
}
