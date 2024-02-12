import { Bot, BotKind, Point } from '../types'
import { MAX_ENERGY } from './const'
import randomPlace from './random-place'

let maxId = 0

export function createRandomBot(fieldSize: Point): Bot {
  return {
    kind: Math.floor(Math.random() * 4),
    place: randomPlace(fieldSize, 50),
    energy: Math.floor(MAX_ENERGY * Math.random()),
    vector: { x: 0, y: 0 },
    id: ++maxId,
    clan: 'asdasd',
    dna: {},
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
