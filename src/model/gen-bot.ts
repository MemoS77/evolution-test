import { Bot, BotKind, DNA, Point } from '../types'
import { MAX_ENERGY } from './const'
import randomNet from './neuro/random-net'
import randomPlace from './random-place'

let maxId = 0

function genDna() {
  const dna: Array<Array<DNA>> = []
  for (let i = 0; i < 4; i++) {
    dna[i] = []
    for (let j = 0; j < 4; j++) {
      const n = randomNet()
      dna[i].push(n)
    }
  }
  return dna
}

export function createRandomBot(fieldSize: Point): Bot {
  return {
    kind: Math.floor(Math.random() * 4),
    place: randomPlace(fieldSize, 50),
    energy: Math.floor(MAX_ENERGY * Math.random()),
    vector: { x: 0, y: 0 },
    id: ++maxId,
    clan: Math.floor(Math.random() * 100000 * 100000).toString(36),
    dna: genDna(),
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
