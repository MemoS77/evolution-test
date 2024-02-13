import { Bot, BotKind, DNA, Point } from '../types'
import { MAX_ENERGY } from './const'
import randomNet from './neuro/random-net'
import randomPlace from './random-place'

let maxId = 0

function genDna() {
  const dna: Array<DNA> = []
  for (let i = 0; i < 4; i++) {
    const n = randomNet()
    dna.push(n)
  }
  return dna
}

export function createRandomBot(fieldSize: Point): Bot {
  return {
    kind: Math.floor(Math.random() * 4),
    place: randomPlace(fieldSize, 50),
    energy: Math.floor((MAX_ENERGY / 2) * Math.random() + MAX_ENERGY / 4),
    vector: { x: 0, y: 0 },
    id: ++maxId,
    clan: Math.floor(Math.random() * 1000000 * 1000000).toString(36),
    dna: genDna(),
    devideCounter: 1,
  }
}

export function devideBot(parentBot: Bot): Bot | null {
  if ((parentBot.kind = BotKind.Main)) {
    parentBot.energy = parentBot.energy / 2
    const newBot = { ...parentBot }
    newBot.id = ++maxId
  }
  return null
}
