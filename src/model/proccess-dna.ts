import { Bot, BotKind } from '../types'

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

export default function proccessDna(mainBot: Bot, compareBot: Bot) {
  //inputs?: DnaInputs,
  //return Math.random()
  if (mainBot.kind === BotKind.Main && compareBot.kind === BotKind.Main)
    return 1
  return 0
}
