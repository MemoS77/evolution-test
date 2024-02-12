import { Bots } from '../types'
import {
  BOT_RADIUS,
  CORE_ANTIGRAVITY,
  CORE_DISTANCE_MULTIPLE,
  GRAVITY,
  MAX_GRAVITY_DISTANCE,
  MIN_GRAVITY_DISTANCE,
} from './const'
import proccessDna from './proccess-dna'

export default function applyGravity(bots: Bots) {
  // Gravity
  bots.forEach((atom1) => {
    bots.forEach((atom2) => {
      if (atom2 !== atom1) {
        const dx = atom1.place.x - atom2.place.x
        const dy = atom1.place.y - atom2.place.y
        const d = Math.max(Math.sqrt(dx * dx + dy * dy), MIN_GRAVITY_DISTANCE)

        if (d <= MAX_GRAVITY_DISTANCE) {
          if (d > BOT_RADIUS * 2) {
            // TODO calc g by DNA
            const g =
              GRAVITY *
              (proccessDna(atom1, atom2, d / MAX_GRAVITY_DISTANCE) - 0.5)
            const F = g / d // With standart gravity function (d * d)  - model is not interesting
            const ax = (F * dx) / d
            const ay = (F * dy) / d
            atom1.vector.x += ax
            atom1.vector.y += ay
          } else {
            // Collision. Calc common vector (with mass) and set to both atoms
            const newVX = (atom1.vector.x + atom2.vector.x) / 2
            const newVY = (atom1.vector.y + atom2.vector.y) / 2
            atom1.vector = {
              x: newVX,
              y: newVY,
            }
            atom2.vector = {
              x: newVX,
              y: newVY,
            }
            if (d <= BOT_RADIUS * CORE_DISTANCE_MULTIPLE) {
              atom1.vector.x += (dx * CORE_ANTIGRAVITY) / d
              atom1.vector.y += (dy * CORE_ANTIGRAVITY) / d
            }
          }
        }
      }
    })
  })
}
