import { Bot, BotKind, DNA, Point } from '../types'
import { BOT_RADIUS, MAX_ENERGY } from './const'
import randomNet from './neuro/random-net'

import randomPlace from './random-place'
import { copyDna } from './neuro/mutation'
import { generateRandomColor } from './funcs'

let maxId = 0

function genDna() {
  const dna: Array<DNA> = []
  for (let i = 0; i < 3; i++) {
    const n = randomNet()
    dna.push(n)
  }
  return dna
}

export function createRandomBot(fieldSize: Point): Bot {
  const kind: BotKind = BotKind.Green //Math.floor(Math.random() * 4)
  return {
    kind,
    place: randomPlace(fieldSize, 50),
    energy: Math.floor((MAX_ENERGY / 2) * Math.random() + MAX_ENERGY / 4),
    vector: { x: 0, y: 0 },
    id: ++maxId,
    clan: generateRandomColor(),
    dna: kind === BotKind.Blue ? null : genDna(),
    devideCounter: 1,
  }
}

export function devideBot(parentBot: Bot): Bot {
  if (!parentBot.dna) return parentBot
  parentBot.energy = parentBot.energy / 2
  const newBot = { ...parentBot }
  newBot.id = ++maxId
  newBot.place = { ...parentBot.place }
  parentBot.devideCounter++
  newBot.devideCounter = 1
  let dx, dy
  const lc = parentBot.loopCalculated!

  if (parentBot.loopCalculated && lc.neighbours > 0) {
    // Противоположно боту parentBot.loopCalculated!.connectedBots[0].place
    dx = lc.connectedBots[0].place.x > parentBot.place.x ? -1 : 1
    dy = lc.connectedBots[0].place.y > parentBot.place.y ? -1 : 1
  } else {
    dx = Math.random() > 0.5 ? 1 : -1
    dy = Math.random() > 0.5 ? 1 : -1
  }
  const margin = BOT_RADIUS / 2
  const maxRand = BOT_RADIUS / 10
  const nx = dx * (margin + Math.random() * maxRand)
  const ny = dy * (margin + Math.random() * maxRand)
  parentBot.place.x -= nx
  parentBot.place.y -= ny
  newBot.place.x += nx
  newBot.place.y += ny

  // Копия всех основных ДНК
  for (let i = 0; i < newBot.dna!.length; i++) {
    newBot.dna![i] = copyDna(newBot.dna![i])
  }

  return newBot
}

function randomInt(min: number, max: number) {
  // Возвращаем случайное целое число в диапазоне [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function glueBots(bot1: Bot, bot2: Bot) {
  const m = randomInt(0, 2)
  bot1.dna![m] = copyDna(bot2.dna![m])
  const n = randomInt(0, 2)
  if (n !== m) bot1.dna![n] = copyDna(bot2.dna![n])
  bot1.energy += bot2.energy
  bot1.clan = generateRandomColor()
  bot2.energy = 0
  //console.log('Glue!!')
}
