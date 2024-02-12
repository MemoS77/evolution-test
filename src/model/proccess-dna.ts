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
  const res = mainBot.dna[mainBot.kind][compareBot.kind].run([
    mainBot.energy / MAX_ENERGY,
    0,
    compareBot.energy / MAX_ENERGY,
    0,
    mainBot.clan === compareBot.clan ? 1 : 0,
    d,
    0,
    Math.random(),
  ])
  //console.log(mainBot.clan)
  return res ? (res[0]! as number) : 0
}
