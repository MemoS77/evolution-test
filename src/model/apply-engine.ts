import { Bots } from '../types'
import {
  BOT_RADIUS,
  CORE_ANTIGRAVITY,
  CORE_DISTANCE_MULTIPLE,
  EMTY_SPACE_DECREASE,
  GRAVITY,
  MAX_GRAVITY_DISTANCE,
  MIN_GRAVITY_DISTANCE,
} from './const'
import { proccessRules } from './proccess-dna'

export default function applyEngine(bots: Bots) {
  // Gravity
  bots.forEach((atom1) => {
    // Сколько вокруг клетки - других. Два прохода для избежания лишних расчетов

    atom1.loopCalculated = {
      neighbours: 0,
      emptySpace: 1,
      connectedBots: [],
    }

    for (let i = 0; i <= 1; i++) {
      bots.forEach((atom2) => {
        if (atom2 !== atom1) {
          const dx = atom1.place.x - atom2.place.x
          const dy = atom1.place.y - atom2.place.y
          const d = Math.max(Math.sqrt(dx * dx + dy * dy), MIN_GRAVITY_DISTANCE)
          if (i === 0) {
            // На первом круге вычислем соседей клетки, свободное место
            if (d <= BOT_RADIUS * 3) {
              atom1.loopCalculated!.neighbours++
              atom1.loopCalculated!.connectedBots.push(atom2)
            }
          } else {
            // втором вычисляем новые ускорения по днк

            // Количество света. При 5 соседях - очень мало. При 6 - 0.
            atom1.loopCalculated!.emptySpace = Math.max(
              1 - EMTY_SPACE_DECREASE * atom1.loopCalculated!.neighbours,
              0,
            )

            if (d <= MAX_GRAVITY_DISTANCE) {
              if (d > BOT_RADIUS * CORE_DISTANCE_MULTIPLE) {
                if (d <= BOT_RADIUS * 2) {
                  // Collision
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
                }
                const g =
                  GRAVITY *
                  (proccessRules(atom1, atom2, d / MAX_GRAVITY_DISTANCE) - 0.5)
                const F = g / d // With standart gravity function (d * d)  - model is not interesting
                const fx = (F * dx) / d
                const fy = (F * dy) / d
                atom1.vector.x += fx
                atom1.vector.y += fy
                //atom2.vector.x -= fx
                //atom2.vector.y -= fy
              } else {
                // Ссила отталкивания при очень близком сближении ядер
                const fx = (dx * CORE_ANTIGRAVITY) / (d * d)
                const fy = (dy * CORE_ANTIGRAVITY) / (d * d)
                atom1.vector.x += fx
                atom1.vector.y += fy
                atom2.vector.x -= fx
                atom2.vector.y -= fy
              }
            }
          }
        }
      })
    }
  })
}

/*
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
*/
