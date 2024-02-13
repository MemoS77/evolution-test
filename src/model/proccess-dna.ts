import { Bot, BotKind } from '../types'
import { MAX_ENERGY } from './const'

type DnaInputs = {
  ownEnergy: number
  ownIndicator: number
  targetEnergy: number
  targetIndicator: number
  targetClan: number
  distance: number
  light: number
  random: number
}

export default function proccessDna(mainBot: Bot, compareBot: Bot, d: number) {
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
  const res = mainBot.dna[mainBot.kind].run(neurons)
  const ans = res ? ((res as Array<number>)[0]! as number) : 0
  //console.log(ans, mainBot.loopCalculated!, d)
  return 1
  return ans

  //return compareBot.kind === mainBot.kind ? 1 : 0
}
