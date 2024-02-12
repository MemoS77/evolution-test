import { Bots, Point } from '../types'
import { GAME_SPEED } from './const'
import { createRandomBot } from './gen-bot'

export default class EvoGravityEngine {
  public bots: Bots

  constructor(fieldSize: Point, botsCount: number) {
    // Create bots
    this.bots = new Set()
    for (let i = 0; i < botsCount; i++) {
      this.bots.add(createRandomBot(fieldSize))
    }
  }

  start() {
    setInterval(() => {
      this.loop()
    }, (1000 / 60) * GAME_SPEED)
  }

  private loop() {
    // Update bots
  }
}
