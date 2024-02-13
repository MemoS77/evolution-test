import { INeuralNetworkData } from 'brain.js/dist/neural-network'
import { Bot, BotKind } from '../types'
import { MAX_ENERGY } from './const'
/*
type DnaInputs = {
  ownEnergy: number
  ownIndicator: number
  targetEnergy: number
  targetIndicator: number
  targetClan: number
  distance: number
  light: number
  random: number
}*/

export function proccessDna(mainBot: Bot, compareBot: Bot, d: number) {
  if (mainBot.kind === BotKind.Blue) {
    return 0.5
  }

  const neurons = [
    mainBot.energy / MAX_ENERGY,
    1 / mainBot.devideCounter,
    compareBot.energy / MAX_ENERGY,
    1 / compareBot.devideCounter,
    mainBot.clan === compareBot.clan ? 1 : 0,
    compareBot.kind === BotKind.Main ? 1 : 0,
    compareBot.kind === BotKind.Blue ? 1 : 0,
    compareBot.kind === BotKind.Green ? 1 : 0,
    compareBot.kind === BotKind.Red ? 1 : 0,
    d,
    mainBot.loopCalculated!.emptySpace,
    Math.random(),
  ]
  const res = mainBot.dna![mainBot.kind].run(neurons)
  const ans = res ? ((res as Array<number>)[0]! as number) : 0
  //console.log(ans, mainBot.loopCalculated!, d)
  return ans
  //return compareBot.kind === mainBot.kind ? 1 : 0
}

export function proccessTransformDna(bot: Bot): number {
  const enemy = {
    [BotKind.Main]: 0,
    [BotKind.Blue]: 0,
    [BotKind.Green]: 0,
    [BotKind.Red]: 0,
  }

  bot.loopCalculated!.connectedBots.forEach((b) => {
    if (b.clan !== bot.clan) enemy[b.kind] = 1
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
  ]

  const res = bot.transformDna!.run(neurons) as Array<number>
  // Нужно найти из 4 элементво массива максимальный и вернуть его индекс
  if (res && res.length === 4) {
    const mx = Math.max(...res)
    return res.findIndex((x) => x === mx)
  }
  return 0

  //return res
}
